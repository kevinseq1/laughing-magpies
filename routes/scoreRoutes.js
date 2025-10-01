// routes/scoreRoutes.js

const express = require('express');
const router = express.Router();
const { scoreController } = require('../controllers/scoreController'); // Destructure controller
const authenticateToken = require('../middleware/authMiddleware');

// GET /api/scores - Public endpoint for viewing the scoreboard
router.get('/', scoreController.getScores); 

// POST /api/scores - Protected endpoint for submitting a score
router.post('/', authenticateToken, scoreController.addScore); 

module.exports = router;