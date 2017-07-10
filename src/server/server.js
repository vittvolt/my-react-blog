const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket.listen(server);

// The index page
app.get('/', (req, res) => {
  res.sendFile(path.resolve('dist', './index.html'));
});

// The main js script
app.get('/browser.js', (req, res) => {
  res.sendFile(path.resolve('dist', './browser.js'));
});

// In fonts folder
app.get('/fonts/*.css', (req, res) => {
  res.sendFile(path.resolve('dist', 'fonts', 'source-sans-pro.css')); // if you think hardcoding is bad, change it yourself
});

// All the other files should go to the current folder
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('dist', '.' + req.originalUrl));
});


io.on('connection', function(socket) {
  socket.on('i am client', (d) => {console.log('received i am client from client !')});
});


server.listen(3000);
// app.listen(3000, function () {
//   console.log('Hell yea...');
// });

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:3000/");