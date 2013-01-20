var canvas = {
  cnv: null,
  ctx: null,
  colors: undefined,
  width: '',
  height: '',
  init: function () {
    var _ = canvas;
    _.cnv = $('#cnv')[0];
    _.width = $(window).width();
    _.height = $(window).height();
    _.cnv.width = _.width;
    _.cnv.height = _.height;

    _.ctx = _.cnv.getContext('2d');
    _.ctx.globalCompositeOperation = "xor";
    _.ctx.font = "bold 100px sans-serif";
    _.drawNote('webemin');
    _.drawNote('(sort of a theremin)', undefined, 0, 150);
  },
  drawBackground: function (alpha, colors) {
    var _ = canvas,
        fillStyle;
    alpha = alpha || 1;
    colors = colors || _.colors;
    _.colors = colors;

    fillStyle = 'rgba(' + colors.join(',') + ',' + alpha + ')';

    _.ctx.clearRect(0,0, _.width, _.height);
    _.ctx.fillStyle = fillStyle;
    _.ctx.fillRect(0, 0, _.width, _.height);
  },
  drawNote: function (note, colors, x, y) {
    var _ = canvas,
        colors = colors || [0,0,0],
        x = x || 0,
        y = y || 50;
    
    _.ctx.fillStyle = 'rgb(' + colors.join(',') + ')';
    _.ctx.textAlign = 'left';
    _.ctx.textBaseline = 'top';
    _.ctx.fillText(note, x, y);
  }

}