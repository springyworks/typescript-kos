document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Create and append canvas element
  const canvas = document.createElement("canvas");
  body.appendChild(canvas);

  const context = canvas.getContext("2d");

  const drawCircle = () => {
    if (context) {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Get the smaller dimension to make the circle fit within the window
      const size = Math.min(window.innerWidth, window.innerHeight);

      // Set canvas size
      canvas.width = size;
      canvas.height = size;

      // Draw the circle
      context.beginPath();
      context.arc(size / 2, size / 2, size / 2 - 10, 0, Math.PI * 2);
      context.fillStyle = "black";
      context.fill();
      context.stroke();
    }
  };

  const animateText = (finalSize: number, duration: number) => {
    const startTime = performance.now();
    const initialSize = 5; // Starting font size

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentSize = initialSize + (finalSize - initialSize) * progress;

      // Clear the canvas and redraw the circle
      drawCircle();

      // Draw the text with the current size
      if (context) {
        context.font = `${currentSize}px Arial`;
        context.fillStyle = "black";
        context.fillText("A circle 248", 10, 30);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  // Initial draw
  drawCircle();
  animateText(20, 1000); // Animate to 20px font size over 1 second

  // Redraw on window resize
  window.addEventListener("resize", () => {
    drawCircle();
    animateText(20, 1000); // Re-animate text on resize
  });
});