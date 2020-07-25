const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  // eslint-disable-next-line no-console
  console.error('Uncaught Exception 🧨🧨🧨: \n', err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: path.join(__dirname, '../config.env') });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('DataBase connection established ✔✔✔');
  });

const port = process.env.PORT || 3007;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}...`);
});

process.on('unhandledRejection', err => {
  // eslint-disable-next-line no-console
  console.error('Unhandled Rejection 🧨🧨🧨: \n', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Heroku send every 24h SIGTERM to close the server
process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.log('Sigterm signal received!. Shutting down gracefully!');
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('Process terminated gracefully !');
  });
});
