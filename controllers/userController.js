// controllers/userController.js

const userModel = require('../models/userModel');

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
}

module.exports = new UserController();