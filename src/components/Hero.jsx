import { useEffect, useRef, useState } from "react";
import { FiPlay, FiArrowUpRight } from "react-icons/fi";
import { useCountUp } from "./ScrollAnimations";
import "../styles/hero.css";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PARTICLE CANVAS
   Renders glowing neon-green particles floating upward
   confined to LEFT (0–18%) and RIGHT (82–100%) side strips
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Size canvas to full hero
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Particle factory ─────────────────────────────
    const TOTAL = 55;   // total particles
    const L0 = 0.00, L1 = 0.18; // left strip ratio
    const R0 = 0.82, R1 = 1.00; // right strip ratio

    const makeParticle = (forceZone) => {
      const side = forceZone ?? (Math.random() < 0.5 ? 'left' : 'right');
      const [x0, x1] = side === 'left' ? [L0, L1] : [R0, R1];
      return {
        side,
        x: (x0 + Math.random() * (x1 - x0)) * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.9 + Math.random() * 2.0,
        opacity: 0.15 + Math.random() * 0.55,
        speed:   0.25 + Math.random() * 0.70,
        drift:   (Math.random() - 0.5) * 0.25,
      };
    };

    const particles = Array.from({ length: TOTAL }, (_, i) =>
      makeParticle(i < TOTAL / 2 ? 'left' : 'right')
    );

    // ── Animation loop ────────────────────────────────
    let animId;
    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        // Move
        p.y -= p.speed;
        p.x += p.drift;

        // Bounce horizontally within strip
        const [x0, x1] = p.side === 'left' ? [L0 * W, L1 * W] : [R0 * W, R1 * W];
        if (p.x < x0 || p.x > x1) p.drift = -p.drift;

        // Reset when above viewport
        if (p.y < -12) Object.assign(p, makeParticle(p.side), { y: H + 10 });

        // Draw: soft radial glow halo
        const glowR = p.r * 5;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        grd.addColorStop(0,   `rgba(0,255,136,${p.opacity})`);
        grd.addColorStop(0.45,`rgba(0,255,136,${p.opacity * 0.35})`);
        grd.addColorStop(1,   'rgba(0,255,136,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Draw: bright core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,255,228,${Math.min(p.opacity * 1.4, 1)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}

const WHATSAPP_NUMBER = "919436452223";
const WHATSAPP_MESSAGE = "Hi Editiv Agency! I want to discuss growth for my business.";
const SHOWREEL_URL =
  "https://www.instagram.com/reel/DSrBdItgXBA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";

const upperStats = [
  { value: "+128%", label: "Campaign Lift" },
  { value: "1,240", label: "Leads Generated" },
  { value: "300+", label: "Creative Output" },
];

function HeroBackground() {
  return (
    <svg
      className="hero-beams-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      overflow="visible"
      aria-hidden="true"
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="rgba(154, 211, 197, 0.12)" />
        </pattern>
        <linearGradient id="softArc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="38%" stopColor="#00ff88" stopOpacity="0.30" />
          <stop offset="52%" stopColor="#eafff5" stopOpacity="1" />
          <stop offset="66%" stopColor="#00ff88" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="softGlow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="55" />
        </filter>
        <filter id="ultraGlow" x="-400%" y="-400%" width="900%" height="900%">
          <feGaussianBlur stdDeviation="80" />
        </filter>
        <filter id="sharpGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.45" />
          <stop offset="45%" stopColor="#00ff88" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1440" height="900" fill="url(#dots)" opacity="0.14" />

      <circle cx="1165" cy="220" r="160" fill="url(#ambientGlow)" filter="url(#softGlow)"
        style={{ animation: 'glowBreathe 4s ease-in-out infinite' }} />
      <circle cx="250" cy="720" r="140" fill="url(#ambientGlow)" filter="url(#softGlow)"
        style={{ animation: 'glowBreathe 4s ease-in-out infinite 2s' }} />

      {/* TOP-RIGHT ARC — ultra haze, soft glow, sharp core */}
      <circle cx="1520" cy="-170" r="860"
        fill="none" stroke="rgba(0,255,136,0.18)" strokeWidth="1"
        strokeDasharray="220 5185" strokeDashoffset="920" />
      <circle cx="1520" cy="-170" r="860"
        fill="none" stroke="rgba(0,255,136,0.35)" strokeWidth="40"
        strokeLinecap="round" strokeDasharray="220 5185" strokeDashoffset="920"
        filter="url(#ultraGlow)" />
      <circle cx="1520" cy="-170" r="860"
        fill="none" stroke="url(#softArc)" strokeWidth="22"
        strokeLinecap="round" strokeDasharray="220 5185" strokeDashoffset="920"
        filter="url(#softGlow)" />
      <circle cx="1520" cy="-170" r="860"
        fill="none" stroke="rgba(220,255,242,0.90)" strokeWidth="2"
        strokeLinecap="round" strokeDasharray="220 5185" strokeDashoffset="920"
        filter="url(#sharpGlow)" />

      {/* BOTTOM-LEFT ARC — ultra haze, soft glow, sharp core */}
      <circle cx="-120" cy="1110" r="860"
        fill="none" stroke="rgba(0,255,136,0.18)" strokeWidth="1"
        strokeDasharray="260 5145" strokeDashoffset="190" />
      <circle cx="-120" cy="1110" r="860"
        fill="none" stroke="rgba(0,255,136,0.35)" strokeWidth="40"
        strokeLinecap="round" strokeDasharray="260 5145" strokeDashoffset="190"
        filter="url(#ultraGlow)" />
      <circle cx="-120" cy="1110" r="860"
        fill="none" stroke="url(#softArc)" strokeWidth="22"
        strokeLinecap="round" strokeDasharray="260 5145" strokeDashoffset="190"
        filter="url(#softGlow)" />
      <circle cx="-120" cy="1110" r="860"
        fill="none" stroke="rgba(220,255,242,0.90)" strokeWidth="2"
        strokeLinecap="round" strokeDasharray="260 5145" strokeDashoffset="190"
        filter="url(#sharpGlow)" />

      <circle
        cx="720"
        cy="445"
        r="440"
        fill="none"
        stroke="rgba(110, 198, 163, 0.08)"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  const clientCount = useCountUp(40, loaded, 2200);
  const roasCount = useCountUp(3, loaded, 1800);
  const adSpendCount = useCountUp(2, loaded, 2000);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openShowreel = () => {
    window.open(SHOWREEL_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className={`hero ${loaded ? "hero-loaded" : ""}`} id="home">
      {/* ── Plain black background ── */}
      <div className="hero-bg" aria-hidden="true" />
      <ParticleCanvas />


      <div className="hero-glass-panel">
        <div className="hero-content">
          <div className={`hero-badge ${loaded ? "animate-in" : ""}`}>
            Performance + Creative Studio
            <span className="dot" />
          </div>

          <h1 className={`hero-heading ${loaded ? "animate-in" : ""}`}>
            We Engineer <span className="neon-text">Growth</span>
            <br />
            for Modern Brands
          </h1>

          <div className={`hero-cta ${loaded ? "animate-in" : ""}`}>
            <button type="button" className="btn-primary" onClick={handleWhatsApp}>
              Let's Talk Growth <FiArrowUpRight className="arrow" />
            </button>
            <button type="button" className="btn-secondary" onClick={openShowreel}>
              Watch Showreel <FiPlay className="ghost-play-icon" />
            </button>
          </div>

          <div className={`hero-stats-wrap ${loaded ? "animate-in" : ""}`}>
            <div className="hero-stats-upper">
              {upperStats.map((stat) => (
                <div key={stat.label} className="stat-box">
                  <span className="stat-val">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className={`hero-stats-lower ${loaded ? "animate-in" : ""}`}>
              <div className="bm-item">
                <span className="bm-val">
                  {clientCount}
                  <span style={{ color: "var(--neon)" }}>+</span>
                </span>
                <span className="bm-label"> Clients</span>
              </div>
              <div className="bm-divider" />
              <div className="bm-item">
                <span className="bm-val">
                  {roasCount}
                  <span style={{ color: "var(--neon)" }}>x</span>
                </span>
                <span className="bm-label"> Avg ROAS</span>
              </div>
              <div className="bm-divider" />
              <div className="bm-item">
                <span className="bm-val">
                  ₹{adSpendCount}
                  <span style={{ color: "var(--neon)" }}>Cr+</span>
                </span>
                <span className="bm-label"> Ad Spend</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
