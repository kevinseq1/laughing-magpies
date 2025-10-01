// tcpServer.js 

const net = require('net'); 
const statusModel = require('./models/statusModel');

const TCP_PORT = 5001;      

// A set to track connected sockets
const sockets = new Set(); 

const server = net.createServer((socket) => {
    sockets.add(socket); 
    
    console.log(`\nTCP Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

    socket.on('data', async (data) => { 
        const input = data.toString().trim();
        
        // Expected format: "[userId]|[Status Text]"
        const parts = input.split('|');

        if (parts.length < 2) {
            const errorMsg = 'ERROR: Expected format is [userId]|[Status Text]\n';
            socket.write(errorMsg);
            console.error(`[TCP Error] Invalid data format received: "${input}"`);
            return;
        }

        const userId = parseInt(parts[0].trim());
        const statusText = parts[1].trim();

        try {
            // Call the Model to persist the data
            await statusModel.updateStatus(userId, statusText); 
            
            console.log(`[Status Update] User ${userId} status set to: "${statusText}"`);
            
            // Send a success response back
            socket.write(`SUCCESS: Status for User ${userId} updated to "${statusText}"\n`);
        
        } catch (error) {
            console.error(`[DB Error] Failed to update status for user ${userId}: ${error.message}`);
            socket.write(`ERROR: Failed to update status in database.\n`);
        }
    });

    socket.on('end', () => {
        sockets.delete(socket); // Remove socket from the set
        console.log(`TCP Client disconnected: ${socket.remotePort}`);
    });


    // Handle errors
    socket.on('error', (err) => {
        console.error(`Socket error for client ${socket.remotePort}: ${err.message}`);
    });
});

// Start the TCP server listening
server.listen(TCP_PORT, () => {
    console.log(`\nRaw TCP Server is listening on port ${TCP_PORT}`);
    console.log(`Use 'nc localhost ${TCP_PORT}' to connect.`);
});