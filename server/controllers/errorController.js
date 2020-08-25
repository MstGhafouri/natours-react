const AppError = require('../utils/appError');

// MongoDB duplicate fields error handler
// We marked mongodb errors as known errors
const handleDuplicateErrorDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// MongoDB validation error handler
const handleValidationErrorDB = err => {
  const errs = Object.values(err.errors).map(el => el.message);
  return new AppError(`Invalid input data: ${errs.join('. ')}`, 400);
};

// MongoDB CastError handler (ex: invalid id !)
const handleCastErrorDB = err =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleJWTValidationError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Token is expired. Please log in again!', 401);

const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
};

const sendErrorProd = (err, req, res) => {
  // Trusted Exceptions, ( Known !)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
  // Unknown Exceptions, don't leak error details to client
  // eslint-disable-next-line no-console
  console.error('Error 🧨🧨🧨 ', err);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong :('
  });
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  // 1) SEND DEVELOPMENT ERRORS
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  }
  // 2) SEND PRODUCTION ERRORS
  else if (process.env.NODE_ENV === 'production') {
    let error = { ...err, message: err.message };

    if (err.code === 11000) error = handleDuplicateErrorDB(error);
    else if (err.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    else if (err.name === 'CastError') error = handleCastErrorDB(error);
    else if (err.name === 'JsonWebTokenError')
      error = handleJWTValidationError();
    else if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
  next();
};
