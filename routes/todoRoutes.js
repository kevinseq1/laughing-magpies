// routes/todoRoutes.js

const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Define the routes:
// GET /api/todos -> Call the getAllTodos function
router.get('/', todoController.getAllTodos);

// POST /api/todos -> Call the addTodo function
router.post('/', todoController.addTodo);

module.exports = router;