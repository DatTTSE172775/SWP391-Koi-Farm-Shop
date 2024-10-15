const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure you have a .env file with a secret key

// Middleware function to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Assuming Bearer Token

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided. Access denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add the user data to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token. Access denied." });
  }
};

module.exports = authMiddleware;
