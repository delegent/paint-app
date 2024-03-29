var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth / 1.5;
canvas.height = window.innerHeight / 1.5;
var bound = canvas.getBoundingClientRect();
var c = canvas.getContext('2d');

var xlim = canvas.width;
var ylim = canvas.height;
var color = document.getElementById('color');
var radius = document.getElementById('radius');

var mouse = {
	x:0,
	y:0,down:false
};
var stroke = [];

function draw() {
	c.beginPath();
	c.fillStyle = color.value;
	c.arc(mouse.x,mouse.y,Math.abs(Number(radius.value)), 0,Math.PI*2,false);
	c.fill();
	c.closePath();
}

function erase() {
	color.value = '#ffffff';
}

function eraseWhole() {
	c.clearRect(0, 0,xlim,ylim);
}

addEventListener('mousemove',(e) => {
	mouse.x = e.clientX - bound.left;
	mouse.y = e.clientY - bound.top;
    if(mouse.down){
		stroke.push({
			x:mouse.x,
			y:mouse.y
		}) 
		draw();
	}
	
  })

addEventListener('mousedown', (e) => {
	mouse.down = true;
})
addEventListener('mouseup', (e) => {
	mouse.down = false;
	for(let i = 0 ; i < stroke.length - 1;i++){
		c.beginPath();
		c.strokeStyle = color.value;
		c.lineWidth = Number(redius.value) * 2;
		c.moveTo(stroke[i].x, stroke[i].y);
		c.lineTo(stroke[i + 1].x, stroke[i + 1].y);
		c.stroke();
		c.closePath();
	}
	stroke = [];
})
// save button
var saveButton = document.getElementById('save');
saveButton.addEventListener('click', function() {
    var imageName = prompt('Please enter image name');
    var canvasDataURL = canvas.toDataURL();
    var a = document.createElement('a');
    a.href = canvasDataURL;
    a.download = imageName || 'drawing';
    a.click();
  });

