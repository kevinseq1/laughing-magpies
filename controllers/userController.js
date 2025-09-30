// controllers/userController.js

const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import the secret key from .env
const JWT_SECRET = process.env.JWT_SECRET;

class UserController {
    /**
     * Handles POST /api/register
     */
    async register(req, res) {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password || password.length < 8) {
            return res.status(400).json({ error: 'All fields are required and password must be at least 8 characters.' });
        }

        try {
            // Call the model to create the user
            const newUser = await userModel.create(username, email, password);
            
            // Respond with success and the user's non-sensitive details
            res.status(201).json({ 
                message: 'User registered successfully.', 
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email
                }
            });
        } catch (error) {
            console.error('Registration error:', error.message);
            
            // Handle specific user existence error
            if (error.message.includes('User with that email or username')) {
                 return res.status(409).json({ error: error.message }); // 409 Conflict
            }
            
            res.status(500).json({ error: 'Failed to register user.' });
        }
    }

    /**
     * Handles POST /api/login
     */
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        try {
            // 2. Find the user by email
            const user = await userModel.findByEmail(email);

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials.' });
            }

            // 3. Compare the provided password with the stored hash
            const isMatch = await bcrypt.compare(password, user.password_hash);

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials.' });
            }

            // 4. Create and sign a JSON Web Token
            const token = jwt.sign(
                { userId: user.id, username: user.username }, // Payload
                JWT_SECRET, 
                { expiresIn: '1h' } // Token expires in 1 hour
            );

            // 5. Send the token back to the client
            res.json({ 
                message: 'Login successful', 
                token: token,
                userId: user.id 
            });

        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Failed to log in.' });
        }
    }

}

module.exports = new UserController();