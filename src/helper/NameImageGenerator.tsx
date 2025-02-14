import  { useRef, useEffect } from "react";

const GenerateInitialsImage = ({ firstname, lastname }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas exists

    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to 30x30
    canvas.width = 40;
    canvas.height = 40;

    // Background color
    ctx.fillStyle = "#4CAF50"; // Green background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text style
    ctx.font = "15px Arial"; // Adjust font size for small canvas
    ctx.fillStyle = "#FFF"; // White text
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Get initials
    const initials =
      (firstname?.charAt(0) || "").toUpperCase() +
      (lastname?.charAt(0) || "").toUpperCase();

    // Draw initials in the center of the canvas
    ctx.fillText(initials, canvas.width / 2, canvas.height / 2);
  }, [firstname, lastname]);

  return <canvas ref={canvasRef} style={{ borderRadius: "50%" }} />;
};

export default GenerateInitialsImage;
