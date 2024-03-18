var jwt = require('jsonwebtoken');
require('dotenv').config()

// Load JWT Secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add it to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const decodedData = jwt.verify(token, JWT_SECRET);
        req.user = decodedData;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchuser;
