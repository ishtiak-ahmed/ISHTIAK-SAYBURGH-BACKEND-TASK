const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('decoded:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Token is not valid");
  }
};

module.exports = protect;
