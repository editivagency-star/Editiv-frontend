import { useEffect, useRef, useState } from "react";
import "../styles/results.css";

const results = [
  {
    brand: "Fisdom",
    title: "Strengthening Brand Value in Just 2–3 Months",
    desc: "Medicus Group of Institutions partnered with Editiv for their marketing, and within a short span of 2–3 months, we played a key role in enhancing their brand value and overall market presence.",
    logo: "/logos/logo14.png",
  },
  {
    brand: "Formula Guy",
    title: "Consistent Growth & Strong Audience Response",
    desc: "Since partnering with us, Memohack's coaching institute has seen a steady rise in audience response, driven by consistent content and effective growth strategies.",
    logo: "/logos/logo17.png",
  },
  {
    brand: "RangDe",
    title: "Driving High-Quality Leads & Business Growth",
    desc: "Since partnering with us, CCD has experienced a significant increase in high-quality leads, contributing to substantial business growth and improved performance.",
    logo: "/logos/logo16.png",
  },
];

export default function Results() {
  const headingRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  // One visible-state slot per card
  const [cardVisible, setCardVisible] = useState(results.map(() => false));
  const cardRefs = useRef(results.map(() => null));

  // Heading observer
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeadingVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Per-card observers
  useEffect(() => {
    const observers = cardRefs.current.map((el, idx) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCardVisible(prev => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            obs.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  return (
    <section className="results-wrapper" id="results">

      <h2
        ref={headingRef}
        className={`results-heading ${headingVisible ? "res-visible" : ""}`}
      >
        Stories of our brands that saw{" "}
        <span className="neon-text">exponential growth</span>
      </h2>

      <div className="results-cards">
        {results.map((item, index) => {
          // Odd index → slide from right, even → slide from left
          const direction = index % 2 === 0 ? "slide-left" : "slide-right";
          const isVisible = cardVisible[index];

          return (
            <div
              key={index}
              ref={el => (cardRefs.current[index] = el)}
              className={`result-card glass glow card-${index} ${direction} ${isVisible ? "res-visible" : ""}`}
            >
              <div className="result-content">
                <div className="logo-box">
                  <img src={item.logo} alt={item.brand} />
                </div>

                <div className="result-text">
                  <h4 className="highlight-result">{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
