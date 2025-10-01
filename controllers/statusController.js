// controllers/statusController.js

const statusModel = require('../models/statusModel');

class StatusController {
    /**
     * Handles GET /api/status/:userId (Retrieve a user's status)
     */
    async getStatus(req, res) {
        try {
            const userId = parseInt(req.params.userId);
            
            if (isNaN(userId)) {
                return res.status(400).json({ error: 'Invalid user ID.' });
            }
            
            const status = await statusModel.getStatus(userId);

            if (!status) {
                return res.status(404).json({ error: 'User status not found.' });
            }
            
            // Return the stored status
            res.json(status);
        } catch (error) {
            console.error('Error fetching status:', error);
            res.status(500).json({ error: 'Failed to retrieve status.' });
        }
    }
}

module.exports = new StatusController();