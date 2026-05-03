import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CustomCursor from "../components/ui/CustomCursor";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import CodeBackground from "../components/ui/CodeBackground";
import NetworkBackground from "../components/ui/NetworkBackground";
import HexGridBackground from "../components/ui/HexGridBackground";
import StarfieldBackground from "../components/ui/StarfieldBackground";
import ThemeSettings from "../components/ui/ThemeSettings";

import { useState, useEffect } from "react";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [bgType, setBgType] = useState(() => localStorage.getItem("theme-bg") || "network");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);

    const handleBgChange = (e: CustomEvent<string>) => {
      setBgType(e.detail);
    };
    window.addEventListener("theme-bg-change", handleBgChange as EventListener);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("theme-bg-change", handleBgChange as EventListener);
    };
  }, []);

  return (
    <>
      <ThemeSettings />
      {bgType === "network" && <NetworkBackground />}
      {bgType === "hex" && <HexGridBackground />}
      {bgType === "code" && <CodeBackground />}
      {bgType === "stars" && <StarfieldBackground />}
      
      <CustomCursor />
      <div className="mx-auto max-w-7xl px-8 lg:px-10">
        <Navbar />
      </div>
      <main className="min-h-screen page-fade-in">
        <Hero />
        <div className="mx-auto max-w-7xl px-8 lg:px-10">
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
        <Footer />
      </main>
      
      {/* Global Back-to-Top Button */}
      {scrolled && (
        <button
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center shadow-[0_0_16px_rgba(59,130,246,0.6)] hover:-translate-y-1 transition-transform z-50 animate-bounce"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
      )}
    </>
  );
};

export default Home;