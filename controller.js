$(window).ready(function(){
  $('a.connect-host, a.connect-ctrl').click(function(e){
    e.preventDefault();
    client.init('http://10.48.18.64');
    if ($(this)[0] === $('a.connect-host')[0])
      client.connectHost();
    else
      client.connectController();
    client.ready = function(){
      if (client.role === 'controller') {
        Gyro.startTracking();
        Gyro.callback = function(xyz){
          client.send(JSON.stringify(xyz));
        };
      }
      if (client.role === 'host') {
        webemin.init();
        webemin.start();
        webemin.setVolume(1);
        client.gotValues = function(data) {
          data = JSON.parse(data);
          webemin.setFrequency((data.y * 10) + 200);
          console.log(data);
        };
      }
    };
  });
});