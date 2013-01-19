"use strict";

var client = {
  socket: null,
  init: function (url) {
    client.socket = io.connect(url);
    client.socket.on('response', client.handleResponse);
  },
  connectHost: function () {
    client.socket.emit('host', { host: 'connecting' });
  },
  connectController: function () {
    client.socket.emit('controller', { controller: 'connecting' });
  },
  handleResponse: function (data) {
    console.log(data);
  },
  send: function (data) {

  }
}