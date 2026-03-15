import "../styles/instagram.css";

export default function InstagramSection() {
  return (
    <section className="insta-section" id="reels">
      {/* LEFT STACKED REEL CARD */}
      <div
        className="insta-preview"
        onClick={() =>
          window.open(
            "https://www.instagram.com/editiv_agency?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
            "_blank"
          )
        }
        role="button"
        aria-label="Open Instagram Page"
      >
        <div className="insta-layer back"></div>
        <div className="insta-layer mid"></div>

        <div className="insta-layer front">
          <img src="/editiv-reel.jpg?v=1" alt="Editiv Instagram Page" />
          <div className="play-btn">▶</div>
        </div>
      </div>

      {/* RIGHT TEXT CONTENT */}
      <div className="insta-content">
        <span className="insta-kicker">🎥 REELS / WORK SHOWCASE</span>

        <h2 className="insta-title">
          See <span className="insta-neon">Creativity</span> in Motion
        </h2>

        <p className="insta-desc">
          Our Instagram reels are more than content — they’re proof of work.
          Explore our edits, designs, and campaigns that bring brands to life.
        </p>

        <p className="insta-hook">
          <span>Watch</span> <span className="dot">•</span>
          <span>Engage</span> <span className="dot">•</span>
          <span>Get Inspired</span>
        </p>

        <button
          className="insta-btn"
          onClick={() =>
            window.open(
              "https://www.instagram.com/editiv_agency?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            )
          }
        >
          Explore Reels <span className="arrow">→</span>
        </button>
      </div>
    </section>
  );
}
