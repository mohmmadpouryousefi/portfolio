import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../styles/navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking a link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Smooth scroll to section function
  const scrollToSection = (sectionId, event) => {
    event.preventDefault();
    closeMenu();

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: targetSection,
          offsetY: 80, // Account for navbar height
        },
        ease: "power2.inOut",
      });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-content">
        <div className="navbar-logo">
          <Link to="/">MohammadDev</Link>
        </div>

        <div className="navbar-links-container">
          <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
            <li>
              <a href="#hero" onClick={(e) => scrollToSection("hero", e)}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => scrollToSection("about", e)}>
                About
              </a>
            </li>
            <li>
              <Link to="/blog" onClick={closeMenu}>
                Blog
              </Link>
            </li>
            <li>
              <a href="#skills" onClick={(e) => scrollToSection("skills", e)}>
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => scrollToSection("projects", e)}
              >
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => scrollToSection("contact", e)}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="navbar-mobile-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
