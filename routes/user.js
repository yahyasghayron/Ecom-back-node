const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try{
  const {name, email, password} = req.body;
  let user = await User.create({name, email, password});
  res.status(201).json(user);
  } catch(err){
    res.status(400).json({message: err.message});
  }
});

// Login
router.post("/login", async (req, res) => {
    try {
        console.log("Request received");
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        console.log("User query complete:", user);

        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        console.log("Password comparison complete:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("Token created");
        res.json({ token });
    } catch (err) {
        console.error("Error in login route:", err.message);
        res.status(500).json({ message: err.message });
    }
});



// get all users
router.get('/', auth, async (req, res) => {
  try{
    let users = await User.find();
    res.status(200).json(users);
  }catch(err){
    res.status(400).json({message: err.message});
  }
});


// get authenticated user
router.get('/me', auth, async (req, res) => {
  try{
    res.status(200).json(req.user);
  }catch(err){
    res.status(400).json({message: err.message});
  }
});

module.exports = router;

