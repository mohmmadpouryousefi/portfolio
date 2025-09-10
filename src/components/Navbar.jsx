import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../styles/navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuRef = useRef(null);
  const overlayRef = useRef(null);

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Update navbar background
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Detect active section
      const sections = ["hero", "about", "skills", "projects", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementHeight = rect.height;
          return (
            scrollPosition >= elementTop &&
            scrollPosition < elementTop + elementHeight
          );
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced mobile menu toggle with GSAP animations
  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);

    if (newState) {
      // Opening animation
      gsap.set(menuRef.current, { display: "flex" });
      gsap.set(overlayRef.current, { display: "block" });

      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
        .to(
          menuRef.current,
          {
            x: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.1"
        )
        .to(
          ".mobile-menu-item",
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.2"
        );
    } else {
      // Closing animation
      const tl = gsap.timeline();
      tl.to(".mobile-menu-item", {
        opacity: 0,
        y: -20,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in",
      })
        .to(
          menuRef.current,
          {
            x: "100%",
            duration: 0.3,
            ease: "power3.in",
          },
          "-=0.1"
        )
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          },
          "-=0.2"
        )
        .set([menuRef.current, overlayRef.current], {
          display: "none",
        });
    }
  };

  // Close menu when clicking a link or overlay
  const closeMenu = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

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
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link to="/" className="logo-link">
              <span className="logo-text">Mohammad</span>
              <span className="logo-accent">Dev</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-links-container desktop-nav">
            <ul className="navbar-links">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => scrollToSection("hero", e)}
                  className={activeSection === "hero" ? "active" : ""}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection("about", e)}
                  className={activeSection === "about" ? "active" : ""}
                >
                  About
                </a>
              </li>
              <li>
                <Link to="/blog" onClick={closeMenu} className="nav-link">
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="#skills"
                  onClick={(e) => scrollToSection("skills", e)}
                  className={activeSection === "skills" ? "active" : ""}
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection("projects", e)}
                  className={activeSection === "projects" ? "active" : ""}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection("contact", e)}
                  className={activeSection === "contact" ? "active" : ""}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="navbar-mobile-toggle" onClick={toggleMenu}>
            <div className={`hamburger ${isMenuOpen ? "active" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className="mobile-menu-overlay"
        onClick={closeMenu}
        style={{ display: "none", opacity: 0 }}
      ></div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="mobile-menu"
        style={{ display: "none", transform: "translateX(100%)" }}
      >
        <div className="mobile-menu-header">
          <div className="mobile-logo">
            <span className="logo-text">Mohammad</span>
            <span className="logo-accent">Dev</span>
          </div>
          <button className="close-menu-btn" onClick={closeMenu}>
            <FaTimes />
          </button>
        </div>

        <nav className="mobile-menu-nav">
          <ul className="mobile-menu-list">
            <li className="mobile-menu-item">
              <a
                href="#hero"
                onClick={(e) => scrollToSection("hero", e)}
                className={activeSection === "hero" ? "active" : ""}
              >
                <span className="menu-icon">🏠</span>
                <span className="menu-text">Home</span>
              </a>
            </li>
            <li className="mobile-menu-item">
              <a
                href="#about"
                onClick={(e) => scrollToSection("about", e)}
                className={activeSection === "about" ? "active" : ""}
              >
                <span className="menu-icon">👨‍💻</span>
                <span className="menu-text">About</span>
              </a>
            </li>
            <li className="mobile-menu-item">
              <Link to="/blog" onClick={closeMenu} className="nav-link">
                <span className="menu-icon">📝</span>
                <span className="menu-text">Blog</span>
              </Link>
            </li>
            <li className="mobile-menu-item">
              <a
                href="#skills"
                onClick={(e) => scrollToSection("skills", e)}
                className={activeSection === "skills" ? "active" : ""}
              >
                <span className="menu-icon">⚡</span>
                <span className="menu-text">Skills</span>
              </a>
            </li>
            <li className="mobile-menu-item">
              <a
                href="#projects"
                onClick={(e) => scrollToSection("projects", e)}
                className={activeSection === "projects" ? "active" : ""}
              >
                <span className="menu-icon">🚀</span>
                <span className="menu-text">Projects</span>
              </a>
            </li>
            <li className="mobile-menu-item">
              <a
                href="#contact"
                onClick={(e) => scrollToSection("contact", e)}
                className={activeSection === "contact" ? "active" : ""}
              >
                <span className="menu-icon">📧</span>
                <span className="menu-text">Contact</span>
              </a>
            </li>
          </ul>

          <div className="mobile-menu-footer">
            <div className="social-links">
              <a
                href="https://github.com/mohmmadpouryousefi"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                GitHub
              </a>
              <a
                href="mailto:mohammadpouryousefi@gmail.com"
                className="social-link"
              >
                Email
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
