

// Function to create and draw on a canvas
function drawDotsWithLetters() {
  const canvas = document.createElement("canvas");
  canvas.id = "dotsCanvas";
  document.body.appendChild(canvas);
  // Set the title of the document
  //document.title = "Dots with Letters";
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const letters = "ABCDEFGHIJ".split("");
    const radius = 10;
    const offsets = letters.map(() => ({ x: 0, y: 0 }));
    const pings: { x: number; y: number; radius: number }[] = [];
    const initialPositions = letters.map((_, index) => {
      const angle = (index / letters.length) * (2 * Math.PI);
      return {
        xPercent: 0.5 + Math.cos(angle) * 0.1,
        yPercent: 0.5 + Math.sin(angle) * 0.1,
      };
    });

    let draggingIndex: number | null = null;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      letters.forEach((letter, index) => {
        const x =
          initialPositions[index].xPercent * canvas.width + offsets[index].x;
        const y =
          initialPositions[index].yPercent * canvas.height + offsets[index].y;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true); // Draw a circle
        ctx.fillStyle = "blue"; // Set fill color to blue
        ctx.fill();

        ctx.fillStyle = "white"; // Set fill color to white for the letter
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(letter, x, y);

        // Update offsets for movement if not dragging
        if (draggingIndex !== index) {
          offsets[index].x += (Math.random() - 0.5) * 4; // Increase random movement
          offsets[index].y += (Math.random() - 0.5) * 4; // Increase random movement
        }
      });

      // Draw pings
      pings.forEach((ping, pingIndex) => {
        ctx.beginPath();
        ctx.arc(ping.x, ping.y, ping.radius, 0, Math.PI * 2, true);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke();
        ping.radius += 1; // Increase the radius to create the ping effect

        // Remove the ping if it gets too large
        if (ping.radius > 20) {
          pings.splice(pingIndex, 1);
        }
      });

      // Draw the modification time in the upper left corner
      ctx.fillStyle = "black";
      ctx.font = "14px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`Last Modified: ${lastModified}`, 10, 10);

      requestAnimationFrame(draw);
    };

    // Get the last modification time of the current script
    const scriptElement = document.currentScript as HTMLScriptElement;
    const lastModified = new Date(document.lastModified).toLocaleString();

    // Temporarily print the last modification time to the console for testing purposes
    console.log(`Last Modified: ${lastModified}`);

    // Initial setup
    resizeCanvas();
    draw();

    // Redraw on window resize
    window.addEventListener("resize", () => {
      resizeCanvas();
      draw();
    });

    // Add click event listener to create pings and move dots
    canvas.addEventListener("click", (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pings.push({ x, y, radius: 0 });

      // Move dots towards the click location
      letters.forEach((_, index) => {
        const dotX =
          initialPositions[index].xPercent * canvas.width + offsets[index].x;
        const dotY =
          initialPositions[index].yPercent * canvas.height + offsets[index].y;
        const dx = (x - dotX) * 0.2; // Increase the multiplier to control movement speed
        const dy = (y - dotY) * 0.2;
        offsets[index].x += dx;
        offsets[index].y += dy;
      });
    });

    // Add mouse event listeners for dragging
    canvas.addEventListener("mousedown", (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      letters.forEach((_, index) => {
        const dotX =
          initialPositions[index].xPercent * canvas.width + offsets[index].x;
        const dotY =
          initialPositions[index].yPercent * canvas.height + offsets[index].y;
        const distance = Math.sqrt((x - dotX) ** 2 + (y - dotY) ** 2);

        if (distance < radius) {
          draggingIndex = index;
        }
      });
    });

    canvas.addEventListener("mousemove", (event: MouseEvent) => {
      if (draggingIndex !== null) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        offsets[draggingIndex].x =
          x - initialPositions[draggingIndex].xPercent * canvas.width;
        offsets[draggingIndex].y =
          y - initialPositions[draggingIndex].yPercent * canvas.height;
      }
    });

    canvas.addEventListener("mouseup", () => {
      draggingIndex = null;
    });

    canvas.addEventListener("mouseleave", () => {
      draggingIndex = null;
    });
  }
}

// Call the function to draw the dots with letters
drawDotsWithLetters();
