import { useEffect, useState, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [hovered, setHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, isScrolling: false });
  const ringPos = useRef({ x: 0, y: 0 });
  const scrollTimeout = useRef<any>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Update dot position immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      const el = e.target as HTMLElement;
      setHovered(!!(el.closest("button, a, input, textarea, [role='button']")));

      // Spawn particles on movement
      const speed = Math.sqrt(
        Math.pow(mouse.current.x - mouse.current.lastX, 2) + 
        Math.pow(mouse.current.y - mouse.current.lastY, 2)
      );

      if (speed > 2) {
        const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-500').trim() || '#3b82f6';
        const particleCount = mouse.current.isScrolling ? Math.min(speed / 2, 8) : Math.min(speed / 4, 3);
        for (let i = 0; i < particleCount; i++) {
          particles.current.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            life: 1.0,
            color: themeColor,
            size: Math.random() * (mouse.current.isScrolling ? 5 : 3) + 1
          });
        }
      }

      mouse.current.lastX = e.clientX;
      mouse.current.lastY = e.clientY;
    };

    const onScroll = () => {
      setIsScrolling(true);
      mouse.current.isScrolling = true;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        mouse.current.isScrolling = false;
      }, 200);
    };

    const onMouseDown = () => {
      setIsClicked(true);
      const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-500').trim() || '#3b82f6';
      // Big burst on click
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        particles.current.push({
          x: mouse.current.x,
          y: mouse.current.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1.0,
          color: themeColor,
          size: Math.random() * 5 + 2
        });
      }
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    let animationFrame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update ring position with lerp for smooth following
      const lerp = 0.15;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }

      // Particles logic
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= 0.015;
        
        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life * 0.4;
        ctx.fill();
      }
      
      animationFrame = requestAnimationFrame(render);
    };
    render();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", resize);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]"
      />
      
      {/* Small Dot Cursor */}
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] transition-transform duration-0"
        style={{ marginLeft: '-3px', marginTop: '-3px' }}
      />

      {/* Main Animated Ring */}
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-0"
        style={{ marginLeft: '-18px', marginTop: '-18px' }}
      >
        <div className={`
          w-9 h-9 border-2 rounded-full transition-all duration-300 ease-out
          ${hovered ? 'border-dashed border-[var(--theme-400)] bg-[var(--theme-500)]/10 rotate-90' : 'border-[var(--theme-500)]'}
          ${isScrolling ? 'scale-75 border-t-transparent border-l-transparent animate-spin' : ''}
          ${isClicked ? 'scale-50 bg-[var(--theme-400)] border-[var(--theme-600)]' : ''}
          flex items-center justify-center
        `}>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;





