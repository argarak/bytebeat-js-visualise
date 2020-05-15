function sin(a) {
  return Math.sin(a);
}

function int(a) {
  return a | 0;
}

function random(a) {
  return Math.random(a);
}

function mono(t) {
  return (t << 5) | t;
}

function left(t) {
  return mono(t) / 2;
}

function right(t) {
  return mono(t) / 2;
}

/*
 * OPTIONAL GRAPHICS FUNCTIONS:::
 *
 * for the canvas-based bytebeat visualiser you are able to write a custom
 * bytebeat function to control each colour channel + alpha that doesn't
 * necessarily have to be based on the audio bytebeat functions
 */
function red(t) {
  return (t / 500000) << ((t / 5) & (t / 9600 * 2));
}

function green(t) {
  return (t / 1000000) << ((t / 5) & (t / 9600 * 2));
}

function blue(t) {
  return (t / 1000000) << ((t / 10) & (t / 9600));
}

function alpha(t) {
  return 255;
}
