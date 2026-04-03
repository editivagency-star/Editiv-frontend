import "../styles/founderSection.css";
import { FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";


export default function FounderSection() {
  return (
    <section className="founder-section">

      <div className="founder-wrapper">

        {/* IMAGE */}
        <div className="founder-image-stack">

          <img
            src="/parthiv.png?v=2"
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

      {/* ================= FOOTER PART ================= */}

      <div className="contact-footer-box">

        <p className="contact-small">CONTACT US</p>

        <h2 className="contact-title">Let’s connect</h2>

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
            EditIV © {new Date().getFullYear()}. All Rights Reserved.
          </p>

        </div>

      </div>

    </section>
  );
}
