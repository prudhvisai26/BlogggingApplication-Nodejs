const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const SECRET = "Namaste";

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      return res.status(400).json({
        error: "You must logged in to post a blog.",
      });
    }

    const token = authHeaders.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "No token Authorization denied!",
      });
    }

    const decoded = jwt.verify(token, SECRET);
    const user = User.findOne({ where: { id: decoded.user.id } });

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      err: err.message,
    });
  }
};

module.exports = isAuthenticated;
