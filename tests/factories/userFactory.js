const mongoose = require("mongoose");

const User = new mongoose.model("User");

const testUser = {
  name: "Test User",
  email: "test@test.com",
  password: "testpass",
  passwordConfirm: "testpass"
};

exports.testUser = testUser;

exports.createTestUser = () => User.create(testUser);

exports.deleteUserCollection = () => User.deleteMany({});
