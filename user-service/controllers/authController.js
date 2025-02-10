const { userLogin } = require('../utils/authUtils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User Login
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     // Check if the password matches
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Generate JWT
//     const payload = { id: user.id, email: user.email };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

exports.loginUser = async (req, res) => {
  try {
    const response = await userLogin(req,res, 'employee'); 
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const response = await userLogin(req, res,'admin');  
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Logging middleware to log the last word of the endpoint
exports.logRequest = (req, next) => {
  const { method, originalUrl } = req;  // Extract HTTP method and original URL from the request
  const lastWord = originalUrl.split('/').filter(Boolean).pop();  // Get the last segment of the URL
  return (`${method} ${lastWord}`);  // Log the HTTP method and the last word of the URL
  next();  // Pass control to the next middleware or route handler
};

