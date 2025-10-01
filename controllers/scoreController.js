// controllers/scoreController.js

const scoreModel = require('../models/scoreModel');

// We need a reference to the Socket.IO server for broadcasting.
// We'll pass this reference from server.js later.
let ioInstance; 
const setIoInstance = (io) => {
    ioInstance = io;
};

class ScoreController {
    /**
     * Handles POST /api/scores (Secure submission)
     */
    async addScore(req, res) {
        try {
            // 1. WHY: Authentication is essential. Get userId from the JWT payload.
            const userId = req.user.userId;
            const { score, gameTitle } = req.body; 

            if (!score || !gameTitle || typeof score !== 'number' || score < 0) {
                return res.status(400).json({ error: 'Valid score and game title are required.' });
            }

            // 2. WHY: Save to the database for persistence (REST)
            await scoreModel.add(userId, score, gameTitle);
            
            // 3. WHY: Get the updated top scores to broadcast the latest data
            const topScores = await scoreModel.getTopScores();

            // 4. WHY: Real-Time Update! If the Socket.IO server is running, broadcast.
            // ioInstance.emit sends data instantly to all connected clients.
            if (ioInstance) {
                 ioInstance.emit('scoreboard update', topScores);
                 console.log(`[Scoreboard] Broadcasted new top scores! 🏆`);
            }
            
            res.status(201).json({ 
                message: 'Score submitted and scoreboard updated.',
                currentTopScores: topScores 
            });
        } catch (error) {
            console.error('Error submitting score:', error);
            res.status(500).json({ error: 'Failed to submit score.' });
        }
    }

    /**
     * Handles GET /api/scores (Initial Scoreboard load)
     */
    async getScores(req, res) {
        try {
            const topScores = await scoreModel.getTopScores();
            res.json(topScores);
        } catch (error) {
            console.error('Error fetching scores:', error);
            res.status(500).json({ error: 'Failed to retrieve scoreboard.' });
        }
    }
}

module.exports = {
    scoreController: new ScoreController(),
    setIoInstance, // Export the setter function
};