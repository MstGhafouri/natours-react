const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const bookingController = require('../controllers/bookingController');

module.exports = app => {
  // Enable trust proxy for heroku headers
  app.enable('trust proxy');

  // 1) MIDDLEWARES
  // Enable cross-origin requests
  app.use(cors());
  // For none-simple requests such as put, patch, delete or also
  // requests which send cookies or use none-standard headers, they require a preflight phase!
  // Browsers send options request to check if is safe to send actual request!  ):
  // So we need to send  Access Control Origin Header !
  app.options('*', cors());

  app.use(helmet()); // Set secure headers

  // Limit requests from the same IP to protect against attacks ( brute force !)
  const limiter = rateLimit({
    max: 100, // Max api request
    windowMs: 60 * 60 * 1000, // Per one hour,
    message: {
      status: 'fail',
      message:
        'Too many requests from the this IP. Please try again in an hour!'
    }
  });
  app.use('/api', limiter);

  app.post(
    '/webhook-checkout',
    express.raw({ type: 'application/json' }),
    bookingController.webhookCheckout
  );

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Development logger
  }
  // Body parser, reading data from body into req.body (limited to 10kb)
  app.use(express.json({ limit: '10kb' }));
  // Cookie parser, parse the cookie that browser sends
  app.use(cookieParser());
  // Form parser, reading data from form into req.body
  // Only when we need to respond to form actions !
  app.use(express.urlencoded({ extended: true, limit: '1kb' }));

  // Data sanitization against NoSql query injections
  app.use(mongoSanitize());
  // Data sanitization against XSS ( Cross-site scripting attack !)
  app.use(xss());

  // Prevent parameter pollution (Http Parameter Pollution)
  // Clear up query string
  app.use(
    hpp({
      whitelist: [
        'price',
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty'
      ]
    })
  );

  // Compress responses!
  app.use(compression());
};
