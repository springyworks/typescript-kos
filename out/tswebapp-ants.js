"use strict";
// Function to create and draw on a canvas
function drawDotsWithLetters() {
    var canvas = document.createElement("canvas");
    canvas.id = "dotsCanvas";
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    if (ctx) {
        var letters_1 = "ABCDEFGHIJ".split("");
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
        var draggingIndex_1 = null;
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
                ctx.fillStyle = "blue"; // Set fill color to blue
                ctx.fill();
                ctx.fillStyle = "white"; // Set fill color to white for the letter
                ctx.font = "12px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(letter, x, y);
                // Update offsets for movement if not dragging
                if (draggingIndex_1 !== index) {
                    offsets_1[index].x += (Math.random() - 0.5) * 4; // Increase random movement
                    offsets_1[index].y += (Math.random() - 0.5) * 4; // Increase random movement
                }
            });
            // Draw pings
            pings_1.forEach(function (ping, pingIndex) {
                ctx.beginPath();
                ctx.arc(ping.x, ping.y, ping.radius, 0, Math.PI * 2, true);
                ctx.strokeStyle = "red";
                ctx.lineWidth = 2;
                ctx.stroke();
                ping.radius += 1; // Increase the radius to create the ping effect
                // Remove the ping if it gets too large
                if (ping.radius > 20) {
                    pings_1.splice(pingIndex, 1);
                }
            });
            // Draw the modification time in the upper left corner
            ctx.fillStyle = "black";
            ctx.font = "14px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("Last Modified: ".concat(lastModified_1), 10, 10);
            requestAnimationFrame(draw_1);
        };
        // Get the last modification time of the current script
        var scriptElement = document.currentScript;
        var lastModified_1 = new Date(document.lastModified).toLocaleString();
        // Temporarily print the last modification time to the console for testing purposes
        console.log("Last Modified: ".concat(lastModified_1));
        // Initial setup
        resizeCanvas_1();
        draw_1();
        // Redraw on window resize
        window.addEventListener("resize", function () {
            resizeCanvas_1();
            draw_1();
        });
        // Add click event listener to create pings and move dots
        canvas.addEventListener("click", function (event) {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            pings_1.push({ x: x, y: y, radius: 0 });
            // Move dots towards the click location
            letters_1.forEach(function (_, index) {
                var dotX = initialPositions_1[index].xPercent * canvas.width + offsets_1[index].x;
                var dotY = initialPositions_1[index].yPercent * canvas.height + offsets_1[index].y;
                var dx = (x - dotX) * 0.2; // Increase the multiplier to control movement speed
                var dy = (y - dotY) * 0.2;
                offsets_1[index].x += dx;
                offsets_1[index].y += dy;
            });
        });
        // Add mouse event listeners for dragging
        canvas.addEventListener("mousedown", function (event) {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            letters_1.forEach(function (_, index) {
                var dotX = initialPositions_1[index].xPercent * canvas.width + offsets_1[index].x;
                var dotY = initialPositions_1[index].yPercent * canvas.height + offsets_1[index].y;
                var distance = Math.sqrt(Math.pow((x - dotX), 2) + Math.pow((y - dotY), 2));
                if (distance < radius_1) {
                    draggingIndex_1 = index;
                }
            });
        });
        canvas.addEventListener("mousemove", function (event) {
            if (draggingIndex_1 !== null) {
                var rect = canvas.getBoundingClientRect();
                var x = event.clientX - rect.left;
                var y = event.clientY - rect.top;
                offsets_1[draggingIndex_1].x =
                    x - initialPositions_1[draggingIndex_1].xPercent * canvas.width;
                offsets_1[draggingIndex_1].y =
                    y - initialPositions_1[draggingIndex_1].yPercent * canvas.height;
            }
        });
        canvas.addEventListener("mouseup", function () {
            draggingIndex_1 = null;
        });
        canvas.addEventListener("mouseleave", function () {
            draggingIndex_1 = null;
        });
    }
}
// Call the function to draw the dots with letters
drawDotsWithLetters();
