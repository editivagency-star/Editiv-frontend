import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LogoSlider from "../components/Logoslider";
import Stats from "../components/Stats";
import Results from "../components/Results";
import InstagramSection from "../components/InstagramSection";
import GuaranteeStrip from "../components/GuaranteeStrip";

import PricingSection from "../components/PricingSection";
import PortfolioGallery from "../components/PortfolioGallery";
import ServiceSection from "../components/ServiceSection";
import Testimonials from "../components/Testimonials";
import FounderSection from "../components/FounderSection";
import "../styles/hero.css";
import { FaWhatsapp } from "react-icons/fa";
import About from "../components/About";
import Services from "../components/Services";
import ScrollReveal from "../components/ScrollAnimations";


export default function Home() {
  return (
    <>
      <Navbar />

      <section>
        <Hero />
      </section>

      <LogoSlider />

      <hr className="section-divider" />

      <About />

      <hr className="section-divider" />

      <Services />

      <hr className="section-divider" />

      <ScrollReveal animation="fade-up">
        <Stats />
      </ScrollReveal>

      <hr className="section-divider" />

      <section id="results">
        <Results />
      </section>

      <ScrollReveal animation="fade-up">
        <InstagramSection />
      </ScrollReveal>


      <hr className="section-divider" />

      <section id="pricing">
        <ScrollReveal animation="fade-up">
          <PricingSection />
        </ScrollReveal>
      </section>

      <hr className="section-divider" />

      <section id="portfolio">
        <ScrollReveal animation="fade-up">
          <PortfolioGallery />
        </ScrollReveal>
      </section>

      <hr className="section-divider" />

      <section id="services">
        <ScrollReveal animation="fade-up">
          <ServiceSection />
        </ScrollReveal>
      </section>

      <ScrollReveal animation="fade-up">
        <Testimonials />
      </ScrollReveal>

      <hr className="section-divider" />

      <section id="contact">
        <ScrollReveal animation="fade-up">
          <FounderSection />
        </ScrollReveal>
      </section>

      <a
        href="https://wa.me/919436452223?text=Hi%20I%20want%20to%20book%20a%20call"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="whatsapp-icon" />
      </a>
    </>
  );
}
