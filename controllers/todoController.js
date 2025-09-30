// controllers/todoController.js (UPDATED)

// 1. Import the model (previously service)
const todoModel = require('../models/todoModel'); // *** Note the change: ../models/todoModel

class TodoController {
    // Handler for GET /api/todos
    async getAllTodos(req, res) { // <-- Make function async
        try {
            const todos = await todoModel.getAll(); // <-- Await the promise
            res.json(todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
            res.status(500).json({ error: 'Failed to retrieve to-dos' });
        }
    }

    // Handler for POST /api/todos
    async addTodo(req, res) { // <-- Make function async
        try {
            const { title } = req.body; 

            if (!title) {
                return res.status(400).json({ error: 'Title is required' });
            }

            const newTodo = await todoModel.add(title); // <-- Await the promise
            res.status(201).json(newTodo);
        } catch (error) {
            console.error('Error adding todo:', error);
            res.status(500).json({ error: 'Failed to add to-do' });
        }
    }
}

module.exports = new TodoController();