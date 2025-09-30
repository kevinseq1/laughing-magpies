// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the registration route
// POST /api/register
router.post('/register', userController.register);

// Define the login route
// POST /api/login
router.post('/login', userController.login);

module.exports = router;