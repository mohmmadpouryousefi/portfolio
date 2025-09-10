import React from "react";
import "../styles/projects.css";

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="projects-content">
        <h1>My Projects</h1>
        <p>Coming soon! This section will showcase my portfolio projects.</p>
        
        <div className="projects-grid">
          <div className="project-card">
            <h3>Portfolio Website</h3>
            <p>A modern, responsive portfolio built with React.js, GSAP animations, and modern web technologies.</p>
            <div className="project-tech">
              <span>React</span>
              <span>GSAP</span>
              <span>Tailwind CSS</span>
              <span>Node.js</span>
            </div>
          </div>
          
          <div className="project-card">
            <h3>More Projects Coming Soon</h3>
            <p>I'm constantly working on new projects. Check back soon for updates!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
