const jwt = require("jsonwebtoken");

module.exports = userId => jwt.sign({ id: userId }, process.env.JWT_SECRET);
