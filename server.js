// server.js (UPDATED for Socket.IO integration)

// Import dotenv for reading from .env file
require('dotenv').config();

const express = require('express');
const http = require('http'); 

// Import Models
const scoreModel = require('./models/scoreModel');

// Import socket.io for socket functionality
const { Server } = require('socket.io'); 
const { setIoInstance } = require('./controllers/scoreController'); 

// Import path for dir path
const path = require('path'); 

// Imoort Routes
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes'); 
const messageRoutes = require('./routes/messageRoutes'); 
const statusRoutes = require('./routes/statusRoutes'); 
const scoreRoutes = require('./routes/scoreRoutes'); 

// Create express instance
const app = express();
const PORT = process.env.PORT || 3000;

// Create the HTTP server instance from the Express app
const server = http.createServer(app); 

// Initialize Socket.IO and attach it to the HTTP server
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for easy testing
        methods: ["GET", "POST"]
    }
});

// Pass the Socket.IO instance to the controller
setIoInstance(io); 

// =================================================================
//  SOCKET.IO LOGIC: The real-time magic happens here! 🧙‍♂️
// =================================================================
io.on('connection', (socket) => {
    console.log(`\nSOCKET.IO: User connected! ID: ${socket.id}`);
    
    // Send a welcome message to the new user
    socket.emit('message', { user: 'Server', content: 'Welcome to the Practice Chat! Say hi! 👋' });

    // When a client connects, send them the CURRENT top scores instantly
    scoreModel.getTopScores() // Requires importing scoreModel here too
        .then(scores => {
            socket.emit('scoreboard update', scores); // Send current state to new client
        })
        .catch(err => console.error("Error sending initial scores:", err));

    // Handle incoming chat messages from the client
    socket.on('chat message', (msg) => {
        console.log(`[Chat Received] ${socket.id}: ${msg}`);
        
        // Broadcast the message to ALL connected clients (including the sender)
        io.emit('chat message', { user: socket.id, content: msg });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`SOCKET.IO: User disconnected. ID: ${socket.id}`);
        io.emit('message', { user: 'Server', content: `User ${socket.id} has left the building! 🚪` });
    });
});
// =================================================================

app.use(express.json());

// Mount the REST routers (no changes here)
app.use('/api', userRoutes); 
app.use('/api/todos', todoRoutes); 
app.use('/api/messages', messageRoutes); 
app.use('/api/status', statusRoutes); 
app.use('/api/scores', scoreRoutes); 

app.get('/', (req, res) => {
    // __dirname is the current directory (where server.js is)
    // path.join safely combines the directory with the filename
    res.sendFile(path.join(__dirname, 'client.html'));
});

// 6. Use server.listen, not app.listen, since Socket.IO is attached to 'server'
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});