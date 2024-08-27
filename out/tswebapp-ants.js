"use strict";
// Function to create and draw on a canvas
function drawDotsWithLetters() {
    var canvas = document.createElement('canvas');
    canvas.id = 'dotsCanvas';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    if (ctx) {
        var letters_1 = 'ABCDEFGHIJ'.split('');
        var radius_1 = 10;
        var offsets_1 = letters_1.map(function () { return ({ x: 0, y: 0 }); });
        var pings_1 = [];
        var initialPositions_1 = letters_1.map(function (_, index) {
            var angle = (index / letters_1.length) * (2 * Math.PI);
            return {
                xPercent: 0.5 + Math.cos(angle) * 0.1,
                yPercent: 0.5 + Math.sin(angle) * 0.1,
            };
        });
        var resizeCanvas_1 = function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        var draw_1 = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            letters_1.forEach(function (letter, index) {
                var x = initialPositions_1[index].xPercent * canvas.width + offsets_1[index].x;
                var y = initialPositions_1[index].yPercent * canvas.height + offsets_1[index].y;
                ctx.beginPath();
                ctx.arc(x, y, radius_1, 0, Math.PI * 2, true); // Draw a circle
                ctx.fillStyle = 'blue'; // Set fill color to blue
                ctx.fill();
                ctx.fillStyle = 'white'; // Set fill color to white for the letter
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(letter, x, y);
                // Update offsets for movement
                offsets_1[index].x += (Math.random() - 0.5) * 2;
                offsets_1[index].y += (Math.random() - 0.5) * 2;
            });
            // Draw pings
            pings_1.forEach(function (ping, pingIndex) {
                ctx.beginPath();
                ctx.arc(ping.x, ping.y, ping.radius, 0, Math.PI * 2, true);
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.stroke();
                ping.radius += 1; // Increase the radius to create the ping effect
                // Remove the ping if it gets too large
                if (ping.radius > 20) {
                    pings_1.splice(pingIndex, 1);
                }
            });
            requestAnimationFrame(draw_1);
        };
        // Initial setup
        resizeCanvas_1();
        draw_1();
        // Redraw on window resize
        window.addEventListener('resize', function () {
            resizeCanvas_1();
            draw_1();
        });
        // Add click event listener to create pings
        canvas.addEventListener('click', function (event) {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            pings_1.push({ x: x, y: y, radius: 0 });
        });
    }
}
// Call the function to draw the dots with letters
drawDotsWithLetters();
