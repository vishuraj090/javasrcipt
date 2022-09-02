var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
// c.fillRect(x, y, width, height);
c.fillRect(100, 100, 100, 100);
c.fillRect(400, 100, 400, 100);
c.fillRect(500, 500, 500, 100);
c.fillRect(600, 250, 150, 100);
c.fillRect(300, 350, 300, 100);
console.log(canvas);