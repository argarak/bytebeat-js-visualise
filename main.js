let tf = function(t) {
  return 0;
};

let tf2 = function(t) {
  return (t & (t / 200)) ^ (((t | 800) / 2) % 128);
};

let tf3 = function(t) {
  return 0;
};

let mt = 0;
let fr1 = 0;
let fr2 = 0;

document.addEventListener(
  "DOMContentLoaded",
  function() {
    document.getElementById("updatebtn").addEventListener("click", function(e) {
      let redf = document.getElementById("redfin").value;
      let greenf = document.getElementById("greenfin").value;
      let bluef = document.getElementById("bluefin").value;

      console.log(redf, greenf, bluef);

      tf = Function("t", "return " + redf + ";");
      tf2 = Function("t", "return " + greenf + ";");
      tf3 = Function("t", "return " + bluef + ";");
    });

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
        imgdata.data[4 * (mt % (imgdatalen / 4))] = Math.round(tf(mt) % 256);
        imgdata.data[4 * (mt % (imgdatalen / 4)) + 1] = Math.round(
          tf2(mt) % 256
        );
        imgdata.data[4 * (mt % (imgdatalen / 4)) + 2] = Math.round(
          tf3(mt) % 256
        );

        //imgdata.data[4 * (mt % (imgdatalen / 4)) + 2] = 255;

        imgdata.data[4 * (mt % (imgdatalen / 4)) + 3] = 255;

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
