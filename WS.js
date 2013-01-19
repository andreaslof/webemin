var WS = {
  connected: false,
  websocket: null,
  onmessage: null,
  connect: function(callback) {
    WS.websocket = new WebSocket('ws://echo.websocket.org');
    WS.websocket.onopen = function() {
      WS.connected = true;
      if (callback)
        callback();
    };
    WS.websocket.onclose = function() {
      if (WS.connected) {
        console.log('Connection hung up');
        WS.connected = false;
      } else {
        console.log('Cannot connect');
      }
    };
    WS.websocket.onerror = function(err) {
      console.log('Error');
      console.log(err);
    };
    WS.websocket.onmessage = WS._onmessage;
  },
  send: function(msg) {
    if (WS.connected)
      WS.websocket.send(msg);
  },
  _onmessage: function(e) {
    if (WS.onmessage)
      WS.onmessage(e);
  }
};