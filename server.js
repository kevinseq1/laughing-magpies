// server.js

require('dotenv').config();

// 1. Import the express modules
const express = require('express');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 2. MIDDLEWARE: Tell Express to parse incoming JSON bodies (Crucial for POST/PUT)
app.use(express.json());

// 3. Mount the router
app.use('/api', userRoutes)
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
