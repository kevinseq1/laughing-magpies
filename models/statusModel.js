// models/statusModel.js

const db = require('../database');

class StatusModel {
    /**
     * Inserts or Updates a user's current status.
     * We use a common SQLite pattern (INSERT OR REPLACE) for upsert functionality.
     * @param {number} userId - The ID of the user
     * @param {string} statusText - The new status text
     */
    updateStatus(userId, statusText) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT OR REPLACE INTO user_statuses (user_id, status_text)
                VALUES (?, ?)
            `;
            // db.run is used for INSERT, UPDATE, or DELETE (queries that don't return data)
            db.run(sql, [userId, statusText], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve({ 
                    user_id: userId, 
                    status_text: statusText, 
                    updated: true 
                });
            });
        });
    }

    /**
     * Retrieves the current status for a user.
     * @param {number} userId
     */
    getStatus(userId) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM user_statuses WHERE user_id = ?', [userId], (err, row) => {
                if (err) {
                    return reject(err);
                }
                // Resolve with the row (or undefined if not found)
                resolve(row); 
            });
        });
    }
}

module.exports = new StatusModel();