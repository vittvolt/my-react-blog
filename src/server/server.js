const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket.listen(server);

const fs = require('fs');

// TODO:
// - Read the # of files first, return the information to the client,
// which is used during initialization

const Database = require('../components/database');
const db = new Database();
console.log(db.getPostTitle(1));

// The index page
app.get('/', (req, res) => {
  res.sendFile(path.resolve('dist', './index.html'));
});

// The main js script
app.get('/browser.js', (req, res) => {
  res.sendFile(path.resolve('dist', './browser.js'));
});

// All the other files should go to the dist folder
app.get('/*.svg', (req, res) => {
  res.sendFile(path.resolve('dist', '.' + req.originalUrl));
});

app.get('/*.ico', (req, res) => {
  res.sendFile(path.resolve('dist', '.' + req.originalUrl));
});

app.get('/*.svg', (req, res) => {
  res.sendFile(path.resolve('dist', '.' + req.originalUrl));
});

app.get('/*.ttf', (req, res) => {
  res.sendFile(path.resolve('dist', '.' + req.originalUrl));
});

// return the brief information (titles, simple description, etc.)
app.get('/posts/meta', (req, res) => {
  res.send(db.getPostTitles());
});

// return the content for that post
app.get('/posts/:postId', (req, res) => {
  db.getPostContent(req.params.postId, function(content) {
    res.send(content);
  });
});

// Anything left is for picking up client-side path routing (liking when refreshing / providing a complete url)
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', './index.html'));
});

io.on('connection', function(socket) {
  socket.on('i am client', (d) => {console.log('received i am client from client !')});
});


server.listen(5000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:5000/");