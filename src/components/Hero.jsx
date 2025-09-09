import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../styles/hero.css";

gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    // Set initial state for letters
    gsap.set(".staggerbox", { 
      y: 100, 
      opacity: 0, 
      rotationX: -90,
      transformOrigin: "center bottom"
    });

    // Set initial state for other elements
    gsap.set([".hero-greeting", ".hero-role", ".hero-tagline", ".hero-cta", ".scroll-indicator"], {
      y: 50,
      opacity: 0
    });

    gsap.set([".animated-shape"], {
      scale: 0,
      rotation: 0
    });

    // Create timeline for coordinated animations
    const tl = gsap.timeline({
      onComplete: () => setIsLoaded(true)
    });

    // Animate background shapes first
    tl.to(".animated-shape", {
      scale: 1,
      rotation: 360,
      duration: 1.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    })
    
    // Animate name letters with stagger effect
    .to(".staggerbox", {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=1")
    
    // Animate other content
    .to(".hero-greeting", { 
      y: 0, 
      opacity: 1, 
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.5")
    
    .to(".hero-role", { 
      y: 0, 
      opacity: 1, 
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    
    .to(".hero-tagline", { 
      y: 0, 
      opacity: 1, 
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    
    .to(".hero-cta", { 
      y: 0, 
      opacity: 1, 
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    
    .to(".scroll-indicator", { 
      y: 0, 
      opacity: 1, 
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");

    // Add continuous floating animation for shapes
    gsap.to(".shape1", {
      y: -20,
      x: 10,
      rotation: 180,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".shape2", {
      y: 15,
      x: -15,
      rotation: -180,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".shape3", {
      y: -10,
      x: 20,
      rotation: 270,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Add hover effect for name letters
    const letters = document.querySelectorAll(".staggerbox");
    letters.forEach((letter) => {
      letter.addEventListener("mouseenter", () => {
        gsap.to(letter, {
          scale: 1.3,
          rotation: 10,
          color: "#F29B55",
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });

      letter.addEventListener("mouseleave", () => {
        gsap.to(letter, {
          scale: 1,
          rotation: 0,
          color: "inherit",
          duration: 0.3,
          ease: "back.out(1.4)"
        });
      });
    });

    // Cleanup function
    return () => {
      tl.kill();
      gsap.killTweensOf([".staggerbox", ".animated-shape", ".hero-greeting", ".hero-role", ".hero-tagline", ".hero-cta", ".scroll-indicator"]);
    };
  }, []);

  // Function to scroll to next section with GSAP smooth scroll
  const scrollToNextSection = () => {
    const nextSection =
      document.querySelector(".about") ||
      document.querySelector(".projects") ||
      document.querySelector("section:nth-of-type(2)");

    if (nextSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: nextSection,
          offsetY: 0
        },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section className="hero" ref={heroRef}>
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
                <div className="staggerbox">M</div>
                <div className="staggerbox">o</div>
                <div className="staggerbox">h</div>
                <div className="staggerbox">a</div>
                <div className="staggerbox">m</div>
                <div className="staggerbox">m</div>
                <div className="staggerbox">a</div>
                <div className="staggerbox">d</div>
              </h1>
              <div className="hero-role">
                Web Developer
              </div>
            </div>

            <div className="hero-tagline">
              <p>
                Crafting modern web experiences with cutting-edge technologies
              </p>
            </div>

            <div
              className="scroll-indicator"
              onClick={scrollToNextSection}
            >
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
