let mt = 0;
let fr1 = 0;
let fr2 = 0;

document.addEventListener(
  "DOMContentLoaded",
  function() {
    var fpsbox = document.getElementById("fps");

    let drawfps = function() {
      fr1 = performance.now();
      draw();
      fr2 = performance.now();
      fpsbox.innerHTML = "" + 1000 / (fr2 - fr1);
    };

    var draw = function() {
      let ctx = window.ctx;

      //var imgdata = ctx.getImageData(0, 0, 640, 480);
      var imgdata = ctx.createImageData(640, 480);
      var imgdatalen = imgdata.data.length;

      for (var i = 0; i < imgdatalen / 4; i++) {
        imgdata.data[4 * (mt % (imgdatalen / 4))] = (red(mt) % 256) | 0;
        imgdata.data[4 * (mt % (imgdatalen / 4)) + 1] = (green(mt) % 256) | 0;
        imgdata.data[4 * (mt % (imgdatalen / 4)) + 2] = (blue(mt) % 256) | 0;
        imgdata.data[4 * (mt % (imgdatalen / 4)) + 3] = (alpha(mt) % 256) | 0;

        mt += 1;
      }

      ctx.putImageData(imgdata, 0, 0);

      window.requestAnimationFrame(drawfps);
    };

    let canvas = document.getElementById("vis");

    if (canvas.getContext) {
      window.ctx = canvas.getContext("2d");
    }

    window.requestAnimationFrame(drawfps);
  },
  false
);
