// routes/statusRoutes.js

const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');
const rateLimitMiddleware = require('../middleware/rateLimitMiddleware');

// This endpoint is public for simplicity (like fetching anyone's status), 
// but you could add a lightweight middleware for rate limiting here.
router.get('/:userId', rateLimitMiddleware, statusController.getStatus);

module.exports = router;