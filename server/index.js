const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 8080

const app = express()

// our server instance
const server = http.createServer(app)

let players = [];

// This creates our socket using the instance of the server
const io = socketIO(server)
 
io.on('connection', socket => {
  io.sockets.emit('players', players);


  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))