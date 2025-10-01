// routes/messageRoutes.js

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authenticateToken = require('../middleware/authMiddleware');

// All message routes require authentication
router.use(authenticateToken); 

// POST /api/messages - Post a new message
router.post('/', messageController.postMessage);

// GET /api/messages - Get message history
router.get('/', messageController.getHistory);

module.exports = router;