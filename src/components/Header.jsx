import React from "react";
import { FaLinkedin, FaGithub, FaTelegram, FaWhatsapp } from "react-icons/fa";
import "../styles/header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="#FaLinkedin">
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a href="#FaGithub">
              <FaGithub />
            </a>
          </li>
          <li>
            <a href="#FaTelegram">
              <FaTelegram />
            </a>
          </li>
          <li>
            <a href="#FaWhatsapp">
              <FaWhatsapp />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
