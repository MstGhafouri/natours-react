const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');
const { filterObj } = require('./userController');

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

const createAndSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // In production we set secure cookies to true, then only in https cookie will send!
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    httpOnly: true // Browser would not be able to access or modify cookie ( only save and send back!)
  });

  user.password = undefined;
  user.__v = undefined;
  user.active = undefined;
  user.confirmEmailToken = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    'name',
    'email',
    'password',
    'passwordConfirm'
  );
  const newUser = await User.create(filteredBody);
  // Generate email confirm token
  const token = newUser.createConfirmEmailToken();
  await newUser.save({ validateBeforeSave: false });
  // Send confirmation email
  const url = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/confirmEmail?token=${token}`;
  await new Email(newUser, url).sendEmailConfirm();

  createAndSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  // 1) Check if email and password are provided
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide both email and password', 400));
  }
  // 2) Find user by provided email address
  // Here because we marked select password false in User model, we select it explicity
  const user = await User.findOne({ email }).select('+password');
  // 3) Check if provided password is valid
  if (!user || !(await user.verifyPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createAndSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'logoutCookie', {
    expires: new Date(Date.now() + 5000),
    httpOnly: true
  });

  res.status(200).json({ status: 'success' });
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) Verify given token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // 2) Check if user still exists
      const user = await User.findById(decoded.id);
      if (!user) {
        return next();
      }
      // 3) Check if user changed password after the token was issued
      if (user.checkUserChangedPasswordAfter(decoded.iat)) {
        return next();
      }
      // 4) Grant access to protected pages!!!
      // All our pug templates will have access to locals, so we put user in locals (:
      res.locals.user = user;
      return next();
    } catch (error) {
      return next();
    }
  }
  next();
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Check if token is provided in authorization headers
  const { authorization } = req.headers;
  let token =
    authorization && authorization.startsWith('Bearer ')
      ? authorization.split(' ')[1]
      : null;

  // Check if token is in the cookies
  if (!token && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('Please log in to get access', 401));
  }
  // 2) Verify given token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError('User belonging to this token does no longer exist', 401)
    );
  }
  // 4) Check if user has confirmed his/her email address
  if (!user.isEmailConfirmed) {
    return next(new AppError('Your email address is not confirmed yet', 401));
  }
  // 5) Check if user changed password after the token was issued
  if (user.checkUserChangedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'User has recently changed password. Please log in again!',
        401
      )
    );
  }
  // 5) Grant access to protected routes!!!
  req.user = user;
  res.locals.user = user;
  next();
});

exports.restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
  }
  next();
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on provided email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address', 404));
  }
  // 2) Generate random reset token
  const resetToken = user.createPasswordResetToken();
  // Save current user with new password reset token ( disable validation before save !)
  await user.save({ validateBeforeSave: false });
  // 3) Send it to user's email address
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/password-reset/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email'
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpiresAt = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'An error occurred while sending email! please try again later.',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on sent token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiresAt: { $gt: Date.now() }
  });
  // 2) If token has not expired and user still exists, set new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  const { password, passwordConfirm } = req.body;
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpiresAt = undefined;
  await user.save();
  // 3) Update passwordChangedAt property for the user
  // 4) Log the user in, send jwt
  createAndSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from DB based on id
  const user = await User.findById(req.user.id).select('+password');
  // 2) Check if posted password is correct
  const { currentPassword, password, passwordConfirm } = req.body;
  if (!currentPassword)
    return next(new AppError('Please provide your current password', 400));
  if (!(await user.verifyPassword(currentPassword, user.password))) {
    return next(new AppError('Your current password is wrong!', 401));
  }
  // 3) Update the password
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();
  // 4) Log the user in
  createAndSendToken(user, 200, req, res);
});

// Confirm user email address
exports.confirmEmail = catchAsync(async (req, res, next) => {
  // 1) Get token from the query
  const { token } = req.query;
  if (!token) return next(new AppError('Token is required', 400));
  // 2) Generate hashed token from req.token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  // 3) Get user based on provided token
  const user = await User.findOne({
    confirmEmailToken: hashedToken,
    isEmailConfirmed: false
  });
  if (!user) return next(new AppError('Token is invalid', 400));
  // 4) Update user and save it to DB
  user.isEmailConfirmed = true;
  user.confirmEmailToken = undefined;
  await user.save({ validateBeforeSave: false });
  // 5) Send welcome email to user
  const url = `${req.protocol}://${req.get('host')}/me`;
  await new Email(user, url).sendWelcome();
  // 6) Log user in and send jwt
  createAndSendToken(user, 200, req, res);
});
