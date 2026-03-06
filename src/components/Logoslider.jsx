import "../styles/logoslider.css";

const logos = [
  "/logos/logo1.png",
  "/logos/logo2.jpg",
  "/logos/logo3.png",
  "/logos/logo4.png",
  "/logos/logo5.jpg",
  "/logos/logo6.jpg",
  "/logos/logo7.png",
  "/logos/logo8.png",
  "/logos/logo9.png",
  "/logos/logo10.png",
  "/logos/logo11.png",
  "/logos/logo12.png",
  "/logos/logo13.jpg",
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
            <img key={i} src={logo} alt="brand" />
          ))}
        </div>
      </div>
    </section>
  );
}
