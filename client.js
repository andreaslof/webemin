"use strict";

var client = {
  socket: null,
  role: null,
  gotValues: null,
  ready: null,
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
    if (client.gotValues)
      client.gotValues(data);
  },
  getRole: function (data) {
    client.role = data.role;
    if (client.ready)
      client.ready();
  },
  send: function (data) {
    client.socket.send(data);
  }
};