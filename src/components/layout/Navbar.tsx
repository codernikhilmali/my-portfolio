import { useState, useEffect } from "react";
import { Menu, X, Code } from "lucide-react";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "portfolio" },
  { name: "Contact", id: "contact" }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    
    // Intersection Observer for active sections
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    navLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? "bg-[#050a1c]/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_32px_rgba(0,0,0,0.4)] py-3" : "bg-transparent py-5"}`}
    >
      <div className="mx-auto max-w-7xl px-8 lg:px-10 w-full">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:border-[var(--accent)]/50 transition-all duration-300">
              <Code size={22} className="text-[var(--accent-light)] group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-[var(--accent)]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="text-lg md:text-xl font-bold text-white tracking-wide group-hover:text-[var(--accent-light)] transition-colors duration-300">
              Nikhil Mali
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link text-sm font-medium relative transition-colors duration-300 ${activeSection === link.id ? "text-[var(--accent-light)]" : "text-white/65"}`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--accent-light)] rounded-full shadow-[0_0_8px_var(--accent-light)]" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="text-white md:hidden transition-transform duration-200 hover:scale-110"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl md:hidden animate-slide-down shadow-2xl">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`text-sm transition-colors py-2 px-3 rounded-lg ${activeSection === link.id ? "bg-[var(--accent)]/10 text-[var(--accent-light)] font-bold" : "text-white/75 hover:bg-white/5"}`}
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;