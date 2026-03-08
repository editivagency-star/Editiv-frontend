import "../styles/services.css";
import {
  FiPenTool,
  FiVideo,
  FiFilm,
  FiTarget,
  FiShare2,
  FiMonitor,
} from "react-icons/fi";
import { useEffect, useRef } from "react";
import ScrollReveal, { useScrollReveal } from "./ScrollAnimations";

const services = [
  {
    title: "Social Media Marketing",
    icon: FiTarget,
    tagline: "Reach the right people, the right way.",
    points: [
      "Meta ads (Facebook & Instagram)",
      "Lead & sales campaigns",
      "Smart targeting & scaling",
    ],
  },
  {
    title: "Social Media Management",
    icon: FiShare2,
    tagline: "We manage, you grow.",
    points: ["Content planning", "Creative posting", "Page growth & engagement"],
  },
  {
    title: "Full Stack Web Development (MERN)",
    icon: FiMonitor,
    tagline: "Custom web applications built to scale.",
    points: [
      "React Frontend",
      "Node.js & Express Backend",
      "MongoDB Database Design",
    ],
  },
  {
    title: "Graphic Design",
    icon: FiPenTool,
    tagline: "Designs that stop scrolling and start conversations.",
    points: [
      "Social media creatives",
      "Brand identity & logos",
      "Campaign & event designs",
    ],
  },
  {
    title: "Video Editing",
    icon: FiVideo,
    tagline: "Short, sharp, and scroll-worthy.",
    points: ["Instagram reels", "Brand & promo videos", "High-engagement edits"],
  },
  {
    title: "Ad Films",
    icon: FiFilm,
    tagline: "From concept to final cut.",
    points: ["Brand commercials", "Product ad films", "Campaign videos"],
  },
];

function TiltCard({ children, className }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

      // Move the sheen towards mouse
      const sheenX = (x / rect.width) * 100;
      const sheenY = (y / rect.height) * 100;
      card.style.setProperty("--sheen-x", `${sheenX}%`);
      card.style.setProperty("--sheen-y", `${sheenY}%`);
    };

    const handleMouseLeave = () => {
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className={className}>
      {children}
    </div>
  );
}

export default function Services() {
  const openWhatsApp = (serviceName) => {
    const msg = encodeURIComponent(
      `Hi Editiv Agency! I want to book: ${serviceName}. Please share the details.`
    );
    window.open(`https://wa.me/919436452223?text=${msg}`, "_blank");
  };

  return (
    <section className="services-section" id="services">
      <ScrollReveal animation="fade-up" className="services-header">
        <p className="services-label">
          <span className="neon-text">SERVICES</span>
        </p>

        <h2 className="services-title">What We Do Best</h2>

        <p className="services-subtitle">
          Creative-first services built to grow your brand — fast, clean, and
          conversion-focused.
        </p>
      </ScrollReveal>

      <div className="services-grid">
        {services.map((s, idx) => {
          const Icon = s.icon;

          return (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 120}>
              <TiltCard className="service-card">
                <h3 className="service-name">
                  {s.title}
                  <span className="service-icon">
                    <Icon />
                  </span>
                </h3>

                <p className="service-tagline">{s.tagline}</p>

                <ul className="service-points">
                  {s.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>

                <button
                  className="btn-neon btn-cta"
                  onClick={() => openWhatsApp(s.title)}
                >
                  Book Now <span className="cta-arrow">→</span>
                </button>
              </TiltCard>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
