// controllers/todoController.js (UPDATED)

// 1. Import the model (previously service)
const todoModel = require('../models/todoModel'); // *** Note the change: ../models/todoModel

class TodoController {
    // Handler for GET /api/todos
    getAllTodos(req, res) {
        const todos = todoModel.getAll();
        res.json(todos);
    }

    // Handler for POST /api/todos
    addTodo(req, res) {
        // The title would come from the request body (req.body.title)
        // For simplicity now, let's hardcode it until we introduce body parsing
        const title = "New task via POST (simulated)"; 
        
        const newTodo = todoModel.add(title);
        // Respond with the newly created resource and a 201 status
        res.status(201).json(newTodo);
    }
}

module.exports = new TodoController();