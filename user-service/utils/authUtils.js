const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


//common function for login admin/employee
const userLogin = async (req,res,role) =>{
  const {email, password} = req.body;
  // if(endpoint === 'login' || 'admin'){
  //   ne
  // } 
  try {
    console.log("in email verification");
    // Check if the user is present in db or not
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      
      throw new Error('User not found');
    }

    //check role of the user
    if(existingUser.role !== role){
      console.log("in role verification");
      throw new Error(`not authorized user ${role}`);
    }
    // Check if the password matches
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { id: existingUser.id, email: existingUser.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {
      message: 'Login successful',
      token,
    };
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}


// User Registration
const registerUser = async (req, res) => {
  const { username, email, password, role} = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = await User.create({ username, email, password ,role});
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// // User Login
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


module.exports = { registerUser , userLogin };
