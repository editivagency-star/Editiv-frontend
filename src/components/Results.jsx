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
    desc: "Since partnering with us, Memohack’s coaching institute has seen a steady rise in audience response, driven by consistent content and effective growth strategies.",
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
