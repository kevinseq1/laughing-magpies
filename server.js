// server.js

// 1. Import the express modules
const express = require('express');
const todoRoutes = require('./routes/todoRoutes'); // 1. Import the new router

const app = express();
const PORT = 3000;

// 2. MIDDLEWARE: Tell Express to parse incoming JSON bodies (Crucial for POST/PUT)
app.use(express.json());

// 3. Mount the router: All requests to '/api/todos' will go to todoRoutes
app.use('/api/todos', todoRoutes); 


// 3. Define the basic routes
app.get('/', (req, res) => {
    // Send a JSON response
    res.json({ message: 'Hello from you simple practice server! 👋🏽'});
});

// 4. Start the server
app.listen(PORT, () => {
    console.log(`🎉 Server is running on http://localhost:${PORT}`);
});
