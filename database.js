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
        db.run(`
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                completed BOOLEAN NOT NULL DEFAULT 0
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
    }
});

module.exports = db;