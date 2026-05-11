const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.send("No token");
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    res.send("Invalid token");
  }
};

module.exports = auth;