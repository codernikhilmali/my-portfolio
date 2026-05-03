import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

const stats = [
  { value: 2,   suffix: "+", label: "Years Experience" },
  { value: 20,  suffix: "+", label: "Projects Completed" },
  { value: 200, suffix: "+", label: "DSA Problems Solved" },
  { value: 5,   suffix: "+", label: "Technologies" },
];

const experiences = [
  {
    year: "2024 – Present",
    role: "Java Backend Developer",
    company: "Freelance / Contracts",
    location: "Pune, India",
    desc: "Architecting and implementing high-performance REST APIs and microservices using Spring Boot and Java 17.",
    points: [
      "Designed and deployed scalable microservices architectures.",
      "Optimized database queries, reducing response time by 30%.",
      "Integrated third-party APIs and handled complex business logic."
    ],
    color: "#3b82f6",
  },
  {
    year: "2023 – 2024",
    role: "Backend Developer Intern",
    company: "TechCorp India",
    location: "Mumbai, India",
    desc: "Collaborated on production-grade Spring Boot applications focused on high availability.",
    points: [
      "Developed modular REST controllers and data access layers.",
      "Identified and fixed 50+ critical bugs in existing services.",
      "Participated in agile ceremonies and code review processes."
    ],
    color: "#8b5cf6",
  }
];

const education = [
  {
    year: "2020 – 2024",
    role: "B.E. Computer Engineering",
    company: "Pune University",
    location: "Pune, India",
    desc: "Graduated with First Class Distinction. Specialised in Software Engineering and Distributed Systems.",
    points: [
      "Core Subjects: DSA, DBMS, OS, Computer Networks.",
      "Final Year Project: Microservices-based E-commerce System.",
      "Won 1st prize in University-level Hackathon 2023."
    ],
    color: "#06b6d4",
  },
  {
    year: "2018 – 2020",
    role: "HSC (Science)",
    company: "St. Xavier's Junior College",
    location: "Pune, India",
    desc: "Completed Higher Secondary Certificate with focus on Mathematics and Computer Science.",
    points: [
      "Score: 88.5% overall.",
      "Ranked in top 5% of the batch.",
      "Member of the Science Club and Chess Team."
    ],
    color: "#10b981",
  }
];

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.1 });
  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      setCount(Math.round((frame / 60) * target));
      if (frame >= 60) clearInterval(id);
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const TimelineItem = ({ item, index }: { item: any; index: number }) => (
  <motion.div
    className="relative pl-8 pb-12 last:pb-0"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: false, amount: 0.1 }}
    transition={{ delay: index * 0.15 }}
  >
    {/* Line connector */}
    <div className="absolute left-[7px] top-2 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent" />
    
    {/* Glowing Dot */}
    <div 
      className="absolute left-0 top-1.5 w-4 h-4 rounded-full z-10 border-2 border-[#070d1f]"
      style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }}
    />

    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all hover:bg-white/[0.05] group">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: item.color }}>
          <Calendar size={14} />
          {item.year}
        </div>
        <div className="flex items-center gap-1 text-xs text-white/40 font-medium">
          <MapPin size={12} />
          {item.location}
        </div>
      </div>

      <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{item.role}</h4>
      <p className="text-sm text-white/60 font-medium mb-4 italic">{item.company}</p>
      
      <p className="text-sm text-white/50 leading-relaxed mb-4">{item.desc}</p>
      
      <ul className="space-y-2">
        {item.points.map((point: string, i: number) => (
          <li key={i} className="flex items-start gap-3 text-xs text-white/40 leading-relaxed">
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color }} />
            {point}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const About = () => (
  <section id="about" className="section-container" style={{ scrollMarginTop: "80px" }}>
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <span className="section-tag">About Me</span>
      <h2 className="section-title">Who I <span className="text-blue">Am</span></h2>
      <div className="section-line" />
    </motion.div>

    {/* Bio + Stats */}
    <div className="about-grid mb-24">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.7 }}
      >
        <p className="about-lead">
          I'm <span className="text-blue font-semibold">Nikhil Mali</span>, a passionate Java Backend
          Developer based in Pune, India. I specialise in building robust, scalable,
          and high-performance server-side applications.
        </p>
        <p className="about-body">
          With hands-on experience in <strong>Spring Boot</strong>, <strong>REST APIs</strong>,
          microservices, and cloud-native architectures, I love turning complex business
          problems into elegant technical solutions.
        </p>
        <div className="about-tags">
          {["Spring Boot", "Java", "DSA", "REST API", "Microservices", "MySQL", "Docker"].map((t, i) => (
            <motion.span
              key={t} className="about-tag"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <div className="about-stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.label} className="stat-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.04 }}
          >
            <span className="stat-value"><CountUp target={s.value} suffix={s.suffix} /></span>
            <span className="stat-label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Split Experience & Education */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 px-4 sm:px-0">
      {/* Experience Column */}
      <div>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Briefcase size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Work Experience</h3>
            <p className="text-sm text-white/40">My professional journey</p>
          </div>
        </div>
        <div className="space-y-0">
          {experiences.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Education Column */}
      <div>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <GraduationCap size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Education</h3>
            <p className="text-sm text-white/40">Academic background</p>
          </div>
        </div>
        <div className="space-y-0">
          {education.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;

