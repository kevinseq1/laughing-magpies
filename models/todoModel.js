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
        return new Promise((resolve, reject) => {
            // db.all runs the query, and we handle the callback results in the Promise
            db.all('SELECT * FROM todos ORDER BY id DESC', (err, rows) => {
                if (err) {
                    return reject(err); // Reject the promise on error
                }
                resolve(rows); // Resolve the promise with data on success
            });
        });
    }

    // Logic to add a new to-do
    add(title) {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO todos (title, completed) VALUES (?, ?)', [title, 0], function(err) {
                if (err) {
                    return reject(err);
                }
                // The 'this.lastID' property holds the auto-generated ID
                const newTodo = { id: this.lastID, title: title, completed: 0 };
                resolve(newTodo);
            });
        });
    }
}

// Export a single instance of the model
module.exports = new TodoModel();