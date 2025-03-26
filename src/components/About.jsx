import React, { useEffect } from "react";
import "../styles/about.css";
import { FaCode, FaServer, FaDatabase, FaCloud } from "react-icons/fa";

const About = () => {
  useEffect(() => {
    // Function to handle animations on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate");

      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight - 100) {
          element.classList.add("animated");
        }
      });
    };

    // Initial check for elements in viewport
    animateOnScroll();

    // Add scroll event listener
    window.addEventListener("scroll", animateOnScroll);

    // Clean up
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  return (
    <section id="about" className="about">
      <div className="about-content">
        <h1 className="animate fade-down">About Me</h1>

        <div className="bio-section animate fade-in">
          {/*   <div className="profile-image">
            <img src="/path-to-your-image.jpg" alt="Your Name" />
          </div> */}

          <div className="bio-text">
            <h2 className="animate fade-in delay-200">Full Stack Developer</h2>
            <div className="intro-text-container">
              <p className="intro-text animate fade-in delay-400">
                I am a Full Stack Developer with 5+ years of experience,
                specializing in building responsive, user-friendly web
                applications. I take pride in creating clean, efficient code
                that delivers exceptional user experiences.
              </p>
            </div>
          </div>
        </div>

        <div className="expertise-section">
          <h3 className="animate fade-in">My Expertise</h3>
          <div className="expertise-grid">
            <div className="expertise-card animate slide-up delay-100">
              <FaCode className="expertise-icon animated-icon" />
              <h4>Frontend Development</h4>
              <p>
                Creating responsive UIs with React.js, Next.js, and modern CSS
                frameworks including Tailwind, Material UI, and Chakra UI.
              </p>
            </div>

            <div className="expertise-card animate slide-up delay-200">
              <FaServer className="expertise-icon animated-icon" />
              <h4>Backend Development</h4>
              <p>
                Building robust server-side applications with Node.js, Express,
                and Nest.js. Implementing RESTful APIs and GraphQL services.
              </p>
            </div>

            <div className="expertise-card animate slide-up delay-300">
              <FaDatabase className="expertise-icon animated-icon" />
              <h4>Database Design</h4>
              <p>
                Working with both SQL (MySQL, PostgreSQL) and NoSQL (MongoDB)
                databases to create efficient data storage solutions.
              </p>
            </div>

            <div className="expertise-card animate slide-up delay-400">
              <FaCloud className="expertise-icon animated-icon" />
              <h4>Cloud Services</h4>
              <p>
                Deploying applications to AWS, Azure, and Google Cloud Platform.
                Experience with containerization using Docker.
              </p>
            </div>
          </div>
        </div>

        <div className="work-approach animate fade-in delay-100">
          <h3>My Approach</h3>
          <p>
            I combine technical expertise with a collaborative mindset,
            delivering solutions that meet business objectives while providing
            exceptional user experiences. I thrive in agile environments and am
            committed to continuous learning and improvement.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
