import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./CSS/Home.css";
import "./CSS/Skills.css";
import "./CSS/Software.css";
import "./CSS/Project.css";
import "./CSS/Experience.css";
import "./CSS/Contact.css";
import "./CSS/Footer.css";
import {FaYoutube,FaGithub,FaEnvelope,FaPhone,FaCode,FaProjectDiagram,} from "react-icons/fa";
import {SiHtml5,SiCss3,SiJavascript,SiBootstrap,SiReact,SiJquery,SiMysql,SiPython,SiPhp,SiTailwindcss,} from "react-icons/si";
import {FaBriefcase,FaLaptopCode,FaMicrochip,FaChartBar,} from "react-icons/fa";
import profile from "./Savithri.jpg";
import { Typewriter } from "react-simple-typewriter";
import msOfficeIcon from "./icons/ms-office.png";
import figmaIcon from "./icons/figma.png";
import PowerIcon from "./icons/Power.png";
import wordpressIcon from "./icons/wordpress.png";
import AIIcon from "./icons/illustrator.png";
import PSDIcon from "./icons/photoshop.png";
import CorelIcon from "./icons/corel.png";
import CanvaIcon from "./icons/canva.png";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { sendMessage } from "./Api/message";


function App() {
  const skills = [
    { name: "HTML", icon: <SiHtml5 />, level: 95 },
    { name: "CSS", icon: <SiCss3 />, level: 90 },
    { name: "JavaScript", icon: <SiJavascript />, level: 80 },
    { name: "Bootstrap", icon: <SiBootstrap />, level: 80 },
    { name: "ReactJS", icon: <SiReact />, level: 70 },
    { name: "jQuery", icon: <SiJquery />, level: 75 },
    { name: "SQL", icon: <SiMysql />, level: 65 },
    { name: "Python", icon: <SiPython />, level: 70 },
    { name: "PHP", icon: <SiPhp />, level: 70 },
    { name: "Tailwind", icon: <SiTailwindcss />, level: 80 },
  ];

const [activeSection, setActiveSection] = useState("home");
const [showScrollTop, setShowScrollTop] = useState(false);
const [form, setForm] = useState({ name: "", email: "", message: "" });
const [status, setStatus] = useState("");

const sendMessage = async (form) => {
  try {
    const response = await fetch("https://portfolio-fqog.onrender.com/contact.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(form), 
    });

    return await response.json(); // expects JSON like { success: true }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
    setStatus("Sending message...");
    console.log("Form submitted:", form); // ✅ Add this line
    const isValidEmail = /\S+@\S+\.\S+/.test(form.email);
    if (!isValidEmail) {
      toast.error("❌ Please enter a valid email address");
      return;
    } 
  const result = await sendMessage(form);

    if (result.success) {
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setStatus(""); // ✅ Clear the status message
    } else {
      toast.error("❌ " + (result.message || result.error || "Failed to send"));
      setStatus(""); // ✅ Also clear status even on failure
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const navHeight = document.querySelector(".navbar")?.offsetHeight || 60;

    const onScroll = () => {
      let current = "home";
      const scrollY = window.pageYOffset;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - navHeight - 20;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  return (
    <div className="bg-yellow-100 min-h-screen">
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark sticky-top shadow"
        style={{ backgroundColor: "#333" }}
      >
        <div className="container">
          <a className="navbar-brand fw-bold fs-2 text-warning" href="#home">
            Savithri
          </a>
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => {
               const nav = document.getElementById("navbarNav");
               nav.classList.toggle("show");
              }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul l className="navbar-nav ms-auto">
              {[
                "Home",
                "Programming Skills",
                "Software Tools",
                "Projects",
                "Experience",
                "Contact",
              ].map((name, idx) => {
                const id = name.toLowerCase().replace(/\s+/g, "");
                const isActive = activeSection === id;

                return (
                  <li className="nav-item" key={idx}>
                    <a
                      className={`nav-link ${isActive ? "active-nav" : "text-white"}`}
                      href={`#${id}`}
                      title={name}
                      onClick={() => {
                          const nav = document.getElementById("navbarNav");
                          if (nav.classList.contains("show")) {
                            nav.classList.remove("show");
                          }
                        }}
                    >
                      {name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        {/* Home Section */}
        <section id="home" className="mb-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold text-blue-900">
                <span className="text-warning display-5 fw-bold">
                  <Typewriter
                    words={["I’m Savithri", "Full Stack Developer"]}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </span>
              </h1>
              <p className="lead">
                Full-stack developer with 1 year of experience at Architanz
                Technologies and ongoing projects. Skilled in software
                development, adaptable, and backed by 2+ years in printing and
                design with strong technical detail.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-3">
                <a
                  href="./Savithri_Developer.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  // download="Savithri_Developer.pdf"
                  className="btn btn-warning px-4 py-2 rounded-pill shadow"
                  title="iew and download my resume"
                >
                  Resume
                </a>
                <a
                  href="https://youtube.com/@happycodes26?si=LB4TJ5QHbBigjpKd"
                  target="_blank"
                  rel="noreferrer"
                  className="btn px-4 py-2 rounded-pill shadow"
                  style={{ backgroundColor: "#FF0000", color: "white" }}
                  title="Visit my YouTube channel"
                >
                  <FaYoutube className="me-2" /> YouTube
                </a>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <div
                className="position-relative mt-4"
                style={{ width: "320px", height: "320px" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    border: "6px double #ffc107",
                    borderRadius: "20% 50% 30% 50% / 30% 50% 50% 40%",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  }}
                >
                  <img
                    src={profile}
                    alt="Savithri"
                    className="img-fluid w-80 h-80 object-fit-cover"
                    style={{ objectPosition: "top" }}
                    title="Savithri's profile picture"
                  />
                </div>
                <div
                  className="position-absolute top-0 start-0 translate-middle bg-dark rounded-circle"
                  style={{ width: "25px", height: "25px" }}
                ></div>
                <div
                  className="position-absolute bottom-0 end-0 translate-middle bg-warning rounded-circle"
                  style={{ width: "25px", height: "25px" }}
                ></div>
              </div>
            </div>
          </div>
        </section>
        {/* Programming Skills Section */}
        <section id="programmingskills" className="mb-5">
          <h2 className="text-center mb-4 text-3xl display-5 fw-bold text-blue-400 d-flex justify-content-center align-items-center gap-2">
            <FaCode className="me-2" /> Programming Skills
          </h2>

          <div className="skills-wrapper mt-5">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <div className="d-flex align-items-center gap-2 text-white fw-semibold">
                    <span className="skill-icon text-white">{skill.icon}</span>
                    <span>{skill.name}</span>
                  </div>
                  <span className="progress-label">{skill.level}%</span>
                </div>
                <div className="progress-container">
                  <div
                    className="progress-fill bg-warning"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Software Tools Section - Colored Tiles */}
        <section id="softwaretools">
          <h2 className="display-5 fw-bold">Software Tools</h2>
          <div className="tools-grid mt-5">
            {[
              { name: "MS Office", icon: msOfficeIcon, percent: 90 },
              { name: "Figma", icon: figmaIcon, percent: 80 },
              { name: "Power BI", icon: PowerIcon, percent: 70 },
              { name: "WordPress", icon: wordpressIcon, percent: 80 },
              { name: "Canva", icon: CanvaIcon, percent: 85 },
              { name: "Illustrator", icon: AIIcon, percent: 70 },
              { name: "Photoshop", icon: PSDIcon, percent: 70 },
              { name: "CorelDraw", icon: CorelIcon, percent: 65 },
            ].map((tool, index) => (
              <div key={index} className="circle-card">
                <div className="circle-container">
                  <svg className="circle" width="120" height="120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="#ccc"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="#ffc107"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={`${(tool.percent * 314) / 100}, 314`}
                    />
                  </svg>
                  <div className="circle-icon">
                    <img src={tool.icon} alt={tool.name} />
                  </div>
                </div>
                <div className="tool-label">{tool.name}</div>
              </div>
            ))}
          </div>
        </section>
        {/* Projects Section */}
        <section id="projects" className="projects-section py-5 mt-3">
          <h2 className="text-center mb-5 text-3xl display-5 fw-bold text-yellow-300">
            <FaProjectDiagram className="inline-block mr-2" /> 
             &nbsp;Projects
          </h2>
          <div className="row justify-content-center mt-3">
            {[
              {
                title: "MINIM - E-commerce Platform",
                desc: "HTML, CSS, JS – Dynamic pricing & contact",
                link: "https://savithri-g.github.io/Minim/",
              },
              {
                title: "FOOD RECIPES - Web App",
                desc: "React, real-time order tracking",
                link: "https://delicusfoods.netlify.app",
              },
              {
                title: "ARCHITANZ TECH - Business Site",
                desc: "HTML, CSS, Bootstrap, React",
                link: "https://savithri-g.github.io/ArchitanzTech/",
              },
              { title: "Calculator", 
                desc: "HTML, CSS, JS", 
                link: "https://savithri-g.github.io/Calculator/" },
              {
                title: "Live Project - SD Tooling",
                desc: "Live project link",
                link: "http://www.sdtooling.com/",
              },
              {
                title: "Live Project - VRJ Solutions",
                desc: "Live project link",
                link: "https://www.vrjsolutions.com/",
              },
            ].map((proj, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div className="project-card h-100 p-4 rounded-3 shadow-lg transition-transform duration-300 hover:scale-105 bg-dark text-white">
                  <h5 className="mb-2 text-warning">{proj.title}</h5>
                  <p className="text-light">{proj.desc}</p>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-warning mt-3 project-button"
                    title="View project online"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <h2 className="display-5 fw-bold">
            Experience</h2>
          <div className="experience-card">
            <h5>
              <FaBriefcase className="experience-icon" /> ARCHITANZ TECHNOLOGY -
              SOFTWARE ENGINEER
            </h5>

            <div className="experience-item">
              <FaLaptopCode className="experience-icon" />
              <span>Website Development using React, HTML, CSS, Bootstrap</span>
            </div>

            <div className="experience-item">
              <FaMicrochip className="experience-icon" />
              <span>
                IoT Project: Temp & Humidity sensor using ESP8266 + ThingSpeak
                API
                <a
                  href="https://savithri-g.github.io/ClimateMonitoring"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-project-btn"
                >
                  🔗 View Project
                </a>
              </span>
            </div>

            <div className="experience-item">
              <FaChartBar className="experience-icon" />
              <span>Power BI Dashboard for data analysis</span>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="hire-me-section mb-5">
          <h2 className="text-center mb-4 display-5 fw-bold">Hire Me</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <textarea
                name="message"
                rows="5"
                className="form-control"
                placeholder="Your Message"
                required
                value={form.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit " className="btn custom-btn mt-3">
              📩 Send Message 
            </button>
            <ToastContainer position="bottom-center" autoClose={5000} 
            hideProgressBar={false} newestOnTop={false} 
            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            {status && <p className="status-msg mb-0 mt-2 text-center">{status}</p>}
          </form>
        </section>
      </div>

      {/* Footer */}
      <footer className="custom-footer text-center text-white py-4">
        <small>
          <span className="me-3">
            <FaPhone className="me-1" /> 9940917282
          </span>
          <span className="me-3">
            <FaEnvelope className="me-2" />
            <a
              href="mailto:savithri14pt@gmail.com"
              className="footer-link"
              title="Email me"
            >
              savithri14pt@gmail.com
            </a>
          </span>
          <span>
            <a
              href="https://github.com/savithri-G"
              className="footer-link"
              target="_blank"
              rel="noreferrer"
              title="Visit GitHub"
            >
              <FaGithub className="me-1" /> GitHub
            </a>
          </span>
        </small>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="scroll-to-top"
          title="Back to top"
        >
          ⬆
        </button>
      )}
    </div>
  );
}

export default App;
