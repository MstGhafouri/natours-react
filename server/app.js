const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

const globalErrorHandler = require('./controllers/errorController');
const setupAppMiddlewares = require('./middlewares/app');
const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();

// 1) Load config file
dotenv.config({
  path: path.join(
    __dirname,
    `../configs/.env.${process.env.NODE_ENV || 'production'}`
  )
});

// Setup middlewares
setupAppMiddlewares(app);

// App ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// Serve client app
if (process.env.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(path.resolve(__dirname, '../client', 'build')));

  app.get('*', (req, res, next) => {
    // Serve index.html file if it doesn't recognize the route
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

// Catch all unknown routes
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.method} ${req.originalUrl} on this server`,
      404
    )
  );
});
// Final middleware, Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
