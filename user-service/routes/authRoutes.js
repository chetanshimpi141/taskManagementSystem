const express = require('express');
const { registerUser } = require('../utils/authUtils');
const { loginUser,loginAdmin } = require('../controllers/authController');


const router = express.Router();
//Route to register user
router.get('/register',registerUser)
// Route for user login
router.post('/login',loginUser);

// Route for admin login
router.post('/login/admin', loginAdmin);

module.exports = router;
