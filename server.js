"use strict";

var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    connections = 0;

app.listen(8082);

function handler (req, res) {  
  switch (req.url) {
    case '/client.js':
      fs.readFile(__dirname + '/client.js', returnFile);
      break;
    case '/webemin.js':
      fs.readFile(__dirname + '/webemin.js', returnFile);
      break;
    default:
      fs.readFile(__dirname + '/index.html', returnFile);
      break;
  }
  

  function returnFile(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading requested file');
    }

    res.writeHead(200);
    res.end(data);
  }
}


io.sockets.on('connection', function (socket) {
  socket.on('host', function (data) {
    console.log(data);
    socket.emit('response', { host: 'connected'});
  });
  socket.on('controller', function (data) {
    console.log(data);
    socket.emit('response', { controller: 'connected'});
  });
});
