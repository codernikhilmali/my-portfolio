import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight } from "lucide-react";
import { Pyramid, Spring, Hexagon, Cube } from "../ui/Decorations";

/* ─── Count-Up Hook ──────────────────────────────────────── */
function useCountUp(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.1 });

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = Math.round((duration / 1000) * 60);
    const timer = setInterval(() => {
      frame++;
      setCount(Math.round((frame / totalFrames) * target));
      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ─── Hero ──────────────────────────────────────────────── */
const Hero = () => {
  const { count: expCount, ref: expRef } = useCountUp(2);
  const { count: projCount, ref: projRef } = useCountUp(20);
  const { count: dsaCount, ref: dsaRef } = useCountUp(200);

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: i * 0.14, ease: "easeOut" as const },
  });

  return (
    <section className="hero-section" id="home">
      <div className="hero-grid">
        {/* ── LEFT ── */}
        <div>

          <motion.h1 className="hero-title" {...stagger(1)}>
            Hello, my<br />
            name's <span className="name-blue">Nikhil.</span>
          </motion.h1>

          <motion.div {...stagger(2)}>
            <TypeAnimation
              sequence={[
                "Full Stack Developer", 2500,
                "Backend Specialist", 2500,
                "Java & Spring Boot", 2500,
                "React & TypeScript", 2500,
              ]}
              repeat={Infinity}
              wrapper="p"
              className="hero-typewriter"
            />
          </motion.div>

          <motion.p className="hero-desc" {...stagger(3)}>
            I'm a Full Stack Developer from Mumbai, India.<br />
            Building scalable systems with <span className="hl">Spring Boot</span> and<br />
            modern web technologies.
          </motion.p>

          <motion.div className="hero-buttons" {...stagger(4)}>
            <motion.a
              href="https://drive.google.com/file/d/1EOaiuHoniGfGlHm_bl2jqezRbZnBIWGf/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.a>
            <motion.a
              href="#portfolio"
              className="btn-secondary"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              See my work <ArrowRight size={18} />
            </motion.a>
          </motion.div>

          {/* Mini stats */}
          <motion.div className="hero-mini-stats" {...stagger(5)}>
            <div className="mini-stat">
              <span className="mini-stat-num" ref={expRef}>{expCount}+</span>
              <span className="mini-stat-label">Years Exp</span>
            </div>
            <div className="mini-stat-divider" />
            <div className="mini-stat">
              <span className="mini-stat-num" ref={projRef}>{projCount}+</span>
              <span className="mini-stat-label">Projects</span>
            </div>
            <div className="mini-stat-divider" />
            <div className="mini-stat">
              <span className="mini-stat-num" ref={dsaRef}>{dsaCount}+</span>
              <span className="mini-stat-label">DSA Solved</span>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div className="scroll-indicator" {...stagger(6)}>
            <div className="scroll-capsule">
              <div className="scroll-dot" />
            </div>
            <span>Scroll down</span>
          </motion.div>
        </div>

        {/* ── RIGHT ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="hero-image-area"
        >
          <div className="profile-glow" />
          <div className="ring ring-3" />
          <div className="ring ring-2" />
          <div className="ring ring-1" />

          {/* Pyramid (Top Left) */}
          <motion.div
            className="absolute top-4 left-4 z-[3] w-[110px] h-[110px] pointer-events-none bg-transparent border-none outline-none shadow-none overflow-visible hidden md:block"
            animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Pyramid />
          </motion.div>

          {/* Hexagon (Top Right Area) */}
          <motion.div
            className="absolute top-[15%] -right-16 z-[3] w-[95px] h-[95px] pointer-events-none bg-transparent border-none outline-none shadow-none overflow-visible hidden md:block"
            animate={{ y: [-15, 15, -15], rotate: [0, -20, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Hexagon />
          </motion.div>

          {/* Oval */}
          <motion.div
            className="profile-oval"
            animate={{
              boxShadow: [
                "0 0 28px color-mix(in srgb, var(--theme-500) 50%, transparent), 0 0 70px color-mix(in srgb, var(--theme-500) 20%, transparent)",
                "0 0 44px color-mix(in srgb, var(--theme-500) 80%, transparent), 0 0 100px color-mix(in srgb, var(--theme-500) 35%, transparent)",
                "0 0 28px color-mix(in srgb, var(--theme-500) 50%, transparent), 0 0 70px color-mix(in srgb, var(--theme-500) 20%, transparent)",
              ]
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src="/profile.png" alt="Nikhil Mali" />
          </motion.div>

          {/* Cube (Bottom Left Area) */}
          <motion.div
            className="absolute bottom-[20%] -left-20 z-[3] w-[90px] h-[90px] pointer-events-none bg-transparent border-none outline-none shadow-none overflow-visible hidden md:block"
            animate={{ y: [15, -15, 15], rotate: [0, 25, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Cube />
          </motion.div>

          {/* Spring (Bottom Right) */}
          <motion.div
            className="absolute bottom-4 right-4 z-[3] w-[120px] h-[120px] pointer-events-none bg-transparent border-none outline-none shadow-none overflow-visible hidden md:block"
            animate={{ y: [0, 15, 0], rotate: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Spring />
          </motion.div>
        </motion.div>
      </div>

      {/* ── SOCIAL SIDEBAR ── */}
      <motion.div
        className="social-sidebar"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="follow-label">Follow me on</span>
        <div className="follow-line" />
        {[
          { label: "Instagram", icon: <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" className="w-4 h-4" />, href: "https://www.instagram.com/nikhil_mali_17/", bgColor: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" },
          {
            label: "LeetCode", icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffa116">
                <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.332-4.363c.467-.467 1.112-.662 1.824-.662.712 0 1.357.195 1.823.662l2.697 2.606c.514.515 1.311.498 1.79-.038.478-.535.438-1.396-.088-1.922l-2.697-2.606c-1.026-1.028-2.303-1.441-3.528-1.441-1.225 0-2.502.413-3.528 1.441l-4.332 4.363c-1.026 1.028-1.442 2.303-1.442 3.528 0 1.225.416 2.501 1.442 3.528l4.332 4.363c1.026 1.028 2.303 1.441 3.528 1.441 1.225 0 2.502-.413 3.528-1.441l2.697-2.607c.526-.526.566-1.387.088-1.922-.479-.536-1.276-.553-1.79-.038z" />
                <path d="M12.43 12.32c-1.576 0-2.852 1.276-2.852 2.852 0 1.576 1.276 2.852 2.852 2.852 1.576 0 2.852-1.276 2.852-2.852 0-1.576-1.276-2.852-2.852-2.852z" />
                <path d="M18.46 7.19l-3.993 3.993c-.204.204-.31.478-.31.753s.106.549.31.753c.416.416 1.09.416 1.506 0l3.993-3.993c.204-.204.31-.478.31-.753s-.106-.549-.31-.753c-.416-.416-1.09-.416-1.506 0z" />
              </svg>
            ), href: "https://leetcode.com/u/nikhilmali1225/", bgColor: "#000"
          },
          { label: "LinkedIn", icon: <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" className="w-4 h-4" />, href: "https://www.linkedin.com/in/nikhil-mali-70b79122a/", bgColor: "#0a66c2" },
        ].map(s => (
          <motion.a
            key={s.label}
            href={s.href} target="_blank" rel="noreferrer"
            className="social-icon-btn"
            style={{ background: s.bgColor, color: "#fff" }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            {s.icon}
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;