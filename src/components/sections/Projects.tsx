import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, GitBranch } from "lucide-react";

const allProjects = [
  {
    title: "AI-Powered DB Schema Visualizer",
    desc: "AI-powered platform for creating optimized database schemas, ER diagrams, and system architecture designs.",
    tags: ["React Flow", "TypeScript", "Spring Boot", "AI"],
    category: "fullstack",
    gradient: "from-blue-600/25 to-cyan-600/10",
    border: "rgba(59,130,246,0.3)",
    glow: "rgba(59,130,246,0.35)",
    headerColor: "linear-gradient(135deg,#1e40af,#0e7490)",
    codeUrl: "https://github.com/codernikhilmali/Ai-db-schema-visualiser",
    liveUrl: "https://glistening-nurturing-production.up.railway.app/",
  },
  {
    title: "PO & Inventory Management",
    desc: "Centralized PO management system handling complete business workflows, inventory, and order tracking.",
    tags: ["Java", "Spring Boot", "Inventory", "MySQL"],
    category: "backend",
    gradient: "from-purple-600/25 to-blue-600/10",
    border: "rgba(139,92,246,0.3)",
    glow: "rgba(139,92,246,0.35)",
    headerColor: "linear-gradient(135deg,#5b21b6,#1e40af)",
  },
  {
    title: "ULIP APIs Integration Platform",
    desc: "Secure REST API endpoints for Vahan, Sarathi, FASTag, and FOIS services with multi-layer authentication.",
    tags: ["REST API", "Spring Boot", "Security", "X-API-Key"],
    category: "backend",
    gradient: "from-emerald-600/25 to-blue-600/10",
    border: "rgba(16,185,129,0.3)",
    glow: "rgba(16,185,129,0.35)",
    headerColor: "linear-gradient(135deg,#065f46,#1e40af)",
  }
];

const FILTERS = ["all", "backend", "fullstack"] as const;

const Projects = () => {
  const [filter, setFilter] = useState<typeof FILTERS[number]>("all");

  const visible = filter === "all" ? allProjects : allProjects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="section-container section-alt" style={{ scrollMarginTop: "80px" }}>
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">My Work</span>
        <h2 className="section-title">Featured <span className="text-blue">Projects</span></h2>
        <div className="section-line" />
      </motion.div>

      {/* Filter tabs */}
      <div className="filter-tabs">
        {FILTERS.map(f => (
          <motion.button
            key={f}
            className={`filter-btn ${filter === f ? "filter-btn-active" : ""}`}
            onClick={() => setFilter(f)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {f === "all" ? "All Projects" : f === "backend" ? "Backend" : "Full Stack"}
          </motion.button>
        ))}
      </div>

      <motion.div className="projects-grid" layout>
        {visible.map((p, i) => (
          <motion.div
            key={p.title}
            className={`project-card bg-gradient-to-br ${p.gradient}`}
            style={{ "--card-glow": p.glow, border: `1px solid ${p.border}` } as React.CSSProperties}
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            {/* Gradient header image */}
            <div className="project-header" style={{ background: p.headerColor }}>
              <div className="project-header-pattern" />
              <span className="project-num">0{allProjects.indexOf(p) + 1}</span>
            </div>

            <div className="project-glow" />
            <div className="project-shimmer" />

            <div className="project-body">
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>

              <div className="project-tags">
                {p.tags.map(t => (
                  <motion.span key={t} className="project-tag" whileHover={{ scale: 1.08 }}>{t}</motion.span>
                ))}
              </div>

              {(p.codeUrl || p.liveUrl) && (
                <div className="project-actions">
                  {p.codeUrl && (
                    <motion.a
                      href={p.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      style={{ textDecoration: "none" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <GitBranch size={13} /> Code
                    </motion.a>
                  )}
                  {p.liveUrl && (
                    <motion.a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      style={{ textDecoration: "none" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live <ExternalLink size={13} />
                    </motion.a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
