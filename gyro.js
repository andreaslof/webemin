var Gyro = {
  xyz:  {},
  _xyz: {}, // raw
  _zero: {
    x: 0,
    y: 0,
    z: 0
  },
  callback: null,
  startTracking: function() {
     window.addEventListener('deviceorientation', Gyro._update, false);
  },
  stopTracking: function() {
    window.removeEventListener('deviceorientation', Gyro._update, false);
  },
  reset: function() {
    Gyro._zero = Gyro._xyz;
  },
  _update: function(e) {
    Gyro._xyz = {
      x: e.alpha,
      y: e.beta,
      z: e.gamma
    };
    Gyro.xyz = {
      x: Gyro._xyz.x - Gyro._zero.x,
      y: Gyro._xyz.y - Gyro._zero.y,
      z: Gyro._xyz.z - Gyro._zero.z
    };
    if (Gyro.callback)
      Gyro.callback(Gyro.xyz);
  }
};