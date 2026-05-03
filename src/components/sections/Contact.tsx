import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle, Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const contactInfo = [
  { icon: <Mail size={18} />, label: "Email",    value: "nikhilmali810@email.com" },
  { icon: <Phone size={18} />, label: "Phone",   value: "+91 9324337257" },
  { icon: <MapPin size={18} />, label: "Location", value: "Mumbai, Maharashtra, India" },
];

type Status = "idle" | "sending" | "sent";

const Contact = () => {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "2ee18911-fbd2-463a-87fb-235d90d168a2", 
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Portfolio Message from ${form.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("sent");
        toast.success("Message sent successfully!", {
          duration: 6000,
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setStatus("idle");
      toast.error("Failed to send message. Please try again.", {
        duration: 6000,
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      });
    }
  };

  return (
    <section id="contact" className="section-container">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">Get In Touch</span>
        <h2 className="section-title">Contact <span className="text-blue">Me</span></h2>
        <div className="section-line" />
      </motion.div>

      <div className="contact-grid">
        {/* Left — info */}
        <motion.div
          className="contact-info-col"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="contact-lead">
            Want to discuss an opportunity? I'd love to hear
            from you. I usually respond within 24 hours.
          </p>

          <div className="contact-info-list">
            {contactInfo.map((c, i) => (
              <motion.div
                key={c.label}
                className="contact-info-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="contact-icon">{c.icon}</div>
                <div>
                  <p className="contact-info-label">{c.label}</p>
                  <p className="contact-info-value">{c.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="contact-socials">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/nikhil-mali-70b79122a/" },
              { label: "LeetCode", href: "https://leetcode.com/u/nikhilmali1225/" },
              { label: "Instagram", href: "https://www.instagram.com/nikhil_mali_17/" },
            ].map(s => (
              <motion.a
                key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className="contact-social-btn"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.form
          className="contact-form"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
        >
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              /* Success state */
              <motion.div
                key="success"
                className="form-success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle size={52} color="#22c55e" strokeWidth={1.5} />
                </motion.div>
                <h3 className="success-title">Message Sent!</h3>
                <p className="success-desc">Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              /* Form state */
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input name="name" value={form.name} onChange={handleChange} className="form-input" placeholder="Nikhil Mali" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="form-input" placeholder="you@example.com" required />
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: "1.25rem" }}>
                  <label className="form-label">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} className="form-input form-textarea" placeholder="Tell me about your project..." rows={5} required />
                </div>
                <motion.button
                  type="submit"
                  className={`btn-primary form-submit ${status === "sending" ? "btn-sending" : ""}`}
                  style={{ marginTop: "1.25rem" }}
                  whileHover={status === "idle" ? { scale: 1.03 } : {}}
                  whileTap={status === "idle" ? { scale: 0.97 } : {}}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <><Loader size={16} className="spin-icon" /> Sending…</>
                  ) : (
                    <>Send Message <Send size={16} /></>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
