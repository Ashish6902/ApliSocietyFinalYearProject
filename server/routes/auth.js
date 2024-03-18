const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")
require('dotenv').config()

// Load JWT Secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET;

// Route 1:Create user using: POST "api/auth/Addadmin". Doesn't require authentication 
router.post('/Addadmin', [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
    body('phone').isLength({min:10}),
    body('Address').isLength({min:10}),
    body('roomNo').exists()
], async (req, res) => {
    // Check validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone, 
            role: "Admin",
            Address:req.body.Address,
            roomNo:req.body.roomNo
        });

        // Generate JWT token
        const tokenData = {
            id: newUser.id
        };
        const authtoken = jwt.sign(tokenData, JWT_SECRET);

        // Return response with token
        res.json({ authtoken });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


//Route 2:Authentication a user using post : "/api/auth/login". Doesn't require authentication 
router.post('/login', [
    body('email','enter valid email').isEmail(),
    body('password','password cannot be balnk').exists(),
], async (req, res) => {
     //check validations
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

     const { email, password } = req.body;
     try{
        let user =  await User.findOne({ email});
        if(!user){
            return res.status(400).json("Login with correct Credentials");
        }
        const comparePassword = await bcrypt.compare(password,user.password);
        if(!comparePassword){
            return res.status(400).json("Login with correct Credentials");
        }
        const data = {
            id: user.id
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
     }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }    
});

//Route 3 Get user Deails using post : "/api/auth/getuser" login required
router.post('/getuserRole', fetchuser,  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("role")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
module.exports = router;
