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
    _.ctx.font = "bold 240px sans-serif";
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
  drawNote: function (note, colors) {
    var _ = canvas,
        colors = colors || [0,0,0];
        cw = (_.cnv.width - 240) / 2,
        ch = (_.cnv.height - 240) / 2;
    
    _.ctx.fillStyle = 'rgb(' + colors.join(',') + ')';
    _.ctx.textAlign = 'left';
    _.ctx.textBaseline = 'top';
    _.ctx.fillText(note, 0, 50);
  }

}