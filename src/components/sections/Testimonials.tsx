import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "CTO",
    company: "TechCorp India",
    initials: "RS",
    color: "#3b82f6",
    quote: "Nikhil built our entire backend infrastructure from scratch. His Spring Boot expertise and attention to scalability were outstanding. The system handles 100k requests daily flawlessly.",
    stars: 5,
  },
  {
    name: "Priya Patel",
    role: "Product Manager",
    company: "StartupXYZ",
    initials: "PP",
    color: "#8b5cf6",
    quote: "Delivered on time, clean code, and excellent communication throughout. The REST API he designed is robust, well-documented, and a pleasure to work with.",
    stars: 5,
  },
  {
    name: "Amit Joshi",
    role: "Lead Developer",
    company: "Infosys",
    initials: "AJ",
    color: "#06b6d4",
    quote: "Nikhil's microservices implementation was textbook perfect. He has a deep understanding of distributed systems, Docker orchestration, and database optimisation.",
    stars: 5,
  },
];

const Testimonials = () => (
  <section id="testimonials" className="section-container section-alt">
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <span className="section-tag">Client Feedback</span>
      <h2 className="section-title">What People <span className="text-blue">Say</span></h2>
      <div className="section-line" />
    </motion.div>

    <div className="testimonials-grid">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.name}
          className="testi-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.5, delay: i * 0.12 }}
          whileHover={{ y: -6 }}
          style={{ "--testi-color": t.color } as React.CSSProperties}
        >
          {/* Quote icon */}
          <div className="testi-quote-icon">
            <Quote size={20} />
          </div>

          {/* Stars */}
          <div className="testi-stars">
            {Array.from({ length: t.stars }).map((_, s) => (
              <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>

          <p className="testi-text">"{t.quote}"</p>

          <div className="testi-author">
            <div
              className="testi-avatar"
              style={{ background: `linear-gradient(135deg, ${t.color}88, ${t.color})` }}
            >
              {t.initials}
            </div>
            <div>
              <p className="testi-name">{t.name}</p>
              <p className="testi-role">{t.role} · {t.company}</p>
            </div>
          </div>

          {/* Card bottom glow */}
          <div className="testi-glow" />
        </motion.div>
      ))}
    </div>
  </section>
);

export default Testimonials;
