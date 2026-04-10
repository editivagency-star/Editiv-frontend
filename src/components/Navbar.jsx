import { useEffect, useState } from "react";
import "../styles/navbar.css";
import { FiBriefcase, FiBarChart2, FiGrid, FiMail, FiMenu, FiX } from "react-icons/fi";
import { LuIndianRupee } from "react-icons/lu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false); // Close menu on click
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-glass" : ""}`}>
      <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <img src="/Editiv.png" alt="EditIV Logo" />
      </div>

      {/* Hamburger Icon (Mobile Only) */}
      <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <FiX /> : <FiMenu />}
      </div>

      <ul className={`nav-links ${mobileMenuOpen ? "nav-active" : ""}`}>
        <li onClick={() => scrollTo("portfolio")}><FiBriefcase /> Portfolio</li>
        <li onClick={() => scrollTo("results")}><FiBarChart2 /> Results</li>
        <li onClick={() => scrollTo("services")}><FiGrid /> Services</li>
        <li onClick={() => scrollTo("pricing")}><LuIndianRupee /> Pricing</li>
        <li onClick={() => scrollTo("contact")}><FiMail /> Contact</li>
      </ul>
    </nav>
  );
}
