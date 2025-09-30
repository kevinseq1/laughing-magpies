// models/userModel.js

const db = require('../database');
const bcrypt = require('bcrypt'); // 1. Import bcrypt

const SALT_ROUNDS = 10; // Standard salt rounds for bcrypt

class UserModel {
    /**
     * Creates a new user in the database.
     * @param {string} username
     * @param {string} email
     * @param {string} password - The plain text password
     */
    async create(username, email, password) {
        // 2. Hash the password before storage (using async/await with bcrypt)
        const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO users (username, email, password_hash)
                VALUES (?, ?, ?)
            `;
            // 3. Use the hashed password in the DB query
            db.run(sql, [username, email, password_hash], function(err) {
                if (err) {
                    // Check for UNIQUE constraint failure (user already exists)
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return reject(new Error("User with that email or username already exists."));
                    }
                    return reject(err);
                }
                
                // Return basic user info (NEVER the hash)
                resolve({
                    id: this.lastID,
                    username: username,
                    email: email
                });
            });
        });
    }

    /**
     * Placeholder: Finds a user by email (needed for Part 2: Login)
     */
    findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
                if (err) return reject(err);
                resolve(row); // row will be undefined if not found
            });
        });
    }
}

module.exports = new UserModel();