"use strict";

var client = {
  socket: null,
  role: null,
  init: function (url) {
    client.socket = io.connect(url);
    client.socket.on('connect', client.handleResponse);
    client.socket.on('message', client.handleResponse);
    client.socket.on('setRole', client.getRole);
  },
  connectHost: function () {
    client.socket.emit('setRole', { role: 'host' });
  },
  connectController: function () {
    client.socket.emit('setRole', { role: 'controller' });
  },
  handleResponse: function (data) {
    console.log(data);
  },
  getRole: function (data) {
    client.role = data.role;
  },
  send: function (data) {
    client.socket.send(data);
  }
}

client.init('http://10.48.19.129');