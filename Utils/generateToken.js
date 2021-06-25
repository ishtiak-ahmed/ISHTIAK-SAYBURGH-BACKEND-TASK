const jwt = require("jsonwebtoken");

const generateToken = id =>
  jwt.sign(
    {
      id
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d"
    }
  );

module.exports = generateToken;
