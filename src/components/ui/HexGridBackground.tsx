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


const HexGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w: number, h: number;
    let animationFrameId: number;
    const hexRadius = 40;
    const hexHeight = hexRadius * Math.sqrt(3);
    const hexWidth = hexRadius * 2;
    let offset = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const drawHexagon = (x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + r * Math.cos(angle);
        const hy = y + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      const cols = Math.ceil(w / (hexWidth * 0.75)) + 2;
      const rows = Math.ceil(h / hexHeight) + 2;
      
      offset += 0.5; // animation speed
      if (offset > hexHeight * 2) offset = 0;

      ctx.lineWidth = 1.5;
      
      for (let q = -1; q < cols; q++) {
        for (let r = -2; r < rows; r++) {
          const x = q * hexWidth * 0.75;
          // stagger rows
          let y = r * hexHeight + (q % 2 !== 0 ? hexHeight / 2 : 0);
          
          // Apply sliding offset
          y += offset;
          
          // Wrap around vertical bounds
          if (y > h + hexHeight) {
            y -= (rows + 1) * hexHeight;
          }

          drawHexagon(x, y, hexRadius - 2);
          
          // Glow effect mapped to coordinates and time
          const dist = Math.sqrt((x - w/2)**2 + ((y - offset) - h/2)**2);
          const maxDist = Math.max(w, h);
          const alpha = Math.max(0.02, 0.15 - (dist / maxDist) * 0.15 + Math.sin((x+y+offset*2)/100)*0.05);
          
          ctx.strokeStyle = `rgba(${getThemeColor().r}, ${getThemeColor().g}, ${getThemeColor().b}, ${alpha})`;
          ctx.stroke();
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[0] mix-blend-screen opacity-50"
    />
  );
};

export default HexGridBackground;
