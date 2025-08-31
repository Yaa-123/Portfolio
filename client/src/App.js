import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAdminAuth";
import Header from "./components/Header";
import AdminLogin from "./admin/AdminLogin";
import Settings from "./admin/Settings";
import ProjectManager from "./admin/ProjectManager";
import ProtectedRoute from "./components/ProtectedRoute";
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import "./styles/global.css";

// Sample home component
const Home = () => (
  <div>
    <HeroSection />
    <ProjectSection />
    <SkillsSection />
    <ContactSection />
  </div>
);

// Sample about component
const About = () => (
  <div style={{ padding: "2rem" }}>
    <h1>About Me</h1>
    <p>Learn more about my skills and experience.</p>
  </div>
);

// Sample contact component
const Contact = () => (
  <div style={{ padding: "2rem" }}>
    <h1>Contact</h1>
    <p>Get in touch with me.</p>
  </div>
);

function App() {
  const [sidebarState, setSidebarState] = useState(
    localStorage.getItem("sidebarState") === "collapsed"
  );
  const [backendData, setBackendData] = useState(null); // Add this line

  // Initialize components when app loads
  useEffect(() => {
    initComponents();
    setupContactForm();
    handleResponsive();

    // Call your backend API - ADD THIS
    fetch("http://localhost:5000/api/hello")
      .then((response) => response.json())
      .then((data) => setBackendData(data.message))
      .catch((error) => console.error("Error connecting to backend:", error));

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResponsive);
    };
  }, []);

  // Initialize all components
  const initComponents = () => {
    initDynamicGradient();
    initFloatingTechtons();
    initParticleBackground();
    initTypewriterEffect();
  };

  // Sidebar toggle functionality
  const toggleSidebar = () => {
    const newState = !sidebarState;
    setSidebarState(newState);
    localStorage.setItem("sidebarState", newState ? "collapsed" : "expanded");
  };

  // Dynamic Gradient Background
  const initDynamicGradient = () => {
    const gradientElement = document.querySelector(
      '[data-slot="dynamic-gradient"]'
    );
    if (gradientElement) {
      let colors = ["#667eea", "#764ba2", "#f093fb"];
      let currentIndex = 0;

      setInterval(() => {
        gradientElement.style.background = `linear-gradient(45deg, ${
          colors[currentIndex]
        }, ${colors[(currentIndex + 1) % colors.length]})`;
        currentIndex = (currentIndex + 1) % colors.length;
      }, 3000);
    }
  };

  // Floating Techtons Handler
  const initFloatingTechtons = () => {
    const techtons = document.querySelectorAll(
      '[data-slot="floating-techtons"]'
    );
    techtons.forEach((techton) => {
      let floating = true;
      let direction = 1;
      let position = 0;

      const floatInterval = setInterval(() => {
        if (floating) {
          position += 0.5 * direction;
          techton.style.transform = `translateY(${position}px)`;

          if (Math.abs(position) >= 5) {
            direction *= -1;
          }
        }
      }, 50);
    });
  };

  // Particle Background Initialization
  const initParticleBackground = () => {
    const canvas = document.querySelector('[data-slot="particle-background"]');
    if (canvas && typeof window !== "undefined") {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const ctx = canvas.getContext("2d");
      const particles = [];

      // Create particles
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
        });
      }

      const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          // Move particles
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width)
            particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height)
            particle.speedY *= -1;
        });

        requestAnimationFrame(animateParticles);
      };

      animateParticles();
    }
  };

  // Typewriter Effect
  const initTypewriterEffect = () => {
    const typewriterElement = document.querySelector(
      '[data-slot="typewriter-effect"]'
    );
    if (typewriterElement) {
      const texts = JSON.parse(
        typewriterElement.dataset.texts ||
          '["Full Stack Developer", "UI/UX Designer", "Problem Solver"]'
      );
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      const type = () => {
        const currentText = texts[textIndex];

        if (isDeleting) {
          typewriterElement.textContent = currentText.substring(
            0,
            charIndex - 1
          );
          charIndex--;
        } else {
          typewriterElement.textContent = currentText.substring(
            0,
            charIndex + 1
          );
          charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(type, 1000);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          setTimeout(type, 500);
        } else {
          setTimeout(type, isDeleting ? 50 : 100);
        }
      };

      type();
    }
  };

  // Contact Form Handling
  const setupContactForm = () => {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Thank you for your message! I will get back to you soon.");
        this.reset();
      });
    }
  };

  // Mobile Responsiveness
  const handleResponsive = () => {
    const checkMobile = () => {
      const sidebar = document.querySelector('[data-slot="sidebar-wrapper"]');
      if (sidebar) {
        if (window.innerWidth < 768) {
          sidebar.classList.add("mobile");
        } else {
          sidebar.classList.remove("mobile");
        }
      }
    };

    window.addEventListener("resize", checkMobile);
    checkMobile();
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          {/* Backend connection status - ADD THIS */}
          {backendData && (
            <div
              style={{
                position: "fixed",
                top: "10px",
                right: "10px",
                background: "green",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "12px",
                zIndex: 1000,
              }}
            >
              ✅ Backend Connected
            </div>
          )}
          <main>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectSection />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects"
                element={
                  <ProtectedRoute>
                    <ProjectManager />
                  </ProtectedRoute>
                }
              />

              {/* 404 route */}
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
