import React, { useEffect, useState } from "react";
import "../styles/hero.css";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);
  }, []);

  // Function to scroll to next section
  const scrollToNextSection = () => {
    const nextSection =
      document.querySelector(".about") ||
      document.querySelector(".projects") ||
      document.querySelector("section:nth-of-type(2)");

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="hero">
      <div className={`hero-background ${isLoaded ? "active" : ""}`}>
        <div className="animated-shape shape1"></div>
        <div className="animated-shape shape2"></div>
        <div className="animated-shape shape3"></div>
      </div>

      <div className="hero-content">
        <div className="content-container">
          <div className="left-column">
            <div className={`hero-greeting ${isLoaded ? "active" : ""}`}>
              <span>Welcome, I am</span>
            </div>

            <div className="name-wrapper">
              <h1 className={`hero-name ${isLoaded ? "active" : ""}`}>
                Mohammad
              </h1>
              <div className={`hero-role ${isLoaded ? "active" : ""}`}>
                Web Developer
              </div>
            </div>

            <div className={`hero-tagline ${isLoaded ? "active" : ""}`}>
              <p>
                Crafting modern web experiences with cutting-edge technologies
              </p>
            </div>

            <div
              className={`scroll-indicator ${isLoaded ? "active" : ""}`}
              onClick={scrollToNextSection}
            >
              <div className="mouse">
                <div className="wheel"></div>
              </div>
              <div className="scroll-text">Scroll Down</div>
            </div>
          </div>

          <div className="right-column">
            <div className={`hero-cta ${isLoaded ? "active" : ""}`}>
              <a
                href="https://github.com/mohmmadpouryousefi"
                className="primary-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                View My Work
                <span className="btn-arrow">→</span>
              </a>
              <a
                href="mailto:mohammadpouryousefi@gmail.com"
                className="secondary-btn"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
