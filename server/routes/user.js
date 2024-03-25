const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
var checkUserRole = require("../middleware/checkUserRole")
const Notice = require("../models/Notice");
const User = require("../models/User");
const Funds = require("../models/Funds");



//Route 1 : Read  Notice using : get "/api/user/fetchnotices --->  Login required
router.get("/fetchnotices", fetchuser,checkUserRole('User'), async (req, res) => {
    try {
      const notice = await Notice.find();
      res.json(notice);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });


//Route 2: fetch Funds using: POST "api/user/fetchFunds". require User Login 
router.get("/fetchFunds", fetchuser,checkUserRole('User'), async (req, res) => {
    try {
      const funds = await Funds.find();
      res.json(funds);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  router.post("/fetchmember", fetchuser, checkUserRole('User'), async (req, res) => {
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
router.put("/updateUser/:id", fetchuser,checkUserRole('User'), async (req, res) => {
  try {
    // Create an updateMember object
    const updateMember = {};
    const { name, phone, Address, roomNo } = req.body;
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
router.post("/changepassword", fetchuser, checkUserRole('User'), async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    // Find the user by ID
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the current password provided matches the user's stored password
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});



module.exports= router;