import { useEffect, useRef, useState } from "react";
import { FiPlay, FiArrowUpRight, FiHeart, FiMessageCircle, FiShare2, FiThumbsUp } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";
import { useCountUp } from "./ScrollAnimations";
import "../styles/hero.css";

/* ── Animated Social Network Graph (Canvas) ── */
function SocialNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = [];
    const numParticles = 70; // Node count

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.5,
      });
    }

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < numParticles; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 136, 0.8)";
        ctx.shadowColor = "rgba(0, 255, 136, 0.8)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw connections
        for (let j = i + 1; j < numParticles; j++) {
          let p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 140;
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.25 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-network-canvas" />;
}

/* ── Floating Social Icons ── */
function FloatingSocialIcons() {
  const icons = [
    <FaFacebookF />, <FaInstagram />, <FaTwitter />, <FaLinkedinIn />, <FaTiktok />, <FaYoutube />,
    <FiHeart />, <FiMessageCircle />, <FiShare2 />, <FiThumbsUp />,
    <FaInstagram />, <FaYoutube />, <FiHeart />, <FaTiktok />, <FiThumbsUp />
  ];

  const floatingItems = icons.map((icon, i) => ({
    id: i,
    icon,
    left: `${5 + Math.random() * 90}%`,
    top: `${5 + Math.random() * 90}%`,
    size: 20 + Math.random() * 24, // 20px to 44px
    delay: Math.random() * 5,
    duration: 6 + Math.random() * 8, // slower float
    opacity: 0.15 + Math.random() * 0.35,
  }));

  return (
    <div className="floating-socials" aria-hidden="true">
      {floatingItems.map((item) => (
        <span
          key={item.id}
          className="float-social-icon"
          style={{
            left: item.left,
            top: item.top,
            fontSize: `${item.size}px`,
            opacity: item.opacity,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.icon}
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  // Count-up animations
  const clientCount = useCountUp(40, loaded, 2200);
  const roasCount = useCountUp(3, loaded, 1800);
  const adSpendCount = useCountUp(2, loaded, 2000);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsApp = () => {
    const WHATSAPP_NUMBER = "919436452223";
    const message = "Hi Editiv Agency! I want to discuss growth for my business.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openShowreel = () => {
    window.open(
      "https://www.instagram.com/reel/DSrBdItgXBA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className={`hero ${loaded ? "hero-loaded" : ""}`} id="home">
      {/* Dark BG with subtle radial */}
      <div className="hero-bg" aria-hidden="true" />

      {/* Floating social media icons */}
      <FloatingSocialIcons />

      {/* Social Network Node Graphic */}
      <div className="hero-network-wrap" aria-hidden="true">
        <SocialNetwork />
        <div className="network-glow" />
      </div>

      {/* Abstract glow orbs */}
      <div className="hero-abstract" aria-hidden="true">
        <div className="glow g1" />
        <div className="glow g2" />
        <div className="grain" />
      </div>

      {/* ── CONTENT ── */}
      <div className="hero-content">
        {/* Badge */}
        <div className={`hero-badge ${loaded ? "animate-in" : ""}`}>
          Performance + Creative Studio
          <span className="dot" />
        </div>

        {/* Heading */}
        <h1 className={`hero-heading ${loaded ? "animate-in" : ""}`}>
          We Engineer <span className="neon">Growth</span>
          <br />
          for Modern Brands
        </h1>

        {/* CTAs */}
        <div className={`hero-actions ${loaded ? "animate-in" : ""}`}>
          <button className="btn-glass-primary" onClick={handleWhatsApp}>
            Let's Talk Growth <FiArrowUpRight />
          </button>

          <button className="btn-ghost" onClick={openShowreel} aria-label="Watch showreel">
            Watch Showreel <FiPlay className="ghost-play-icon" />
          </button>
        </div>

        {/* Stat Cards Row */}
        <div className={`hero-stat-cards ${loaded ? "animate-in" : ""}`}>
          <div className="stat-card-hero">
            <span className="stat-val">+128%</span>
            <span className="stat-lbl">Campaign Lift</span>
          </div>
          <div className="stat-card-hero">
            <span className="stat-val">1,240</span>
            <span className="stat-lbl">Leads Generated</span>
          </div>
          <div className="stat-card-hero">
            <span className="stat-val">300+</span>
            <span className="stat-lbl">Creative Output</span>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className={`hero-bottom-bar ${loaded ? "animate-in" : ""}`}>
          <div className="bottom-metric">
            <span className="bm-num">{clientCount}+</span>
            <span className="bm-label"> Clients</span>
          </div>
          <div className="bottom-divider" />
          <div className="bottom-metric">
            <span className="bm-num">{roasCount}x</span>
            <span className="bm-label"> Avg ROAS</span>
          </div>
          <div className="bottom-divider" />
          <div className="bottom-metric">
            <span className="bm-num">₹{adSpendCount}Cr+</span>
            <span className="bm-label"> Ad Spend</span>
          </div>
        </div>
      </div>
    </section>
  );
}
