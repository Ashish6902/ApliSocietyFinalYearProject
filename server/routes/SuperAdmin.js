const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const checkUserRole = require("../middleware/checkUserRole");
const Society = require("../models/Society");

// Middleware to parse JSON bodies
router.use(express.json());

// Route 1: Create Society using: POST "/api/superAdmin/AddSociety" ---> Login required
router.post("/AddSociety", fetchuser, checkUserRole('SuperAdmin'),
    [
        body("SocietyName", "Title cannot be empty").exists(),
        body("Address", "Description should be at least 5 characters").exists(),
        body("Contact").isLength({ min: 10 })
    ],
    async (req, res) => {
        try {
            const { SocietyName, Address, Contact, date } = req.body;
            // Check validations
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const society = new Society({
                SocietyName,
                Address,
                Contact,
                date
            });

            const savedSociety = await society.save();

            res.json(savedSociety);
        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    }
);

// Route 2: Create user using Get "api/superAdmin/SocietyList".
router.get("/SocietyList", fetchuser,checkUserRole('SuperAdmin'), async (req, res) => {
    try {
      const society = await Society.find();
      res.json(society);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
  
  
// Route 3: Create user using POST "api/superAdmin/Addadmin". 
router.post('/Addadmin', fetchuser, checkUserRole('SuperAdmin'),[
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
    body('phone').isLength({ min: 10 }),
    body('Address').isLength({ min: 10 }),
    body('roomNo').exists(),
    body('societyId').isMongoId() // Assuming societyId is provided in the request body and is a valid MongoDB ObjectId
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
            Address: req.body.Address,
            roomNo: req.body.roomNo,
            society: req.body.societyId // Assign societyId from request body to society field
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
module.exports = router;
