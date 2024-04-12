const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const checkUserRole = (requiredRole) => {
    return async (req, res, next) => {
        // Get the user ID from the decoded JWT token
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).send({ error: "Please authenticate using a valid token" });
        }
        try {
            const decodedData = jwt.verify(token, JWT_SECRET);
            
            // Fetch the user record from the database using the user ID
            const user = await User.findById(decodedData.id);
            if (!user) {
                return res.status(401).send({ error: "User not found" });
            }

            // Check if the user's role matches the required role
            if (user.role !== requiredRole) {
                return res.status(403).json({ error: 'Forbidden', message: 'You do not have permission to access this resource' });
            }
            // If the user's role matches, attach the user object to the request
            req.user = user;
            next();
        } catch (error) {
            console.error("JWT verification error:", error);
            res.status(401).send({ error: "Please authenticate using a valid token" });
        }
    };
};

module.exports = checkUserRole;
