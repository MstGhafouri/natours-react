const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'User must have a name']
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  email: {
    type: String,
    required: [true, 'User must have an email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  role: {
    type: String,
    default: 'user',
    enum: {
      values: ['admin', 'guide', 'lead-guide', 'user'],
      message: 'Role is either: admin, guide, lead-guide or user'
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [7, 'Password must be longer or equal than 7 characters'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpiresAt: Date
});

// 1) Hash passwords
userSchema.pre('save', async function (next) {
  // If password field has not been modified, next()!
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  // Don't persist passwordConfirm in DB
  this.passwordConfirm = undefined; // We don't need passwordConfirm !
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  // Signing jwt is a little bit faster than saving document into DB
  // So we subtract passwordChangedAt a little bit in the past
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.verifyPassword = async function (
  candidatePassword,
  actualPassword
) {
  // Here because select password is false we can not use 'this' !!!
  return await bcrypt.compare(candidatePassword, actualPassword);
};

userSchema.methods.checkUserChangedPasswordAfter = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changedTimeStamp > jwtTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now !

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
