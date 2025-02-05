const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from header

  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded user info for further use
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticateJWT };
