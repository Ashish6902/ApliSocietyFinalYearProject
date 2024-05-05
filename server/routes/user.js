const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
var checkUserRole = require("../middleware/checkUserRole");
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const Complaint = require("../models/Complaints");



  router.post("/fetchmember", fetchuser, async (req, res) => {
    try {
      const { _id } = req.body; 
      const user = await User.findById(_id).select("-password -role");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
  

// Route : update User POST :"api/user/Update" req user login
router.put("/updateUser/:id", fetchuser, async (req, res) => {
  try {
    // Create an updateMember object
    const updateMember = {};
    const { name, Address, roomNo } = req.body;
    if (name) updateMember.name = name;
    if (Address) updateMember.Address = Address;
    if (roomNo) updateMember.roomNo = roomNo;

    // Find the user to be updated and update it
    const member = await User.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ error: "User not found" });
    }

    if (member.id.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not allowed to update this user" });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateMember, {
      new: true,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Route: Change password POST "/api/user/changepassword"
router.put("/changepassword/:id", fetchuser, async (req, res) => {
  const { currentPass, newPass } = req.body; // Updated to match the body fields in your API call
  try {
    // Find the user by ID
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the current password provided matches the user's stored password
    const isPasswordMatch = await bcrypt.compare(currentPass, user.password); // Updated variable name
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPass, salt); // Updated variable name

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

//Create complaints
router.post('/addcomplaints', fetchuser, checkUserRole('User'), [
  body('Complaint').exists(),
], async (req, res) => {
  // Check validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create a new fund
    const complaint = await Complaint.create({
      Complaint: req.body.Complaint,
      isActive: true,
      societyId:req.user.societyId
    });

    // Return response with the created fund
    res.json(complaint );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports= router;