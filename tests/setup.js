const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: path.join(__dirname, "../configs/.env.test")
});

// Connect to DB
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

afterAll(() => {
  mongoose.disconnect();
});

jest.setTimeout(30000);
