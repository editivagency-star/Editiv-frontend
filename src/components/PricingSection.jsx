import { useEffect, useRef, useState } from "react";
import "../styles/pricing.css";
import { FiZap, FiVideo, FiImage, FiSliders } from "react-icons/fi";

const packages = [
  {
    groupTitle: "Social Media Management",
    note: "(Ad budget not included)",
    gridClass: "pricing-grid-3",
    plans: [
      {
        title: "Silver",
        subtitle: "Great for getting started",
        price: "₹9,000",
        whatsappMessage:
          "Hi, I'm interested in Social Media Management (Silver). Please share details.",
        items: [
          { text: "12 Graphics", included: true },
          { text: "5 Videos", included: true },
          { text: "SMO Research", included: false },
          { text: "Content Research", included: true },
          { text: "Meme Marketing", included: false },
          { text: "Marketing Strategies", included: false },
        ],
      },
      {
        title: "Gold",
        subtitle: "For growing brands",
        price: "₹18,000",
        badge: "Best Value",
        whatsappMessage:
          "Hi, I'm interested in Social Media Management (Gold). Please share details.",
        items: [
          { text: "15 Graphics", included: true },
          { text: "8 Videos", included: true },
          { text: "SMO Research", included: false },
          { text: "Content Research", included: true },
          { text: "Meme Marketing", included: true },
          { text: "Marketing Strategies", included: false },
        ],
      },
      {
        title: "Diamond",
        subtitle: "The complete growth engine",
        price: "₹30,000",
        badge: "Premium",
        isDiamond: true,
        whatsappMessage:
          "Hi, I'm interested in Social Media Management (Diamond). Please share details.",
        items: [
          { text: "20 Graphics", included: true },
          { text: "12 Videos", included: true },
          { text: "SMO Research", included: true },
          { text: "Content Research", included: true },
          { text: "Meme Marketing", included: true },
          { text: "Marketing Strategies", included: true },
        ],
      },
    ],
  },
  {
    groupTitle: "Marketing Campaign Packages",
    note: "Ad Budget not included in package price.",
    gridClass: "pricing-grid-2",
    plans: [
      {
        title: "Silver",
        subtitle: "Perfect for testing the market",
        price: "₹6,000 + Ad Budget",
        whatsappMessage:
          "Hi, I'm interested in the Marketing Campaign Package (Silver). Please share details.",
        items: [
          { text: "1 Ad Campaign", included: true },
          { text: "1 Graphic", included: true },
          { text: "1 Carousel", included: true },
          { text: "1 Video Reel", included: true },
        ],
      },
      {
        title: "Gold",
        subtitle: "Built for faster growth",
        price: "₹12,000 + Ad Budget",
        badge: "Most Popular",
        whatsappMessage:
          "Hi, I'm interested in the Marketing Campaign Package (Gold). Please share details.",
        items: [
          { text: "2 Ad Campaigns", included: true },
          { text: "2 Graphics", included: true },
          { text: "2 Carousels", included: true },
          { text: "2 Video Reels", included: true },
        ],
      },
    ],
  },
];

/* ── Hook: observe one element, fire once ── */
function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ── Animated card wrapper ── */
function AnimatedCard({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal(0.15);
  return (
    <div
      ref={ref}
      className={`pricing-card-wrap-anim ${visible ? "pc-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/* ── Animated custom feature card ── */
function AnimatedFeature({ children, delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`custom-feature-item cf-anim ${visible ? "cf-visible" : ""}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export default function PricingSection() {
  const [titleRef, titleVisible] = useReveal(0.2);

  return (
    <section className="pricing-section" id="pricing">

      <h2
        ref={titleRef}
        className={`pricing-title price-title-anim ${titleVisible ? "pt-visible" : ""}`}
      >
        📦 <span className="neon-text">PACKAGES</span>
      </h2>

      {packages.map((group, gi) => (
        <div key={gi} className="package-group">
          <h3 className="package-heading">{group.groupTitle}</h3>
          {group.note && <p className="package-note">{group.note}</p>}

          <div className={`pricing-grid ${group.gridClass}`}>
            {group.plans.map((plan, i) => (
              <AnimatedCard
                key={i}
                delay={i * 150}
                className={plan.isDiamond ? "diamond-wrap" : ""}
              >
                {plan.badge && (
                  <div className={`pricing-badge ${plan.isDiamond ? "diamond-badge" : ""}`}>
                    {plan.badge}
                  </div>
                )}

                <div
                  className={`pricing-card ${plan.badge ? "featured" : ""} ${
                    plan.isDiamond ? "diamond-card" : `${plan.title.toLowerCase()}-card`
                  }`}
                >
                  <div className="card-inner">
                    <div className="plan-top">
                      <h4 className={`plan-title ${plan.title.toLowerCase()}-title`}>
                        {plan.title}
                      </h4>
                      {plan.subtitle && (
                        <p className="plan-subtitle">{plan.subtitle}</p>
                      )}
                    </div>

                    <div className={`plan-price ${plan.isDiamond ? "diamond-price" : ""}`}>
                      {plan.price}
                    </div>

                    <ul className="plan-list">
                      {plan.items.map((item, idx) => (
                        <li key={idx} className={item.included ? "ok" : "nok"}>
                          {item.text}
                        </li>
                      ))}
                    </ul>

                    <a
                      className={`plan-btn ${plan.isDiamond ? "diamond-btn" : ""}`}
                      href={`https://wa.me/919436452223?text=${encodeURIComponent(
                        plan.whatsappMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enquire on WhatsApp <span className="arrow">→</span>
                    </a>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      ))}

      {/* Custom Plans Note + Feature Points */}
      <div className="custom-plans-block">
        <p className="custom-note">
          <FiZap className="custom-note-icon" />
          <span className="neon-text">Custom plans available</span> for brands that want more.
        </p>

        <div className="custom-features">
          <AnimatedFeature delay={0}>
            <FiVideo className="cf-icon" />
            <span>Custom Video Packages</span>
            <p>Reels, brand films &amp; promo videos tailored to your campaign goals.</p>
          </AnimatedFeature>
          <AnimatedFeature delay={150}>
            <FiImage className="cf-icon" />
            <span>Bespoke Graphic Design</span>
            <p>Creatives crafted around your brand identity — colours, tone &amp; style.</p>
          </AnimatedFeature>
          <AnimatedFeature delay={300}>
            <FiSliders className="cf-icon" />
            <span>Flexible Deliverables</span>
            <p>Choose exactly what you need — mix &amp; match at your convenience.</p>
          </AnimatedFeature>
        </div>
      </div>

    </section>
  );
}
