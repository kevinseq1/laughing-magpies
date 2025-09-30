// models/todoModel.js

// 1. In-memory array to simulate the database
let todos = [
    { id: 1, title: 'Learn MVC architecture', completed: true },
    { id: 2, title: 'Practice Node.js networking', completed: false },
];
let nextId = 3; // Counter for new items

class TodoModel {
    // Logic to fetch all to-dos
    getAll() {
        // In a real app, this would be a DB query
        return todos;
    }

    // Logic to add a new to-do
    add(title) {
        const newTodo = {
            id: nextId++,
            title: title,
            completed: false
        };
        todos.push(newTodo);
        return newTodo;
    }
}

// Export a single instance of the model
module.exports = new TodoModel();