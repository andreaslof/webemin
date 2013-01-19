WS.connect('ws://echo.websocket.org', function(){
  WS.send('hej :)');
});

WS.onmessage = function(msg){
  console.log(msg);
};