require('dotenv').config(); // Make sure this is called at the top
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

// Middleware to check token
const authMiddleware = (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Token not found, please login again' });
    }


    // Verify the token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = user; // Attach the user object to the request for use in other routes
        next();
    });
};

module.exports = authMiddleware;
