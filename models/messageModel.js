// models/messageModel.js

const db = require('../database');

class MessageModel {
    /**
     * Posts a new message to the database.
     * @param {number} userId - The ID of the user posting the message
     * @param {string} content - The content of the message
     */
    add(userId, content) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO messages (user_id, content) VALUES (?, ?)';
            db.run(sql, [userId, content], function(err) {
                if (err) {
                    return reject(err);
                }
                // Return basic info (we'll fetch the full object in getHistory)
                resolve({
                    id: this.lastID,
                    user_id: userId,
                    content: content
                });
            });
        });
    }

    /**
     * Retrieves the last 50 messages, including the username.
     */
    getHistory() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    m.id, 
                    m.content, 
                    m.timestamp, 
                    u.username 
                FROM messages m
                JOIN users u ON m.user_id = u.id
                ORDER BY m.timestamp DESC
                LIMIT 50
            `;
            // db.all runs the query to get multiple rows
            db.all(sql, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows.reverse()); // Reverse to show oldest first
            });
        });
    }
}


module.exports = new MessageModel();
