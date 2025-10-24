import React, { useState } from "react";
import "../styles/projects.css";

const Projects = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const projects = [
    {
      id: 1,
      title: "🤖 Discord Assistant Bot",
      description:
        "A professional multi-platform assistant bot with advanced features and enterprise-grade architecture. Supports both Discord and Telegram platforms with weather data, QR code generation, and currency exchange.",
      longDescription:
        "Discord Assistant Bot is a sophisticated, multi-platform chatbot that operates seamlessly across Discord and Telegram platforms. Built with modern Node.js architecture, it features enterprise-grade logging, centralized configuration management, and an extensible command system.",
      image: "/api/placeholder/400/250",
      videoUrl: "/videos/DiscordAssistantBot.mp4", // Replace with actual video URL
      technologies: [
        "Node.js",
        "Discord.js",
        "Telegram API",
        "Winston",
        "WeatherAPI",
        "MongoDB",
      ],
      features: [
        "🎮 Dual Platform Support (Discord & Telegram)",
        "🌤️ Real-time Weather Data",
        "📱 QR Code Generation",
        "🔧 Professional Logging System",
        "⚙️ Centralized Configuration",
        "🎛️ Interactive Menus",
        "🔒 Enterprise-grade Architecture",
      ],
      githubUrl: "https://github.com/mohmmadpouryousefi/Discord-Assistant-Bot",
      liveUrl: null,
      category: "Bot Development",
    },
    {
      id: 2,
      title: "🚀 Portfolio Website",
      description:
        "A modern, responsive portfolio website showcasing cutting-edge web development skills with stunning GSAP animations and professional design.",
      longDescription:
        "This portfolio website demonstrates modern web development practices with React 18, GSAP animations, responsive design, and professional UI/UX. Features include typewriter animations, smooth scrolling navigation, and mobile-first design.",
      image: "/api/placeholder/400/250",
      videoUrl: "/videos/portfolio.mp4", // Local video file
      technologies: [
        "React 18",
        "GSAP",
        "Tailwind CSS",
        "Vite",
        "Node.js",
        "Express",
      ],
      features: [
        "✨ GSAP-Powered Animations",
        "📱 Mobile-First Responsive Design",
        "🎨 Glass Morphism Effects",
        "🧭 Smooth Scroll Navigation",
        "⚡ Performance Optimized",
        "🎯 Modern UI Components",
      ],
      githubUrl: "https://github.com/mohmmadpouryousefi/portfolio",
      liveUrl: "https://portfolio-1z8.pages.dev",
      category: "Web Development",
    },
    {
      id: 3,
      title: "📊 CharteaseHub - Excel to Charts Tool",
      description:
        "A Next.js web application that converts Excel/CSV files into interactive, customizable charts with one-click downloads. Features Google Analytics integration, SEO optimization, and professional data visualization.",
      longDescription:
        "CharteaseHub is a comprehensive data visualization tool built with Next.js 15 that transforms Excel and CSV files into beautiful, interactive charts. The application includes advanced features like data preview, multiple chart types (bar, line, pie), PNG/PDF export capabilities, and is fully optimized for SEO with Google Search Console and Analytics 4 integration.",
      image: "/api/placeholder/400/250",
      videoUrl: null,
      technologies: [
        "Next.js 15",
        "TypeScript",
        "Recharts",
        "SheetJS",
        "Tailwind CSS",
        "Google Analytics",
      ],
      features: [
        "� Excel/CSV to Interactive Charts Conversion",
        "� Multiple Chart Types (Bar, Line, Pie, Area)",
        "� PNG/PDF Export Functionality",
        "🎨 Advanced Chart Customization",
        "� SEO Optimized with Google Analytics",
        "� Fully Responsive Design",
        "⚡ Performance Monitoring with Speed Insights",
      ],
      githubUrl: "https://github.com/mohmmadpouryousefi/charteasehub",
      liveUrl: "https://charteasehub.com",
      category: "Data Visualization",
    },
  ];

  const openVideoModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section id="projects" className="projects">
      <div className="projects-content">
        <div className="projects-header">
          <h1 className="projects-title">🚀 My Projects</h1>
          <p className="projects-subtitle">
            A showcase of my technical expertise and creative solutions
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-container">
                {project.videoUrl && project.videoUrl.includes(".mp4") ? (
                  <video
                    src={project.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="project-video-preview"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                )}
              </div>

              <div className="project-content">
                <div className="project-category">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-features">
                  <h4>✨ Key Features:</h4>
                  <ul>
                    {project.features.slice(0, 3).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link github-link"
                    >
                      <span>📁</span> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link live-link"
                    >
                      <span>🌐</span> Live Demo
                    </a>
                  )}
                  {project.videoUrl && (
                    <button
                      className="project-link video-link"
                      onClick={() => openVideoModal(project.videoUrl)}
                    >
                      <span>🎥</span> Video Demo
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="video-modal-overlay" onClick={closeVideoModal}>
            <div className="video-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal-btn" onClick={closeVideoModal}>
                ✕
              </button>
              <div className="video-container">
                {selectedVideo && selectedVideo.includes(".mp4") ? (
                  <video
                    src={selectedVideo}
                    controls
                    autoPlay
                    loop
                    muted
                    className="video-player"
                    style={{ width: "100%", height: "100%" }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    src={selectedVideo}
                    title="Project Video Preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="projects-footer">
          <p className="more-projects-text">
            🚀 More exciting projects coming soon! Stay tuned for updates.
          </p>
          <div className="contact-cta">
            <p>Have a project in mind?</p>
            <a href="#contact" className="cta-button">
              Let's Work Together
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
