import { useEffect, useState } from "react";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";
import "../styles/heroNew.css";

const WHATSAPP_NUMBER  = "919436452223";
const WHATSAPP_MESSAGE = "Hi Editiv Agency! I want to discuss growth for my business.";
const SHOWREEL_URL     =
  "https://www.instagram.com/reel/DSrBdItgXBA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";

const upperStats = [
  { value: "+80%", label: "Campaign Lift" },
  { value: "3,500", label: "Leads Generated" },
  { value: "200+",  label: "Creative Output" },
];

const lowerStats = [
  { value: "50+",       label: "Clients" },
  { value: "3x",        label: "Avg ROAS" },
  { value: "40Lakhs+",  label: "Ad Spend" },
];


export default function HeroNew() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openShowreel = () => {
    window.open(SHOWREEL_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className={`hero-new ${loaded ? "hn-loaded" : ""}`}
      id="home"
    >
      <div className="hero-new-inner">

        {/* ── LEFT — text ── */}
        <div className="hero-new-left">

          {/* Badge */}
          <div className="hero-new-badge">
            <span className="badge-dot" />
            Performance + Creative Studio
          </div>

          {/* Heading */}
          <h1 className="hero-new-heading">
            We Engineer <span className="hn-green">Growth</span>
            <br />
            for Modern Brands
          </h1>

          {/* CTA buttons */}
          <div className="hero-new-cta">
            <button
              id="hero-talk-growth-btn"
              type="button"
              className="hn-btn-primary"
              onClick={handleWhatsApp}
            >
              Let's Talk Growth <FiArrowUpRight />
            </button>

            <button
              id="hero-showreel-btn"
              type="button"
              className="hn-btn-secondary"
              onClick={openShowreel}
            >
              Watch Showreel <FiPlay />
            </button>
          </div>

          {/* Stats cards */}
          <div className={`hn-stats-wrap ${loaded ? "hn-loaded-stats" : ""}`}>
            <div className="hn-stats-row">
              {upperStats.map((s) => (
                <div key={s.label} className="hn-stat-card">
                  <span className="hn-stat-val">{s.value}</span>
                  <span className="hn-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="hn-stats-row hn-stats-row--lower">
              {lowerStats.map((s) => (
                <div key={s.label} className="hn-stat-card hn-stat-card--sm">
                  <span className="hn-stat-val--sm">{s.value}</span>
                  <span className="hn-stat-label--sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT — video ── */}
        <div className="hero-new-right">
          <div className="hero-new-video-wrap">
            <video
              src="/lv_0_20260410222512.mp4"
              autoPlay
              loop
              muted
              playsInline
            />

            {/* Floating tool icons */}
            <img
              src="/after-effects-3d-icon-png-download-5588282.webp"
              alt="After Effects"
              className="hn-float-icon hn-icon-ae"
            />
            <img
              src="/adobe-illustrator-logo-on-a-transparent-background-free-png.webp"
              alt="Figma"
              className="hn-float-icon hn-icon-figma"
            />
            <img
              src="/adobe-premiere-pro-icon-free-png.webp"
              alt="Premiere Pro"
              className="hn-float-icon hn-icon-ig"
            />
            <img
              src="/free-meta-3d-icon-png-download-8250233.webp"
              alt="Meta"
              className="hn-float-icon hn-icon-meta"
            />
            <img
              src="/photoshop-3d-icon-free-png.webp"
              alt="Photoshop"
              className="hn-float-icon hn-icon-ps"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
