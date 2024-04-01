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


//Route 1:Authentication a user using post : "/api/auth/login". Doesn't require authentication 
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
        const userID = user.id;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken, userID  });
     }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }    
});

//Route 2 Get user Deails using post : "/api/auth/getuser" login required it give id role and society id to frontend
router.post('/getuserRole', fetchuser,  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("role _id societyId")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
module.exports = router;
