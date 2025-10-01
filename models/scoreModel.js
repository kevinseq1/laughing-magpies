// models/scoreModel.js

const db = require('../database');

class ScoreModel {
    /**
     * Saves a new score for a user.
     */
    add(userId, score, gameTitle) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO scores (user_id, score, game_title) VALUES (?, ?, ?)';
            db.run(sql, [userId, score, gameTitle], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve({ id: this.lastID, user_id: userId, score: score });
            });
        });
    }

    /**
     * Retrieves the top 10 scores globally, including the username.
     */
    getTopScores() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    s.score, 
                    s.game_title, 
                    s.timestamp, 
                    u.username 
                FROM scores s
                JOIN users u ON s.user_id = u.id
                ORDER BY s.score DESC
                LIMIT 10
            `;
            // db.all gets multiple rows
            db.all(sql, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
}

module.exports = new ScoreModel();