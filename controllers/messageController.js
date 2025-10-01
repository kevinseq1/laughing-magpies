// controllers/messageController.js

const messageModel = require('../models/messageModel');

class MessageController {
    /**
     * Handles POST /api/messages (Post a new message)
     */
    async postMessage(req, res) {
        try {
            // Get user ID from the authentication middleware (req.user)
            const userId = req.user.userId;
            const { content } = req.body; 

            if (!content || content.trim().length === 0) {
                return res.status(400).json({ error: 'Message content cannot be empty.' });
            }

            const newMessage = await messageModel.add(userId, content);
            
            // Respond with the minimal created object
            res.status(201).json({ 
                message: 'Message posted.', 
                data: { id: newMessage.id, content: newMessage.content } 
            });
        } catch (error) {
            console.error('Error posting message:', error);
            res.status(500).json({ error: 'Failed to post message.' });
        }
    }

    /**
     * Handles GET /api/messages (Get message history)
     */
    async getHistory(req, res) {
        try {
            const history = await messageModel.getHistory();
            res.json(history);
        } catch (error) {
            console.error('Error fetching history:', error);
            res.status(500).json({ error: 'Failed to retrieve message history.' });
        }
    }
}

module.exports = new MessageController();