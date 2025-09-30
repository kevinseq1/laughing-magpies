// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the registration route
// POST /api/register
router.post('/register', userController.register);

module.exports = router;