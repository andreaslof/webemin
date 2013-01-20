var canvas = {
  cnv: null,
  ctx: null,
  colors: undefined,
  width: $(document).width(),
  height: $(document).height(),
  init: function () {
    var _ = canvas;
    _.cnv = $('#cnv')[0];
    _.cnv.width = _.width;
    _.cnv.height = _.height;

    _.ctx = _.cnv.getContext('2d');
    _.drawBackground(null, [32,134,119]);
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
  }
}