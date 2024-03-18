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

// Route 3: Fetch members details using: POST "api/secretary/fetchmembers". require Admin Login 
router.get("/fetchmembers", fetchuser,checkUserRole('User'), async (req, res) => {
    try {
      const user = await User.find().select("-password");
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

module.exports= router;