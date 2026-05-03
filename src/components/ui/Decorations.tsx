
export const Pyramid = () => (
  <svg viewBox="-20 -20 120 120" fill="none" className="overflow-visible" style={{ filter: "drop-shadow(0 0 15px color-mix(in srgb, var(--theme-500) 80%, transparent))" }}>
    <polygon points="40,4 76,66 4,66" fill="url(#pyTop)" />
    <polygon points="40,4 76,66 58,76" fill="url(#pySide)" />
    <polygon points="40,4 4,66 22,76" fill="url(#pyLeft)" />
    <defs>
      <linearGradient id="pyTop" x1="40" y1="4" x2="40" y2="66" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--theme-300)" /><stop offset="1" stopColor="var(--theme-500)" />
      </linearGradient>
      <linearGradient id="pySide" x1="58" y1="4" x2="67" y2="76" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--theme-400)" /><stop offset="1" stopColor="var(--theme-700)" />
      </linearGradient>
      <linearGradient id="pyLeft" x1="22" y1="4" x2="13" y2="76" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--theme-600)" /><stop offset="1" stopColor="var(--theme-800, #1e3a8a)" />
      </linearGradient>
    </defs>
  </svg>
);

export const Spring = () => (
  <svg viewBox="-20 -20 120 120" fill="none" className="overflow-visible" style={{ filter: "drop-shadow(0 0 15px color-mix(in srgb, var(--theme-500) 60%, transparent))" }}>
    {[0, 1, 2, 3].map(i => (
      <ellipse key={i} cx="40" cy={18 + i * 14} rx="24" ry="7"
        stroke="url(#spg)" strokeWidth="4" fill="none"
        transform={`rotate(${i % 2 === 0 ? 0 : 8} 40 ${18 + i * 14})`}
      />
    ))}
    <defs>
      <linearGradient id="spg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--theme-300)" /><stop offset="1" stopColor="var(--theme-600)" />
      </linearGradient>
    </defs>
  </svg>
);

export const Hexagon = () => (
  <svg viewBox="-20 -20 120 120" fill="none" className="overflow-visible" style={{ filter: "drop-shadow(0 0 15px color-mix(in srgb, var(--theme-500) 60%, transparent))" }}>
    <path d="M40 5 L75 25 L75 60 L40 80 L5 60 L5 25 Z" fill="url(#hexGrad)" />
    <defs>
      <linearGradient id="hexGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--theme-300)" /><stop offset="1" stopColor="var(--theme-600)" />
      </linearGradient>
    </defs>
  </svg>
);

export const Cube = () => (
  <svg viewBox="-20 -20 120 120" fill="none" className="overflow-visible" style={{ filter: "drop-shadow(0 0 15px color-mix(in srgb, var(--theme-500) 70%, transparent))" }}>
    <path d="M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z" fill="url(#cubeTop)" opacity="0.8" />
    <path d="M40 40 L70 25 L70 55 L40 70 Z" fill="url(#cubeSide1)" />
    <path d="M40 40 L10 25 L10 55 L40 70 Z" fill="url(#cubeSide2)" />
    <defs>
      <linearGradient id="cubeTop" x1="40" y1="10" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--theme-300)" /><stop offset="1" stopColor="var(--theme-500)" />
      </linearGradient>
      <linearGradient id="cubeSide1" x1="40" y1="40" x2="70" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--theme-400)" /><stop offset="1" stopColor="var(--theme-600)" />
      </linearGradient>
      <linearGradient id="cubeSide2" x1="40" y1="40" x2="10" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--theme-500)" /><stop offset="1" stopColor="var(--theme-700)" />
      </linearGradient>
    </defs>
  </svg>
);

export const Sphere = () => (
  <svg viewBox="-20 -20 120 120" fill="none" className="overflow-visible">
    <circle cx="40" cy="40" r="30" fill="url(#sphereGrad)" style={{ filter: "drop-shadow(0 0 20px color-mix(in srgb, var(--theme-500) 60%, transparent))" }} />
    <defs>
      <radialGradient id="sphereGrad" cx="30" cy="30" r="50" fx="30" fy="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--theme-300)" />
        <stop offset="1" stopColor="var(--theme-600)" />
      </radialGradient>
    </defs>
  </svg>
);

export const Torus = () => (
  <svg viewBox="-20 -20 120 120" fill="none" className="overflow-visible" style={{ filter: "drop-shadow(0 0 15px color-mix(in srgb, var(--theme-400) 60%, transparent))" }}>
    <circle cx="40" cy="40" r="25" stroke="url(#torusGrad)" strokeWidth="6" />
    <defs>
      <linearGradient id="torusGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--theme-300)" /><stop offset="1" stopColor="var(--theme-500)" />
      </linearGradient>
    </defs>
  </svg>
);

