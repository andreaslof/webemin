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
        $('.play, .stop').click(function(e){
          e.preventDefault();
          if ($(this)[0] === $('.stop')[0]) {
            webemin.setVolume(0);
            Gyro.stopTracking();
          } else {
            webemin.setVolume(1);
            Gyro.startTracking();
          }
        });
        webemin.init();
        webemin.start();
        var init = false;
        client.gotValues = function(data) {
          if (!init) {
            webemin.setVolume(1);
            init = true;
          }
          data = JSON.parse(data);
          msg = JSON.parse(data.msg);
          
          if (data.id == 1)
            webemin.setFrequency((msg.y * 10) + 200);
          if (data.id == 2) {
            var vol = ((msg.z*2) / 90);
            if (vol < 0)
              vol = 0;
            if (vol > 1)
              vol = 1;
            webemin.setVolume(vol);
          }
        };
      }
    };
  });
});