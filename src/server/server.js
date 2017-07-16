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

var numOfPosts;
let postsDir = path.resolve('dist', 'posts');
fs.readdir(postsDir, (err, files) => {
  console.log("There are currently %d posts.", files.length);
  numOfPosts = files.length;
});

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

// In fonts folder ?
app.get('/fonts/*.css', (req, res) => {
  res.sendFile(path.resolve('dist', 'fonts', 'source-sans-pro.css')); // if you think hardcoding is bad, change it yourself
});

// return the brief information (titles, simple description, etc.)
app.get('/posts/brief', (req, res) => {
  let mdfile = path.resolve('dist', 'posts', 'post1.md');
  fs.readFile(mdfile, "utf8", (err, data) => {
    if (err) {
      console.log('Boom !');
      res.send('A fatal error occured...')
    } else {
      res.send(data);
    }
  });
});

// The left is for pickup client-side path routing (liking when refreshing / providing a complete url)
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', './index.html'));
});

io.on('connection', function(socket) {
  socket.on('i am client', (d) => {console.log('received i am client from client !')});
});


server.listen(5000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:5000/");