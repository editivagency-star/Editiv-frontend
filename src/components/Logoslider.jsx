import "../styles/logoslider.css";

const logos = [
  { src: "/logos/logo1.png" },
  { src: "/logos/logo2.jpg" },
  { src: "/logos/logo3.png" },
  { src: "/logos/logo4.png" },
  { src: "/logos/logo5.jpg" },
  { src: "/logos/logo6.jpg" },
  { src: "/logos/logo7.png" },
  { src: "/logos/logo8.png" },
  { src: "/logos/logo9.png" },
  { src: "/logos/logo10.png" },
  { src: "/logos/logo11.png" },
  { src: "/logos/logo12.png" },
  { src: "/logos/logo13.jpg" },
  { src: "/logos/logo14.png" },
  { src: "/logos/logo15.png", large: true },
  { src: "/logos/logo16.png", large: true },
  { src: "/logos/logo17.png", large: true },
  { src: "/logos/logo18.jpeg" },
  { src: "/logos/logo19.jpeg" },
  { src: "/logos/logo20.webp" },
];

export default function LogoSlider() {
  return (
    <section className="logo-wrapper">
      <h2>
        Brands That <span className="neon-text">Trust Us</span>
      </h2>

      <div className="logo-slider">
        <div className="logo-track">
          {[...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt="brand"
              className={logo.large ? "logo-lg" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
