import "../styles/pricing.css";

const packages = [
  {
    groupTitle: "Marketing Campaign Packages",
    note: "Ad Budget not included in package price.",
    plans: [
      {
        title: "Silver",
        subtitle: "Perfect for testing the market",
        price: "₹6,000 + Ad Budget",
        whatsappMessage:
          "Hi, I’m interested in the Marketing Campaign Package (Silver). Please share details.",
        items: ["1 Ad Campaign", "1 Graphic", "1 Carousel", "1 Video Reel"],
      },
      {
        title: "Gold",
        subtitle: "Built for faster growth",
        price: "₹12,000 + Ad Budget",
        badge: "Most Popular",
        whatsappMessage:
          "Hi, I’m interested in the Marketing Campaign Package (Gold). Please share details.",
        items: ["2 Ad Campaigns", "2 Graphics", "2 Carousels", "2 Video Reels"],
      },
    ],
  },
  {
    groupTitle: "Social Media Management",
    note: "(Ad budget not included)",
    plans: [
      {
        title: "Silver",
        subtitle: "",
        price: "₹5,000",
        whatsappMessage:
          "Hi, I’m interested in Social Media Management (Silver). Please share details.",
        items: ["8 Graphics", "2 Reels"],
      },
      {
        title: "Gold",
        subtitle: "",
        price: "₹7,000",
        badge: "Best Value",
        whatsappMessage:
          "Hi, I’m interested in Social Media Management (Gold). Please share details.",
        items: ["12 Graphics", "4 Reels"],
      },
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="pricing-section" id="pricing">
      <h2 className="pricing-title">
        📦 <span className="neon-text">PACKAGES</span>
      </h2>

      {packages.map((group, gi) => (
        <div key={gi} className="package-group">
          <h3 className="package-heading">{group.groupTitle}</h3>
          {group.note && <p className="package-note">{group.note}</p>}

          <div className="pricing-grid pricing-grid-2">
            {group.plans.map((plan, i) => (
              <div
                key={i}
                className={`pricing-card ${plan.badge ? "featured" : ""}`}
              >
                {plan.badge && <div className="pricing-badge">{plan.badge}</div>}

                <div className="card-inner">
                  <div className="plan-top">
                    <h4 className={`plan-title ${plan.title.toLowerCase()}-title`}>{plan.title}</h4>
                    {plan.subtitle ? (
                      <p className="plan-subtitle">{plan.subtitle}</p>
                    ) : null}
                  </div>

                  <div className="plan-price">{plan.price}</div>

                  <ul className="plan-list">
                    {plan.items.map((item, idx) => (
                      <li key={idx} className="ok">
                        ✔ {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    className="plan-btn"
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
            ))}
          </div>
        </div>
      ))}

      <p className="custom-note">
        👉 <span className="neon-text">Custom plans available</span> for brands
        that want more.
      </p>
    </section>
  );
}
