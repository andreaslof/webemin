/* webemin - a gyro-controlled theremin
 * © 2013 Andreas Hermansson, a@andreaslof.se
 * */

 (function (windonw, undefined) {
  const LOWEST_FREQ   = 120,
        HIGHEST_FREQ  = 1000,
        SINE          = 0,
        SQUARE        = 1,
        SAW           = 2,
        TRIANGLE      = 3;

  var context     = new webkitAudioContext(),
      oscillator  = context.createOscillator(),
      gainNode        = context.createGainNode(),
      controls    = document.getElementsByTagName('a');

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  gainNode.gain.value = 0;

  for (var c in controls) {
    if (typeof controls[c] !== 'object')
      return;
    controls[c].addEventListener('click', toggleAudio);
  }

  function toggleAudio (e) {
    e.preventDefault();
    
    switch (e.target.getAttribute('data-ctrl')) {
      case 'play':
        if (oscillator.playbackState === 0)
          oscillator.start(0);
        gainNode.gain.value = 1;
        break;
      case 'stop':
        gainNode.gain.value = 0;
        break;
    }
  }
 })(window);
