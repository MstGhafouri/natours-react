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

const port = process.env.PORT || 5050;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}...`);
});

const shutDown = () => {
  // eslint-disable-next-line no-console
  console.log('Sig signal received!. Shutting down gracefully!');
  server.close(err => (err ? process.exit(1) : process.exit()));
};

process.on('unhandledRejection', err => {
  // eslint-disable-next-line no-console
  console.error('Unhandled Rejection 🧨🧨🧨: \n', err.name, err.message);
  shutDown();
});

// Heroku send every 24h SIGTERM to close the server
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
