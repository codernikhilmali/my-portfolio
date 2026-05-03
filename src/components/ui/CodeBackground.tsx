import { useEffect, useRef } from "react";

const getThemeColor = () => {
  const theme = document.documentElement.getAttribute("data-theme") || "blue";
  const colors: Record<string, {r:number,g:number,b:number}> = {
    blue: { r: 59, g: 130, b: 246 },
    emerald: { r: 16, g: 185, b: 129 },
    purple: { r: 168, g: 85, b: 247 },
    rose: { r: 244, g: 63, b: 94 },
    amber: { r: 245, g: 158, b: 11 }
  };
  return colors[theme] || colors.blue;
};


const CodeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to match window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Java & Spring keywords
    const chars = [
      "public", "class", "void", "static", "private", "final", "return", "import",
      "@Autowired", "@RestController", "@GetMapping", "@Service", "SpringApplication",
      "{", "}", "()", ";", "String", "int", "List", "Stream", "extends", "implements",
      "null", "true", "false", "Exception", "try", "catch", "if", "else", "return"
    ];

    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    // Re-initialize drops if screen width changes significantly
    const reinitDrops = () => {
      const newColumns = Math.floor(canvas.width / fontSize);
      if (newColumns !== columns) {
        columns = newColumns;
        drops = Array(columns).fill(1);
      }
    };
    window.addEventListener("resize", reinitDrops);

    const draw = () => {
      // Semi-transparent black to create trailing effect
      ctx.fillStyle = "rgba(2, 6, 16, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Deep cyan/blue text for a premium dark-mode look
      ctx.fillStyle = `rgba(${getThemeColor().r}, ${getThemeColor().g}, ${getThemeColor().b}, 0.4)`; 
      ctx.font = `${fontSize}px "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Pick a random word/char
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Randomly make some characters brighter
        if (Math.random() > 0.95) {
          ctx.fillStyle = `rgba(${getThemeColor().r}, ${getThemeColor().g}, ${getThemeColor().b}, 0.8)`;
        } else {
          ctx.fillStyle = `rgba(${getThemeColor().r}, ${getThemeColor().g}, ${getThemeColor().b}, 0.25)`;
        }

        ctx.fillText(text, i * fontSize * 6, drops[i] * fontSize);

        // Reset drop randomly to create staggered falling effect
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += 1.5; // fall speed
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", reinitDrops);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[0] opacity-60 mix-blend-screen"
      style={{ filter: "blur(0.5px)" }}
    />
  );
};

export default CodeBackground;
