/* webemin - a gyro-controlled theremin
 * © 2013 Andreas Hermansson, a@andreaslof.se
 * © 2013 Simon Westerlund, s@simonwesterlund.se
 * */

var webemin = {
  frequency: 440, // 440hz = A3
  type: 0, // sine
  isPlaying: false,
  _context: null,
  _oscillator: null,
  _gainNode: null,
  _delayNode: null,
  _delayGainNode: null,
  _init: false,
  _threshold: 0,
  _last: 0,
  init: function() {
    // create new context
    webemin._context = new webkitAudioContext();
    // create new oscillator
    webemin._oscillator = webemin._context.createOscillator();
    // create new gain node
    webemin._gainNode = webemin._context.createGainNode();
    webemin._delayGainNode = webemin._context.createGainNode();
    // create a delay node
    webemin._delayNode = webemin._context.createDelayNode();
    // connect it to the gain node
    webemin._delayNode.connect(webemin._delayGainNode);
    webemin._delayNode.delayTime.value = 0.18;
    // connect the oscillator to the gain node
    webemin._oscillator.connect(webemin._delayNode);
    webemin._oscillator.connect(webemin._gainNode);
    // set the default frequency to oscillator
    webemin._oscillator.frequency.value = webemin.frequency;
    // set the default type to sine
    // available types: 0: sine, 1: square, 2: saw, 3: triangle
    webemin._oscillator.type = 0;
    // connect the gain node with the context
    webemin._gainNode.connect(webemin._context.destination);
    webemin._delayGainNode.connect(webemin._context.destination);
    // set volume to 0
    webemin._gainNode.gain.value = 0; // 0 volume
    webemin._delayGainNode.gain.value = 0;
    webemin._init = true;
  },
  start: function () {
    if (!webemin._init) {
      webemin.init();
    }
    if (!webemin.isPlaying) {
      webemin._oscillator.start(0);
      webemin.isPlaying = true;
    }
  },
  stop: function () {
    if (webemin.isPlaying) {
      webemin.isPlaying = false;
    }
    webemin._gainNode.gain.value = 0;
  },
  setFrequency: function(freq) {
      webemin.frequency = freq;
      webemin._oscillator.frequency.value = freq;
  },
  detune: function (freq) {
    webemin.tuning = freq;
    webemin._oscillator.detune.value = webemin.tuning;
  },
  setType: function (type) {
    webemin._oscillator.type = type;
  },
  setVolume: function (vol) {
    if (vol === 1)
      vol -= 0.15;
    webemin._gainNode.gain.value = vol;
  }
};