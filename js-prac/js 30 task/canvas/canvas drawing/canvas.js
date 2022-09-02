var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
// c.fillRect(x, y, width, height);
c.fillStyle = "rgba(255, 0, 0, 0.1)";   // add color to rect
c.fillRect(100, 100, 100, 100);
c.fillStyle = "rgba(255, 0, 0, 0.5)";
 c.fillRect(400, 100, 400, 100);
// c.fillRect(500, 500, 500, 100);
// c.fillRect(600, 250, 150, 100);
// c.fillRect(300, 350, 300, 100);
console.log(canvas);

//line
c.beginPath();
// c.moveTo(x, y)
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
//add color to line
c.strokeStyle = "#f60";
c.stroke(); // to show

// arc/circle
// c.beginPath();
// c.arc(500, 500, 50, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// multiple cirlce using for loop
for(var i = 0; i < 100; i ++){
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
c.beginPath();
c.arc(x, y, 50, 0, Math.PI * 2, false);
var color = Math.floor(Math.random()*16777215)
c.strokeStyle = `#${color}`;
console.log(c.strokeStyle);
c.stroke();
}