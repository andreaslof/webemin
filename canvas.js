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
  },
  bend: function(freq){
    var _ = canvas,
        margin = 20;
    _.ctx.clearRect(0,0, _.width, _.height);
    
    _.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    _.ctx.beginPath();
    _.ctx.lineWidth = 10;
    _.ctx.moveTo(margin, 100);
    _.ctx.lineTo(_.width - (margin*2), 100);
    _.ctx.stroke();

    _.ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    _.ctx.beginPath();
    _.ctx.lineWidth = 2;
    _.ctx.moveTo(margin, 100);
    _.ctx.bezierCurveTo(100, // from left
                        100,
                        (_.width - (margin*2)) / 2, // total width / 2
                        freq + 100, // depth
                        _.width - (margin*2), // total width
                        100); // from top
    _.ctx.stroke();
  }
};