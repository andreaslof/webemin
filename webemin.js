var webemin = {
  frequency: 440, // default
  type: 0, // sine
  isPlaying: false,
  _context: null,
  _ocsillator: null,
  _gainNode: null,
  _init: false,
  init: function() {
    // create new context
    webemin._context = new webkitAudioContext();
    // create new ocsillator
    webemin._ocsillator = webemin._context.createOscillator();
    // create new gain node
    // which is the volume controller (i think)
    webemin._gainNode = webemin._context.createGainNode();
    // connect the ocsillator to the gain node
    webemin._ocsillator.connect(webemin._gainNode);
    // set the default frequency to ocsillator
    // in this case it is 440
    webemin._ocsillator.frequency.value = webemin.frequency;
    // set the default type to sine
    // available types: 0: sine, 1: square, 2: saw, 3: triangle
    webemin._ocsillator.type = 0;
    // connect the gain node with the context
    webemin._gainNode.connect(webemin._context.destination);
    // set volume to 0
    webemin._gainNode.gain.value = 0; // 0 volume
    webemin._init = true;
  },
  start: function() {
    if (!webemin._init) {
      webemin.init();
    }
    if (!webemin.isPlaying) {
      webemin._ocsillator.noteOn(0);
      webemin.isPlaying = true;
    }
  },
  stop: function() {
    if (webemin.isPlaying) {
      webemin.isPlaying = false;
    }
    webemin._gainNode.gain.value = 0;
  },
  setFrequency: function(freq) {
    webemin.frequency = freq;
    webemin._ocsillator.frequency.value = freq;
  },
  setType: function(type) {
    webemin._ocsillator.type = type;
  },
  setVolume: function(vol) {
    webemin._gainNode.gain.value = vol;
  }
};