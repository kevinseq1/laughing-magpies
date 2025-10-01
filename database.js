// database.js 

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const DB_PATH = path.join(__dirname, 'app.db');

const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    // ... Initialization logic ...
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to the SQLite database.');

        // Create TODO table
        db.run(`
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                completed BOOLEAN NOT NULL DEFAULT 0,
                user_id INTEGER, 
                FOREIGN KEY(user_id) REFERENCES users(id) 
            )
        `, (err) => {
            if (err) {
                console.error("Error creating table:", err.message);
            }
            // Optional: Insert initial data if table was just created
            else if (this.changes === 1) { 
                console.log("To-Dos table created. Inserting initial data.");
                db.run("INSERT INTO todos (title, completed) VALUES (?, ?)", ["Set up SQLite3", 1]);
                db.run("INSERT INTO todos (title, completed) VALUES (?, ?)", ["Refactor Model layer with Promises", 0]);
            }
        });

        // Create Users Table
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error("Error creating users table:", err.message);
            } else {
                console.log("Users table initialized.");
            }
        });

        // Create Messages table
        db.run(`
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL,
                user_id INTEGER NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        `, (err) => {
            if (err) {
                console.error("Error creating messages table:", err.message);
            } else {
                console.log("Messages table initialized.");
            }
        });

        // Initialize the 'user_statuses' table
        // This table uses user_id as its primary key, ensuring only one status per user
        db.run(`
            CREATE TABLE IF NOT EXISTS user_statuses (
                user_id INTEGER PRIMARY KEY,
                status_text TEXT NOT NULL,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        `, (err) => {
            if (err) {
                console.error("Error creating user_statuses table:", err.message);
            } else {
                console.log("User Status table initialized.");
            }
        });

        // Initialize the 'scores' table
        db.run(`
            CREATE TABLE IF NOT EXISTS scores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                score INTEGER NOT NULL,
                game_title TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        `, (err) => {
            if (err) {
                console.error("Error creating scores table:", err.message);
            } else {
                console.log("Scores table initialized.");
            }
        });
        
    }
});

module.exports = db;