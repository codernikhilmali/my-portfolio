import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, GitBranch } from "lucide-react";

const allProjects = [
  {
    title: "E-Commerce Backend",
    desc: "Full-featured REST API with JWT auth, product management, orders, and Stripe payments.",
    tags: ["Java", "Spring Boot", "MySQL", "JWT"],
    category: "backend",
    gradient: "from-blue-600/25 to-cyan-600/10",
    border: "rgba(59,130,246,0.3)",
    glow: "rgba(59,130,246,0.35)",
    headerColor: "linear-gradient(135deg,#1e40af,#0e7490)",
  },
  {
    title: "Task Management API",
    desc: "Microservices task tracker with real-time WebSocket notifications and Redis caching.",
    tags: ["Spring Boot", "Redis", "WebSocket", "Docker"],
    category: "backend",
    gradient: "from-purple-600/25 to-blue-600/10",
    border: "rgba(139,92,246,0.3)",
    glow: "rgba(139,92,246,0.35)",
    headerColor: "linear-gradient(135deg,#5b21b6,#1e40af)",
  },
  {
    title: "Student Portal System",
    desc: "College management with role-based access, attendance tracking and result management.",
    tags: ["Java", "Spring MVC", "Thymeleaf", "MySQL"],
    category: "fullstack",
    gradient: "from-cyan-600/25 to-teal-600/10",
    border: "rgba(6,182,212,0.3)",
    glow: "rgba(6,182,212,0.35)",
    headerColor: "linear-gradient(135deg,#0e7490,#065f46)",
  },
  {
    title: "URL Shortener Service",
    desc: "High-throughput URL shortener with analytics, custom aliases, and expiry support.",
    tags: ["Spring Boot", "Redis", "Docker", "REST"],
    category: "backend",
    gradient: "from-emerald-600/25 to-blue-600/10",
    border: "rgba(16,185,129,0.3)",
    glow: "rgba(16,185,129,0.35)",
    headerColor: "linear-gradient(135deg,#065f46,#1e40af)",
  },
  {
    title: "Blog REST API",
    desc: "Scalable blogging platform with full CRUD, pagination, search, and AWS S3 uploads.",
    tags: ["Java", "Spring Boot", "AWS S3", "JPA"],
    category: "backend",
    gradient: "from-pink-600/25 to-purple-600/10",
    border: "rgba(236,72,153,0.3)",
    glow: "rgba(236,72,153,0.35)",
    headerColor: "linear-gradient(135deg,#9d174d,#5b21b6)",
  },
  {
    title: "Chat Application",
    desc: "Real-time messaging with private and group chats using Spring WebSocket and STOMP.",
    tags: ["Spring Boot", "WebSocket", "STOMP", "React"],
    category: "fullstack",
    gradient: "from-orange-600/25 to-red-600/10",
    border: "rgba(249,115,22,0.3)",
    glow: "rgba(249,115,22,0.35)",
    headerColor: "linear-gradient(135deg,#92400e,#991b1b)",
  },
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

              <div className="project-actions">
                <motion.button className="project-link" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <GitBranch size={13} /> Code
                </motion.button>
                <motion.button className="project-link" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Live <ExternalLink size={13} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
