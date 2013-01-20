function getOctave(n) {
  return (Math.log(n) - Math.log(440)) / Math.log(2) + 4.0;
}

function whatNote(freq) {
  var lnote = getOctave(freq);
  var oct = Math.floor(lnote);
  var cents = 1200 * (lnote - oct);
  var offset = 50.0;
  var x = 2;
  var note = '';
  var notes = "A A#B C C#D D#E F F#G G#";

  if (cents < 50)
    note = 'A';
  else if (cents >= 1150) {
    note = 'A';
    cents -= 1200;
    oct++;
  } else {
    for (var i = 1; i <= 11; i++) {
      if (cents >= offset && cents < (offset + 100)) {
        note = notes.charAt(x) + notes.charAt(x + 1);
        cents -= (i * 100);
        break;
      }
      offset += 100;
      x += 2;
    }
  }
  return {note: note + oct, cents: cents};
}

$(window).ready(function(){
  canvas.init();
  
  $('input[type=range]').on('change', function (e) {
    var type = +e.target.value;

    if (webemin.isPlaying)
      webemin.setType(type);
  });

  $('a.connect-host, a.connect-ctrl').click(function(e){
    e.preventDefault();
    client.init('http://10.48.19.129');
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
        webemin.setVolume(0);

        var init = false;
        var freqView = $('.freq');
        client.gotValues = function(data) {
          if (!init) {
            webemin.setVolume(1);
            init = true;
          }

          if (webemin._delayGainNode.gain.value === 0)
            webemin._delayGainNode.gain.value = 0.15;

          try {
            data = JSON.parse(data);
            msg = JSON.parse(data.msg);
          } catch (e) {
            return;
          }
          
          var note = whatNote(webemin.frequency);
          var freq = (msg.y * 10) + (32.70 - 5.0);
          var vol = ((msg.z*2) / 90);

          if (Math.round(freq) < 20)
            return;

          if (vol < 0)
            vol = 0;
          if (vol > 1)
            vol = 1;

          var r = Math.round(msg.x),
              g = Math.round(msg.y),
              b = Math.round(msg.z);

          r = r > 255 ? 255 : r;
          r = r < 0 ? 0 : r;
          g = g > 255 ? 255 : g;
          g = g < 0 ? 0 : g;
          b = b > 255 ? 255 : b;
          b = b < 0 ? 0 : b;

          canvas.drawBackground(vol, [r, g, b]);
          canvas.drawNote(note.note);
          canvas.bend(note.cents * 4);

          webemin.setFrequency(freq);
          webemin.setVolume(vol);
        };
      }
    };
  });
});