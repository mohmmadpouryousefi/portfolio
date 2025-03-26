import React from "react";
import "../styles/footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h3>MohammadDev</h3>
          <p>Web Developer specializing in modern web experiences</p>
        </div>

        <div className="footer-links">
          <h4>Links</h4>
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <div className="social-icons">
            <a
              href="mailto:mohammadpouryousefi@gmail.com"
              title="Email Me"
              aria-label="Send email"
            >
              <FaEnvelope className="social-icon" />
            </a>
            <a
              href="https://github.com/mohmmadpouryousefi"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <FaGithub className="social-icon" />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} MohammadDev. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
