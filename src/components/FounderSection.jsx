import { useState } from "react";
import "../styles/founderSection.css";
import { FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import API from "../config/api";
import axios from "axios";


export default function FounderSection() {

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      await axios.post(`${API}/booking`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="founder-section">

      <div className="founder-wrapper">

        {/* IMAGE */}
        <div className="founder-image-stack">

          <img
            src="/founder.png?v=2"
            alt="Parthiv Chakraborty"
            className="founder-img"
          />

        </div>

        {/* CONTENT */}
        <div className="founder-content">

          <p className="founder-small">Meet The Founder</p>

          <h2 className="neon-text" style={{ display: 'inline-block' }}>Parthiv Chakraborty</h2>
          <br /><br />
          <p>
            As an entrepreneur and visionary content strategist, Parthiv has dedicated his career to mastering the art of high-retention digital media. He understands that modern brand growth isn't just about fleeting views—it's about engineering viral momentum and building highly dedicated loyal communities.
          </p>

          <p>
            Having personally developed growth strategies that have amassed millions of views across Instagram and YouTube, Parthiv leads the EditIV team with a uniquely data-driven, creative-first methodology.
          </p>

          <p>
            His mission is clear: to help ambitious visionaries and businesses unlock exponential growth through elite video editing, dominant social positioning, and relentless creative execution.
          </p>

          <div className="founder-socials" style={{ display: 'flex', gap: '22px', marginTop: '30px' }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '22px', opacity: '0.7', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.color = '#00ff88'; e.currentTarget.style.opacity = '1'; }} onMouseOut={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.opacity = '0.7'; }}>
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '22px', opacity: '0.7', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.color = '#00ff88'; e.currentTarget.style.opacity = '1'; }} onMouseOut={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.opacity = '0.7'; }}>
              <FaLinkedinIn />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '22px', opacity: '0.7', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.color = '#00ff88'; e.currentTarget.style.opacity = '1'; }} onMouseOut={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.opacity = '0.7'; }}>
              <FaYoutube />
            </a>
          </div>
        </div>

      </div>

      {/* ================= CONTACT FORM SECTION ================= */}

      <div className="contact-footer-box">

        <p className="contact-small">CONTACT US</p>

        <h2 className="contact-title">Let's connect</h2>

        <div className="contact-buttons">

          <a href="#" className="contact-btn primary">
            Book Call
          </a>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            className="contact-btn secondary"
          >
            Chat On Whatsapp
          </a>

        </div>

        {/* ── FORM ── */}
        <div className="cf-form-wrapper">

          <div className="cf-form-label">Send us a message</div>

          {status === "success" ? (

            <div className="cf-success">
              <div className="cf-success-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>We've received your message and sent a confirmation to your email. We'll be in touch within 24 hours.</p>
              <button className="cf-send-again" onClick={() => setStatus("idle")}>Send another message</button>
            </div>

          ) : (

            <form className="cf-form" onSubmit={handleSubmit} noValidate>

              <div className="cf-row">

                <div className="cf-field">
                  <label htmlFor="cf-name">Full Name</label>
                  <input
                    id="cf-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="cf-field">
                  <label htmlFor="cf-email">Email Address</label>
                  <input
                    id="cf-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="cf-field">
                <label htmlFor="cf-phone">Phone Number</label>
                <input
                  id="cf-phone"
                  type="tel"
                  name="phone"
                  placeholder="+91 00000 00000"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="cf-field">
                <label htmlFor="cf-message">Your Message</label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project or what you need help with..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {status === "error" && (
                <p className="cf-error">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="cf-submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <span className="cf-spinner" />
                ) : (
                  "Send Message →"
                )}
              </button>

            </form>

          )}

        </div>

        {/* ── FOOTER STRIP ── */}
        <div className="footer-strip">

          <div className="social-icons">
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>

          <p className="footer-copy">
            Editiv © {new Date().getFullYear()}. All Rights Reserved.
          </p>

        </div>

      </div>

    </section>
  );
}
