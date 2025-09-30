// server.js

// 1. Import the express modules
const express = require('express');

// 2. Initialize the app
const app = express();
const PORT = 3000;

// 3. Define the basic routes
app.get('/', (req, res) => {
    // Send a JSON response
    res.json({ message: 'Hello from you simple practice server! 👋🏽'});
});

// 4. Start the server
app.listen(PORT, () => {
    console.log(`🎉 Server is running on http://localhost:${PORT}`);
});
