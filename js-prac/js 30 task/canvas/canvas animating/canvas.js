var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = Math.random() - 0.5 * 8; //it would +ve or -ve (x axis, velocity)
var dy = Math.random() - 0.5 * 8; //it would +ve or -ve (y axis, velocity)
var radius = 30;
function animate(){
    requestAnimationFrame(animate);
// console.log('hy');
c.clearRect(0, 0, innerWidth, innerHeight); 
c.beginPath();

c.arc(x, y, radius, 0, Math.PI * 2, false);
c.strokeStyle = 'blue'
c.stroke();

// left to right
if (x + radius > innerWidth || x - radius < 0){
    dx = -dx;
}
if (y + radius > innerHeight || y - radius < 0){
    dy = -dy;
}

x += dx;
y += dy;
}
animate();