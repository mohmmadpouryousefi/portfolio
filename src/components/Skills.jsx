import React from "react";
import "../styles/skills.css";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaAws,
  FaMicrosoft,
  FaCloud,
} from "react-icons/fa";
import {
  SiTypescript,
  SiPhp,
  SiNextdotjs,
  SiExpress,
  SiRedux,
  SiTailwindcss,
  SiMui,
  SiChakraui,
  SiAntdesign,
  SiMongodb,
  SiPostgresql,
  SiMysql,
} from "react-icons/si";

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <div className="skills-content">
        <h1>Technical Skills</h1>

        <div className="skills-grid">
          {/* Programming Languages */}
          <div className="skills-category-card">
            <h3>Programming Languages</h3>
            <div className="skill-items">
              <div className="skill-item">
                <FaJs className="skill-icon js-icon" />
                <div>
                  <h4>JavaScript</h4>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="skill-item">
                <SiTypescript className="skill-icon ts-icon" />
                <div>
                  <h4>TypeScript</h4>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="skill-item">
                <SiPhp className="skill-icon php-icon" />
                <div>
                  <h4>PHP</h4>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="skill-item">
                <FaHtml5 className="skill-icon html-icon" />
                <div>
                  <h4>HTML5</h4>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="skill-item">
                <FaCss3Alt className="skill-icon css-icon" />
                <div>
                  <h4>CSS3</h4>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frontend Frameworks */}
          <div className="skills-category-card">
            <h3>Frontend Frameworks & Libraries</h3>
            <div className="skill-items">
              <div className="skill-item">
                <FaReact className="skill-icon react-icon" />
                <div>
                  <h4>React.js</h4>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="skill-item">
                <SiRedux className="skill-icon redux-icon" />
                <div>
                  <h4>Redux</h4>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="skill-item">
                <SiNextdotjs className="skill-icon next-icon" />
                <div>
                  <h4>Next.js</h4>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: "88%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CSS Frameworks */}
          <div className="skills-category-card">
            <h3>CSS Frameworks & Styling</h3>
            <div className="skills-badges">
              <span className="skill-badge">
                <SiTailwindcss /> Tailwind CSS
              </span>
              <span className="skill-badge">
                <SiMui /> Material UI
              </span>
              <span className="skill-badge">
                <SiChakraui /> Chakra UI
              </span>
              <span className="skill-badge">
                <SiAntdesign /> Ant Design
              </span>
              <span className="skill-badge">SASS</span>
              <span className="skill-badge">LESS</span>
              <span className="skill-badge">Bootstrap</span>
            </div>
          </div>

          {/* Backend Technologies */}
          <div className="skills-category-card">
            <h3>Backend Technologies</h3>
            <div className="skill-items">
              <div className="skill-item">
                <FaNodeJs className="skill-icon node-icon" />
                <div>
                  <h4>Node.js</h4>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="skill-item">
                <SiExpress className="skill-icon express-icon" />
                <div>
                  <h4>Express</h4>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="skills-badges backend-badges">
                <span className="skill-badge">Nest.js</span>
                <span className="skill-badge">RESTful APIs</span>
                <span className="skill-badge">GraphQL</span>
                <span className="skill-badge">Web Sockets</span>
              </div>
            </div>
          </div>

          {/* Databases */}
          <div className="skills-category-card">
            <h3>Databases</h3>
            <div className="skill-items">
              <div className="database-icons">
                <div className="db-icon-container">
                  <SiMysql className="db-icon" />
                  <span>MySQL</span>
                </div>
                <div className="db-icon-container">
                  <SiPostgresql className="db-icon" />
                  <span>PostgreSQL</span>
                </div>
                <div className="db-icon-container">
                  <SiMongodb className="db-icon" />
                  <span>MongoDB</span>
                </div>
              </div>
            </div>
          </div>

          {/* DevOps & Cloud */}
          <div className="skills-category-card">
            <h3>DevOps & Cloud Services</h3>
            <div className="skill-items">
              <div className="cloud-container">
                <div className="cloud-item">
                  <FaAws className="cloud-icon" />
                  <span>AWS</span>
                </div>
                <div className="cloud-item">
                  <FaMicrosoft className="cloud-icon" />
                  <span>Azure</span>
                </div>
                <div className="cloud-item">
                  <FaCloud className="cloud-icon" />
                  <span>GCP</span>
                </div>
              </div>

              <div className="skills-badges devops-badges">
                <span className="skill-badge">
                  <FaDocker /> Docker
                </span>
                <span className="skill-badge">
                  <FaGitAlt /> Git
                </span>
                <span className="skill-badge">GitHub</span>
                <span className="skill-badge">GitLab</span>
                <span className="skill-badge">Bitbucket</span>
              </div>
            </div>
          </div>

          {/* Testing & Project Management */}
          <div className="skills-category-card">
            <h3>Testing & Project Management</h3>
            <div className="skills-badges">
              <span className="skill-badge">Jest</span>
              <span className="skill-badge">Cypress</span>
              <span className="skill-badge">Selenium</span>
              <span className="skill-badge">Chai</span>
              <span className="skill-badge">JIRA</span>
              <span className="skill-badge">Trello</span>
              <span className="skill-badge">Asana</span>
              <span className="skill-badge">Scrum</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
