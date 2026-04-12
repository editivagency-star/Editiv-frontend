import { useEffect, useRef, useState } from "react";
import "../styles/stats.css";

const statsData = [
  { label: "Clients",      value: 50, prefix: "",  suffix: "+" },
  { label: "Average ROAS", value: 3,  prefix: "",  suffix: "x" },
  { label: "Ad Spend",     value: 40, prefix: "₹", suffix: " Lakhs+" },
];

export default function Stats() {
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  // ── Run counting animation ──
  const runCounters = () => {
    statsData.forEach((stat, index) => {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const increment = end / (duration / 20);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(counter);
        }
        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = Math.floor(start);
          return updated;
        });
      }, 20);
    });
  };

  // ── IntersectionObserver — fire once when section enters viewport ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          runCounters();
        }
      },
      { threshold: 0.35 } // trigger when at least 35% of section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  const format = (num, index) => {
    const stat = statsData[index];
    let display;
    if (num >= 1000000) display = (num / 1000000).toFixed(1) + "M+";
    else if (num >= 1000) display = (num / 1000).toFixed(0) + "K+";
    else display = num;
    const prefix = stat.prefix || "";
    const suffix = num >= stat.value ? stat.suffix : "";
    return `${prefix}${display}${suffix}`;
  };

  return (
    <section className="stats-wrapper" ref={sectionRef}>
      <h2>
        Numbers that speak <span className="neon-text">louder than words</span>
      </h2>

      <div className="stats-bar glass">

        {statsData.map((stat, i) => (
          <div key={i} className="stat-box">

            <div className="stat-number">
              {format(counts[i], i)}
            </div>

            <div className="stat-label">
              {stat.label}
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}
