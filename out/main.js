"use strict";
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
function resizeCanvas() {
    canvas.width = window.innerWidth - 20; // Adjust width to avoid horizontal scrollbar
    canvas.height = window.innerHeight - 20; // Adjust height to avoid vertical scrollbar
}
//resizeCanvas();
window.addEventListener('resize', resizeCanvas);
var size = 50;
var speed = 2;
var square1 = {
    x: canvas.width / 4,
    y: canvas.height / 4,
    dx: speed,
    dy: speed,
    color: 'blue'
};
var square2 = {
    x: (canvas.width / 4) * 3,
    y: (canvas.height / 4) * 3,
    dx: -speed,
    dy: -speed,
    color: 'red'
};
function detectCollision(square1, square2) {
    return (square1.x < square2.x + size &&
        square1.x + size > square2.x &&
        square1.y < square2.y + size &&
        square1.y + size > square2.y);
}
function animate() {
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    [square1, square2].forEach(function (square) {
        if (ctx) {
            ctx.fillStyle = square.color;
            ctx.fillRect(square.x, square.y, size, size);
        }
        if (square.x + size > canvas.width || square.x < 0) {
            square.dx = -square.dx;
        }
        if (square.y + size > canvas.height || square.y < 0) {
            square.dy = -square.dy;
        }
        square.x += square.dx;
        square.y += square.dy;
    });
    if (detectCollision(square1, square2)) {
        square1.dx = -square1.dx;
        square1.dy = -square1.dy;
        square2.dx = -square2.dx;
        square2.dy = -square2.dy;
    }
    requestAnimationFrame(animate);
}
animate();
