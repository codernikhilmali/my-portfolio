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


const StarfieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w: number, h: number;
    let animationFrameId: number;
    const stars: Star[] = [];
    const numStars = 400;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      
      // Move origin to center
      ctx.translate(w / 2, h / 2);
    };

    class Star {
      x: number;
      y: number;
      z: number;
      pz: number;

      constructor() {
        this.x = (Math.random() - 0.5) * w;
        this.y = (Math.random() - 0.5) * h;
        this.z = Math.random() * w;
        this.pz = this.z;
      }

      update(speed: number) {
        this.z -= speed;
        if (this.z < 1) {
          this.z = w;
          this.x = (Math.random() - 0.5) * w;
          this.y = (Math.random() - 0.5) * h;
          this.pz = this.z;
        }
      }

      draw() {
        const sx = (this.x / this.z) * w;
        const sy = (this.y / this.z) * h;
        
        const px = (this.x / this.pz) * w;
        const py = (this.y / this.pz) * h;

        this.pz = this.z;

        ctx!.beginPath();
        ctx!.moveTo(px, py);
        ctx!.lineTo(sx, sy);
        
        // Intensity based on distance
        const intensity = (1 - this.z / w);
        ctx!.strokeStyle = `rgba(${getThemeColor().r}, ${getThemeColor().g}, ${getThemeColor().b}, ${intensity})`;
        ctx!.lineWidth = intensity * 2;
        ctx!.stroke();
      }
    }

    const init = () => {
      resize();
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }
    };

    const draw = () => {
      // Create a slight trail effect by drawing a semi-transparent dark rect
      ctx.fillStyle = "rgba(2, 6, 16, 0.2)";
      ctx.fillRect(-w/2, -h/2, w, h);
      
      const speed = 4; // warp speed
      
      for (let star of stars) {
        star.update(speed);
        star.draw();
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform before resize
      resize();
    });
    
    init();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[0] opacity-80 mix-blend-screen"
    />
  );
};

export default StarfieldBackground;
