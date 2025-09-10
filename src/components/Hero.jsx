import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../styles/hero.css";

gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const letterRefs = useRef([]);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    // Set initial state for letters
    gsap.set(".staggerbox", {
      y: 100,
      opacity: 0,
      rotationX: -90,
      transformOrigin: "center bottom",
    });

    // Set initial state for other elements
    gsap.set(
      [".hero-greeting", ".hero-role", ".hero-cta", ".scroll-indicator"],
      {
        y: 50,
        opacity: 0,
      }
    );

    // Special setup for tagline typewriter effect
    gsap.set(".hero-tagline", {
      y: 30,
      opacity: 0,
    });

    // Split tagline text into characters for animation
    const taglineText =
      "Crafting modern web experiences with cutting-edge technologies";
    const taglineContainer = document.querySelector(".tagline-text");
    if (taglineContainer) {
      taglineContainer.innerHTML = "";
      taglineText.split("").forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char; // Non-breaking space
        span.className = "tagline-char";
        span.style.opacity = "0";
        taglineContainer.appendChild(span);
      });
    }

    gsap.set([".animated-shape"], {
      scale: 0,
      rotation: 0,
    });

    // Create timeline for coordinated animations
    const tl = gsap.timeline();

    // Animate background shapes first
    tl.to(".animated-shape", {
      scale: 1,
      rotation: 360,
      duration: 1.5,
      stagger: 0.2,
      ease: "back.out(1.7)",
    })

      // Animate name letters with stagger effect
      .to(
        ".staggerbox",
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=1"
      )

      // Animate other content
      .to(
        ".hero-greeting",
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5"
      )

      .to(
        ".hero-role",
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )

      .to(
        ".hero-tagline",
        {
          y: 0,
          opacity: 2,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      )

      // Typewriter effect for tagline text
      .to(
        ".tagline-char",
        {
          opacity: 1,
          duration: 0.03,
          stagger: 0.02,
          ease: "power1.inOut",
        },
        "-=0.2"
      )

      // Add a subtle glow effect after typewriter completes
      .to(
        ".tagline-text",
        {
          textShadow: "0 0 20px rgba(242, 155, 85, 0.3)",
          duration: 0.8,
          ease: "power2.out",
        },
        "+=0.2"
      )

      // Fade out cursor after typing completes
      .to(
        ".tagline-cursor",
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "+=1.5"
      )

      .to(
        ".hero-cta",
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )

      .to(
        ".scroll-indicator",
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // Add continuous floating animation for shapes
    gsap.to(".shape1", {
      y: -20,
      x: 10,
      rotation: 180,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".shape2", {
      y: 15,
      x: -15,
      rotation: -180,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".shape3", {
      y: -10,
      x: 20,
      rotation: 270,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Cleanup function
    return () => {
      tl.kill();
      gsap.killTweensOf([
        ".staggerbox",
        ".animated-shape",
        ".hero-greeting",
        ".hero-role",
        ".hero-tagline",
        ".hero-cta",
        ".scroll-indicator",
      ]);
    };
  }, []);

  // React event handlers for hover effects
  const handleLetterMouseEnter = (index) => {
    if (letterRefs.current[index]) {
      gsap.to(letterRefs.current[index], {
        scale: 1.3,
        rotation: 10,
        color: "#F29B55",
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleLetterMouseLeave = (index) => {
    if (letterRefs.current[index]) {
      gsap.to(letterRefs.current[index], {
        scale: 1,
        rotation: 0,
        color: "inherit",
        duration: 0.3,
        ease: "back.out(1.4)",
      });
    }
  };

  // Function to scroll to next section with GSAP smooth scroll
  const scrollToNextSection = () => {
    // Use element with ID for better React integration
    const aboutSection =
      document.getElementById("about") ||
      document.getElementById("skills") ||
      document.getElementById("projects");

    if (aboutSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: aboutSection,
          offsetY: 0,
        },
        ease: "power2.inOut",
      });
    }
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="animated-shape shape1"></div>
        <div className="animated-shape shape2"></div>
        <div className="animated-shape shape3"></div>
      </div>

      <div className="hero-content">
        <div className="content-container">
          <div className="left-column">
            <div className="hero-greeting">
              <span>Welcome, I am</span>
            </div>

            <div className="name-wrapper">
              <h1 className="hero-name" ref={nameRef}>
                {["M", "o", "h", "a", "m", "m", "a", "d"].map(
                  (letter, index) => (
                    <div
                      key={index}
                      ref={(el) => (letterRefs.current[index] = el)}
                      className="staggerbox"
                      onMouseEnter={() => handleLetterMouseEnter(index)}
                      onMouseLeave={() => handleLetterMouseLeave(index)}
                    >
                      {letter}
                    </div>
                  )
                )}
              </h1>
              <div className="hero-role">Web Developer</div>
            </div>

            <div className="hero-tagline">
              <p>
                <span className="tagline-text"></span>
                <span className="tagline-cursor">|</span>
              </p>
            </div>

            <div className="scroll-indicator" onClick={scrollToNextSection}>
              <div className="mouse">
                <div className="wheel"></div>
              </div>
              <div className="scroll-text">Scroll Down</div>
            </div>
          </div>

          <div className="right-column">
            <div className="hero-cta">
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
