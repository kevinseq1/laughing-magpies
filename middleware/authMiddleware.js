// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

// Import the secret key from .env
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to verify a JWT and attach user data to the request.
 */
const authenticateToken = (req, res, next) => {
    // 1. Extract the token from the Authorization header (Bearer TOKEN)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        // 401 Unauthorized: No token provided
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // 2. Verify the token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            // 403 Forbidden: Token is invalid (e.g., expired, bad signature)
            return res.status(403).json({ error: 'Invalid or expired token.' });
        }

        // 3. Token is valid: Attach user payload to the request (req.user)
        req.user = user; 
        
        // 4. Move to the next middleware or route handler
        next();
    });
};

module.exports = authenticateToken;