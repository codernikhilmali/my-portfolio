import { motion } from "framer-motion";

const skills = [
  { name: "Java",       level: 90, color: "#f89820" },
  { name: "Spring Boot",level: 85, color: "#6db33f" },
  { name: "DSA",         level: 92, color: "#a855f7" },
  { name: "REST APIs",  level: 88, color: "#60a5fa" },
  { name: "MySQL",      level: 80, color: "#00758f" },
  { name: "Docker",     level: 70, color: "#2496ed" },
];

// Simple Icons CDN URLs
const techStack = [
  { name: "Java",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Spring",     icon: "https://cdn.simpleicons.org/springboot/6db33f" },
  { name: "React",      icon: "https://cdn.simpleicons.org/react/61dafb" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178c6" },
  { name: "MySQL",      icon: "https://cdn.simpleicons.org/mysql/4479a1" },
  { name: "Docker",     icon: "https://cdn.simpleicons.org/docker/2496ed" },
  { name: "Git",        icon: "https://cdn.simpleicons.org/git/f05032" },
  { name: "Postman",    icon: "https://cdn.simpleicons.org/postman/ff6c37" },
];

const Skills = () => (
  <section id="skills" className="section-container section-alt" style={{ scrollMarginTop: "80px" }}>
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <span className="section-tag">What I Know</span>
      <h2 className="section-title">My <span className="text-blue">Skills</span></h2>
      <div className="section-line" />
    </motion.div>

    <div className="skills-grid">
      {/* Skill bars */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="skills-subtitle">Proficiency</h3>
        <div className="skill-bars-list">
          {skills.map((s, i) => (
            <motion.div
              key={s.name} className="skill-bar-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="skill-bar-header">
                <span className="skill-name">{s.name}</span>
                <span className="skill-pct">{s.level}%</span>
              </div>
              <div className="skill-bar-track">
                <motion.div
                  className="skill-bar-fill"
                  style={{ background: `linear-gradient(90deg,${s.color}88,${s.color})`, boxShadow: `0 0 8px ${s.color}66` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: "easeOut" as const }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tech stack — real SVG logos */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="skills-subtitle">Tech Stack</h3>
        <div className="tech-stack-grid">
          {techStack.map((t, i) => (
            <motion.div
              key={t.name} className="tech-card"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <img src={t.icon} alt={t.name} className="tech-svg-icon" />
              <span className="tech-name">{t.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Skills;
