const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      {/* Social row */}
      <div className="footer-socials">
        {[
          { label: "LinkedIn", href: "https://www.linkedin.com/in/nikhil-mali-70b79122a/", color: "#0a66c2" },
          { label: "LeetCode", href: "https://leetcode.com/u/nikhilmali1225/", color: "#ffa116" },
          { label: "Instagram", href: "https://www.instagram.com/nikhil_mali_17/", color: "#e4405f" },
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
            className="footer-social-link"
            style={{ "--link-color": s.color } as React.CSSProperties}
          >
            {s.label}
          </a>
        ))}
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} <span className="text-blue">Nikhil Mali</span>. All rights reserved.
      </p>
      <p className="footer-sub">Crafted with React · TypeScript · Framer Motion · ❤️</p>
    </div>
  </footer>
);

export default Footer;
