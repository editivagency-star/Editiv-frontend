import { useEffect, useRef, useState } from "react";
import "../styles/results.css";

const results = [
  {
    brand: "Fisdom",
    title: "1100% increase in views within 45 days",
    desc: "Instagram reels grew from 300-400 views to over 3,500 average views in less than 45 days after partnering with us.",
    logo: "/logos/logo3.png",
  },
  {
    brand: "Formula Guy",
    title: "50,000 followers & 5M views in 6 months",
    desc: "Personal brand grew rapidly with consistent content strategy and viral reels created by our team.",
    logo: "/profiles/p1.jpg",
  },
  {
    brand: "RangDe",
    title: "800% more virality and 6x growth",
    desc: "Recreated high-performing reels and achieved over 61,000 views along with strong engagement growth.",
    logo: "/logos/logo1.png",
  },
];

export default function Results() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="results-wrapper" id="results" ref={sectionRef}>

      <h2 className={`results-heading ${visible ? "res-visible" : ""}`}>
        Stories of our brands that saw{" "}
        <span className="neon-text">exponential growth</span>
      </h2>

      <div className="results-cards">
        {results.map((item, index) => (
          <div
            key={index}
            className={`result-card glass glow card-${index} ${visible ? "res-visible" : ""}`}
            style={{ transitionDelay: visible ? `${index * 0.18}s` : "0s" }}
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
        ))}
      </div>
    </section>
  );
}
