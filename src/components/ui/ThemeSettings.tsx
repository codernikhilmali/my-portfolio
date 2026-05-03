import { useState, useEffect } from "react";
import { Settings, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeSettings = () => {
  const [open, setOpen] = useState(false);
  
  // Settings State
  const [color, setColor] = useState(() => localStorage.getItem("theme-color") || "blue");
  const [font, setFont] = useState(() => localStorage.getItem("theme-font") || "inter");
  const [bg, setBg] = useState(() => localStorage.getItem("theme-bg") || "network");
  const [baseBg, setBaseBg] = useState(() => localStorage.getItem("theme-base-bg") || "navy");

  useEffect(() => {
    // Apply Theme Color
    document.documentElement.setAttribute("data-theme", color);
    localStorage.setItem("theme-color", color);
    window.dispatchEvent(new CustomEvent("theme-color-change", { detail: color }));
  }, [color]);

  useEffect(() => {
    // Apply Font
    const fontFamilies: Record<string, string> = {
      "inter": "'Inter', sans-serif",
      "space": "'Space Grotesk', sans-serif",
      "syne": "'Syne', sans-serif",
      "playfair": "'Playfair Display', serif",
      "mono": "'Fira Code', monospace",
    };
    
    document.documentElement.style.setProperty("--theme-font", fontFamilies[font] || "'Inter', sans-serif");
    document.body.style.fontFamily = fontFamilies[font] || "'Inter', sans-serif";
    localStorage.setItem("theme-font", font);
  }, [font]);

  useEffect(() => {
    // Apply Base Background Color
    const baseColors: Record<string, string> = {
      "navy": "#020610",
      "black": "#000000",
      "charcoal": "#111827",
      "deep-purple": "#1a1025",
    };
    
    document.documentElement.style.setProperty("--base-bg", baseColors[baseBg] || "#020610");
    localStorage.setItem("theme-base-bg", baseBg);
  }, [baseBg]);

  useEffect(() => {
    // Apply BG via custom event to Home.tsx
    const event = new CustomEvent("theme-bg-change", { detail: bg });
    window.dispatchEvent(event);
    localStorage.setItem("theme-bg", bg);
  }, [bg]);

  // Hardcoded hex colors so they don't change when CSS variables update
  const colors = [
    { id: "blue", label: "Blue", bg: "#3b82f6" },
    { id: "emerald", label: "Emerald", bg: "#10b981" },
    { id: "purple", label: "Purple", bg: "#a855f7" },
    { id: "rose", label: "Rose", bg: "#f43f5e" },
    { id: "amber", label: "Amber", bg: "#f59e0b" }
  ];

  const baseBgs = [
    { id: "navy", label: "Navy", bg: "#020610" },
    { id: "black", label: "Pitch Black", bg: "#000000" },
    { id: "charcoal", label: "Charcoal", bg: "#111827" },
    { id: "deep-purple", label: "Deep Purple", bg: "#1a1025" }
  ];

  const fonts = [
    { id: "inter", label: "Inter (Default)", family: "'Inter', sans-serif" },
    { id: "space", label: "Space Grotesk (Techy)", family: "'Space Grotesk', sans-serif" },
    { id: "syne", label: "Syne (Artsy)", family: "'Syne', sans-serif" },
    { id: "playfair", label: "Playfair (Elegant)", family: "'Playfair Display', serif" },
    { id: "mono", label: "Fira Code (Coding)", family: "'Fira Code', monospace" }
  ];

  const bgs = [
    { id: "network", label: "Network Mesh" },
    { id: "hex", label: "Honeycomb Grid" },
    { id: "code", label: "Matrix Code" },
    { id: "stars", label: "Warp Starfield" },
    { id: "none", label: "Minimal (None)" }
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-28 md:top-24 right-0 bg-white/10 backdrop-blur-md border border-white/10 border-r-0 rounded-l-xl p-3 z-50 text-white/80 hover:text-white transition-colors"
        aria-label="Theme Settings"
      >
        <Settings size={22} className="animate-[spin_4s_linear_infinite]" />
      </button>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[101]"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-[#070d1f] border-l border-white/10 z-[102] p-6 shadow-2xl flex flex-col gap-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white tracking-wide">Personalize</h2>
                <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              {/* Accent Color */}
              <div>
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">Accent Color</h3>
                <div className="flex flex-wrap gap-3">
                  {colors.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setColor(c.id)}
                      style={{ backgroundColor: c.bg }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${color === c.id ? "border-white scale-110 shadow-[0_0_12px_currentColor]" : "border-transparent opacity-60 hover:opacity-100"}`}
                      title={c.label}
                    >
                      {color === c.id && <Check size={16} className="text-white drop-shadow-md" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Base Background Color */}
              <div>
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">Base Color</h3>
                <div className="flex flex-wrap gap-3">
                  {baseBgs.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setBaseBg(c.id)}
                      style={{ backgroundColor: c.bg }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${baseBg === c.id ? "border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.2)]" : "border-white/20 opacity-60 hover:opacity-100"}`}
                      title={c.label}
                    >
                      {baseBg === c.id && <Check size={16} className="text-white drop-shadow-md" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">Typography</h3>
                <div className="flex flex-col gap-2">
                  {fonts.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFont(f.id)}
                      style={{ fontFamily: f.family }}
                      className={`px-4 py-3 text-left rounded-lg border transition-all ${font === f.id ? "border-blue-400 bg-blue-500/10 text-white" : "border-white/10 text-white/60 hover:bg-white/5 hover:text-white"}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Style */}
              <div>
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">Background Style</h3>
                <div className="flex flex-col gap-2">
                  {bgs.map(b => (
                    <button
                      key={b.id}
                      onClick={() => setBg(b.id)}
                      className={`px-4 py-3 text-left rounded-lg border transition-all ${bg === b.id ? "border-blue-400 bg-blue-500/10 text-white" : "border-white/10 text-white/60 hover:bg-white/5 hover:text-white"}`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-white/10">
                <p className="text-xs text-center text-white/40">These settings are saved locally to your browser.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeSettings;
