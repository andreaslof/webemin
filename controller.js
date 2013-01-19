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
        webemin.setVolume(0);
        client.gotValues = function(data) {
          data = JSON.parse(data);
          
          var vol = (Math.abs(data.z) / 180) * -1;
          if (vol > 1)
            vol = Math.ceil(vol);

          var detune = parseInt((data.y + data.z), 10);
          console.log(detune);

          webemin.setFrequency((data.y * 10) + 200);
          webemin.setVolume(vol);
          webemin.detune(detune);
        };
      }
    };
  });
});