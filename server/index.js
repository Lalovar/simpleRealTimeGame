const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// our localhost port
const port = 8080;

const cors = require('cors');
const app = express();
app.use(cors());

// our server instance
const server = http.createServer(app);


let players = {};

// This creates our socket using the instance of the server
const io = socketIO(server);

io.on('connection', socket => {
    io.sockets.emit('players', players);
    
    socket.on('players', (currentPlayer) => {
        players[currentPlayer.i] = currentPlayer;
        io.sockets.emit('players', players);
    });
  
    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));