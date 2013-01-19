var webemin = {
  options: {
    LOWEST_FREQ:  120,
    HIGHEST_FREQ: 1000
  },
  struct: {
    SINE:     0,
    SQUARE:   1,
    SAW:      2,
    TRIANGLE: 3
  },
  frequency: 440, // default
  type: 0, // sine
  isPlaying: false,
  _context: null,
  _ocsillator: null,
  _gainNode: null,
  _init: false,
  init: function() {
    webemin._context = new webkitAudioContext();
    webemin._ocsillator = webemin._context.createOscillator();
    webemin._gainNode = webemin._context.createGainNode();
    webemin._ocsillator.connect(webemin._gainNode);
    webemin._ocsillator.frequency.value = webemin.frequency;
    webemin._ocsillator.type = 0;
    webemin._gainNode.connect(webemin._context.destination);
    webemin._gainNode.gain.value = 0; // 0 volume
    webemin._init = true;
  },
  start: function() {
    if (!webemin._init) {
      webemin.init();
    }
    if (!webemin.isPlaying) {
      webemin._ocsillator.start(0);
      webemin.isPlaying = true;
    }
    webemin._gainNode.gain.value = 1;
  },
  stop: function() {
    if (webemin.isPlaying) {
      //webemin._ocsillator.stop(0);
      webemin.isPlaying = false;
    }
    webemin._gainNode.gain.value = 0;
  },
  setFrequency: function(freq) {
    webemin.frequency = freq;
    webemin._ocsillator.frequency.value = freq;
  }
};