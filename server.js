"use strict";

var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    connections = 0;

app.listen(8082, '10.48.18.64');

function handler (req, res) { 
  var html = false; 
  switch (req.url) {
    case '/gyro.js':
      fs.readFile(__dirname + '/gyro.js', returnFile);
      break;
      case '/controller.js':
        fs.readFile(__dirname + '/controller.js', returnFile);
        break;
    case '/client.js':
      fs.readFile(__dirname + '/client.js', returnFile);
      break;
    case '/webemin.js':
      fs.readFile(__dirname + '/webemin.js', returnFile);
      break;
    default:
      html = true;
      fs.readFile(__dirname + '/index.html', returnFile);
      break;
  }
  

  function returnFile(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading requested file');
    }

    res.writeHead(200);
    if (!html)
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(data);
  }
}

var c = 0;
io.sockets.on('connection', function (socket) {
  socket.emit('connect', { client: c });
  socket.on('message', function (msg) {
    switch (socket['role']) {
      case 'controller':
        sendTo('host', msg, socket);
        break;
      case 'host':
        sendTo('controller', msg, socket);
        break;
    }
  });

  socket.on('setRole', function (data) {
    if (typeof socket['role'] !== 'undefined')
      return;
    if (data.role === 'controller')
      socket.cid = io.sockets.clients().indexOf(socket);
    socket['role'] = data.role;
    socket.emit('setRole', { role: data.role });
  });
});

function sendTo (receiver, msg, sender) {
  var clients = io.sockets.clients();
  for (var client in clients) {
    if (clients[client]['role'] === receiver) {
      clients[client].send(JSON.stringify({id: sender.cid, msg: msg}));
    }
  }
}
