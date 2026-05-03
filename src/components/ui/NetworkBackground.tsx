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


const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Config
    const maxParticles = 60;
    const maxDistance = 150;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${getThemeColor().r}, ${getThemeColor().g}, ${getThemeColor().b}, 0.4)`;
        ctx!.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = window.innerWidth < 768 ? 30 : maxParticles;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${getThemeColor().r}, ${getThemeColor().g}, ${getThemeColor().b}, ${0.15 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(drawNetwork);
    };

    window.addEventListener("resize", resize);
    resize();
    drawNetwork();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[0] mix-blend-screen opacity-70"
    />
  );
};

export default NetworkBackground;
