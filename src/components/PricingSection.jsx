import "../styles/pricing.css";


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

          <div className={`pricing-grid ${group.gridClass}`}>
            {group.plans.map((plan, i) => (
              <div key={i} className={`pricing-card-wrap ${plan.isDiamond ? "diamond-wrap" : ""}`}>
                {plan.badge && <div className={`pricing-badge ${plan.isDiamond ? "diamond-badge" : ""}`}>{plan.badge}</div>}

                <div className={`pricing-card ${plan.badge ? "featured" : ""} ${plan.isDiamond ? "diamond-card" : `${plan.title.toLowerCase()}-card`}`}>
                  <div className="card-inner">
                    <div className="plan-top">
                      <h4 className={`plan-title ${plan.title.toLowerCase()}-title`}>{plan.title}</h4>
                      {plan.subtitle ? (
                        <p className="plan-subtitle">{plan.subtitle}</p>
                      ) : null}
                    </div>

                    <div className={`plan-price ${plan.isDiamond ? "diamond-price" : ""}`}>{plan.price}</div>

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
