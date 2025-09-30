// models/todoModel.js

const db = require('../database');

class TodoModel {
    /**
     * Gets all todos for a specific user.
     * @param {number} userId
     */
    getAll(userId) { 
        return new Promise((resolve, reject) => {
            // 1. Only select todos where user_id matches
            db.all('SELECT * FROM todos WHERE user_id = ? ORDER BY id DESC', [userId], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    /**
     * Adds a new todo for a specific user.
     * @param {string} title
     * @param {number} userId
     */
    add(title, userId) { 
        return new Promise((resolve, reject) => {
            // 2. Insert the user_id with the new todo
            db.run('INSERT INTO todos (title, completed, user_id) VALUES (?, ?, ?)', [title, 0, userId], function(err) {
                if (err) {
                    return reject(err);
                }
                const newTodo = { id: this.lastID, title: title, completed: 0, user_id: userId };
                resolve(newTodo);
            });
        });
    }
}

module.exports = new TodoModel();