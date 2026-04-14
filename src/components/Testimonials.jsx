import "../styles/testimonials.css";

export default function Testimonials() {

  const data = [
    {
      img: "/logos/logo16.png",
      text: "We partnered with EditIV to create a new social media presence. Their strategy and execution were flawless from start to finish.",
      name: "Varun Ganjoo",
      role: "Founder, Poker Baazi"
    },
    {
      img: "/logos/logo18.jpeg",
      text: "EditIV helped us scale content with incredible creativity and consistency. The engagement results were beyond expectations.",
      name: "Ramakrishna NK",
      role: "Founder, Rang De"
    },
    {
      img: "/logos/logo10.png",
      text: "Working with EditIV was a game changer. Their production quality and growth strategies delivered massive results.",
      name: "Shivani Muthanna",
      role: "Digital Content Head, Fisdom"
    }
  ];

  return (
    <section className="testimonials-section">

      <h2 className="testimonials-title">
        Hear from our <span>Happy Clients</span>
      </h2>

      <div className="testimonial-grid">

        {data.map((item, i) => (

          <div className="testimonial-card-wrap" key={i}>

            <div className="testimonial-glow"></div>

            <div className="testimonial-card">

              <img src={item.img} className="client-img" />

              <div className="quote">//</div>

              <div className="testimonial-text">
                {item.text}
              </div>

              <div className="divider"></div>

              <h4>{item.name}</h4>
              <p>{item.role}</p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}
