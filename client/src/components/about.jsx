import React, { useEffect, useRef } from "react";

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    // Set up orbiting dots animation
    const orbitingDots = document.querySelectorAll(".orbiting-dot");
    orbitingDots.forEach((dot, index) => {
      const transformOrigin = 200 + index * 50;
      const keyframes = [
        {
          transform: `rotate(0deg) translateX(${transformOrigin}px) rotate(0deg)`,
        },
        {
          transform: `rotate(-360deg) translateX(${transformOrigin}px) rotate(360deg)`,
        },
      ];

      const options = {
        duration: 15000 + index * 2000,
        iterations: Infinity,
        easing: "linear",
      };

      dot.animate(keyframes, options);
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: "-100px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("About section is in view");
        }
      });
    }, observerOptions);

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Inline styles
  const styles = {
    aboutContainer: {
      margin: 0,
      padding: 0,
      fontFamily: "'Inter', sans-serif",
      background: "#0f172a",
      color: "white",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      padding: "5rem 1.5rem",
    },
    contentWrapper: {
      maxWidth: "80rem",
      margin: "0 auto",
      position: "relative",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "100vh",
    },
    gradientBg: {
      position: "absolute",
      inset: 0,
      opacity: 0.25,
      background: "linear-gradient(60deg, #4facfe, #00f2fe, #a8edea, #fed6e3)",
      backgroundSize: "400% 400%",
      animation: "gradientAnimation 20s linear infinite",
    },
    orbitingContainer: {
      position: "absolute",
      inset: 0,
      opacity: 0.2,
      animation: "orbitRotate 30s linear infinite",
    },
    orbitingDot: {
      position: "absolute",
      width: "0.5rem",
      height: "0.5rem",
      backgroundColor: "#F67160",
      borderRadius: "50%",
      left: "50%",
      top: "50%",
      animation: "orbitDot 15s linear infinite",
    },
    sectionHeader: {
      textAlign: "center",
      marginBottom: "4rem",
    },
    sectionHeaderH2: {
      fontSize: "2.25rem",
      marginBottom: "1.5rem",
    },
    sectionHeaderP: {
      fontSize: "1.125rem",
      color: "rgba(156, 163, 175, 1)",
      maxWidth: "42rem",
      margin: "0 auto",
    },
    aboutGrid: {
      display: "grid",
      gap: "4rem",
    },
    infoCard: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      padding: "2rem",
      borderRadius: "1rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
    infoCardH3: {
      fontSize: "1.5rem",
      marginBottom: "1rem",
    },
    infoText: {
      color: "rgba(156, 163, 175, 1)",
      marginBottom: "1.5rem",
      lineHeight: 1.625,
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "1rem",
    },
    statCard: {
      padding: "1rem",
      backgroundColor: "rgba(31, 41, 55, 0.5)",
      border: "1px solid rgba(229, 231, 235, 0.1)",
      borderRadius: "0.5rem",
      textAlign: "center",
      transition: "transform 0.3s ease",
    },
    statIcon: {
      width: "2rem",
      height: "2rem",
      margin: "0 auto 0.5rem",
      color: "#3b82f6",
    },
    statValue: {
      fontSize: "1.5rem",
      marginBottom: "0.25rem",
    },
    statLabel: {
      fontSize: "0.875rem",
      color: "rgba(156, 163, 175, 1)",
    },
    timelineContainer: {
      position: "relative",
    },
    timelineLine: {
      position: "absolute",
      left: "1.5rem",
      top: 0,
      bottom: 0,
      width: "2px",
      backgroundColor: "rgba(229, 231, 235, 0.1)",
    },
    timelineItem: {
      position: "relative",
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "2rem",
    },
    timelineIcon: {
      position: "relative",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "3rem",
      height: "3rem",
      borderRadius: "50%",
      border: "4px solid rgba(15, 23, 42, 0.9)",
      transition: "transform 0.3s ease",
    },
    timelineContent: {
      marginLeft: "1.5rem",
      flex: 1,
    },
    timelineHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "0.5rem",
    },
    timelineYear: {
      display: "inline-block",
      padding: "0.25rem 0.75rem",
      backgroundColor: "#3b82f6",
      color: "white",
      fontSize: "0.875rem",
      borderRadius: "9999px",
      marginRight: "0.75rem",
    },
    timelineTitle: {
      fontSize: "1.125rem",
    },
    timelineDescription: {
      fontSize: "0.875rem",
      color: "rgba(156, 163, 175, 1)",
      lineHeight: 1.625,
    },
    mb6: {
      marginBottom: "1.5rem",
    },
    mb8: {
      marginBottom: "2rem",
    },
  };

  // Media queries would need to be handled differently in inline styles
  // For simplicity, we'll keep the main styles and handle responsiveness via classes

  return (
    <>
      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          
          @keyframes orbitRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes orbitDot {
            0% { transform: rotate(0deg) translateX(200px) rotate(0deg); }
            100% { transform: rotate(-360deg) translateX(200px) rotate(360deg); }
          }
          
          .orbiting-dot-1 { transform-origin: 200px 0; animation-delay: 0s; }
          .orbiting-dot-2 { transform-origin: 250px 0; animation-delay: -2s; }
          .orbiting-dot-3 { transform-origin: 300px 0; animation-delay: -4s; }
          .orbiting-dot-4 { transform-origin: 350px 0; animation-delay: -6s; }
          .orbiting-dot-5 { transform-origin: 400px 0; animation-delay: -8s; }
          .orbiting-dot-6 { transform-origin: 450px 0; animation-delay: -10s; }
          .orbiting-dot-7 { transform-origin: 500px 0; animation-delay: -12s; }
          .orbiting-dot-8 { transform-origin: 550px 0; animation-delay: -14s; }
          
          .stat-card:hover {
            transform: scale(1.05);
          }
          
          .timeline-icon:hover {
            transform: scale(1.1);
          }
          
          @media (min-width: 768px) {
            .section-header h2 {
              font-size: 3rem;
            }
          }
          
          @media (min-width: 1024px) {
            .about-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
        `}
      </style>

      <div
        className="about-container"
        id="aboutSection"
        ref={aboutRef}
        style={styles.aboutContainer}
      >
        {/* Background Elements */}
        <div className="gradient-bg" style={styles.gradientBg}></div>

        <div className="orbiting-container" style={styles.orbitingContainer}>
          <div
            className="orbiting-dot orbiting-dot-1"
            style={styles.orbitingDot}
          ></div>
          <div
            className="orbiting-dot orbiting-dot-2"
            style={styles.orbitingDot}
          ></div>
          <div
            className="orbiting-dot orbiting-dot-3"
            style={styles.orbitingDot}
          ></div>
          <div
            className="orbiting-dot orbiting-dot-4"
            style={styles.orbitingDot}
          ></div>
          <div
            className="orbiting-dot orbiting-dot-5"
            style={styles.orbitingDot}
          ></div>
          <div
            className="orbiting-dot orbiting-dot-6"
            style={styles.orbitingDot}
          ></div>
          <div
            className="orbiting-dot orbiting-dot-7"
            style={styles.orbitingDot}
          ></div>
          <div
            className="orbiting-dot orbiting-dot-8"
            style={styles.orbitingDot}
          ></div>
        </div>

        {/* Main Content */}
        <div className="content-wrapper" style={styles.contentWrapper}>
          {/* Section Header */}
          <div className="section-header" style={styles.sectionHeader}>
            <h2 style={styles.sectionHeaderH2}>About Me</h2>
            <p style={styles.sectionHeaderP}>
              Passionate developer with a love for creating innovative solutions
              and helping businesses grow through technology.
            </p>
          </div>

          {/* About Grid */}
          <div className="about-grid" style={styles.aboutGrid}>
            {/* Personal Info & Stats */}
            <div className="info-card" style={styles.infoCard}>
              <div style={styles.mb8}>
                <h3 style={styles.infoCardH3}>Get to know me</h3>
                <p style={styles.infoText}>
                  I'm a passionate full-stack developer based in Ghana, with
                  over 3 years of experience creating digital solutions that
                  make a difference. I love turning complex problems into
                  simple, beautiful, and intuitive designs.
                </p>
                <p style={styles.infoText}>
                  When I'm not coding, you can find me exploring new
                  technologies, contributing to open-source projects, or
                  enjoying the vibrant culture of Ghana. I believe in continuous
                  learning and staying up-to-date with the latest industry
                  trends.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid" style={styles.statsGrid}>
                {/* Projects Completed */}
                <div className="stat-card" style={styles.statCard}>
                  <svg
                    className="stat-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={styles.statIcon}
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  <div className="stat-value" style={styles.statValue}>
                    50+
                  </div>
                  <div className="stat-label" style={styles.statLabel}>
                    Projects Completed
                  </div>
                </div>

                {/* Happy Clients */}
                <div className="stat-card" style={styles.statCard}>
                  <svg
                    className="stat-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={styles.statIcon}
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <div className="stat-value" style={styles.statValue}>
                    25+
                  </div>
                  <div className="stat-label" style={styles.statLabel}>
                    Happy Clients
                  </div>
                </div>

                {/* Years Experience */}
                <div className="stat-card" style={styles.statCard}>
                  <svg
                    className="stat-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={styles.statIcon}
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <div className="stat-value" style={styles.statValue}>
                    3+
                  </div>
                  <div className="stat-label" style={styles.statLabel}>
                    Years Experience
                  </div>
                </div>

                {/* Countries Worked */}
                <div className="stat-card" style={styles.statCard}>
                  <svg
                    className="stat-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={styles.statIcon}
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <div className="stat-value" style={styles.statValue}>
                    8
                  </div>
                  <div className="stat-label" style={styles.statLabel}>
                    Countries Worked
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="info-card" style={styles.infoCard}>
              <h3 style={{ ...styles.infoCardH3, ...styles.mb8 }}>
                My Journey
              </h3>
              <div
                className="timeline-container"
                style={styles.timelineContainer}
              >
                <div
                  className="timeline-line"
                  style={styles.timelineLine}
                ></div>

                {/* Timeline Item 1 */}
                <div className="timeline-item" style={styles.timelineItem}>
                  <div
                    className="timeline-icon"
                    style={{
                      ...styles.timelineIcon,
                      backgroundColor: "#3B82F6",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <div
                    className="timeline-content"
                    style={styles.timelineContent}
                  >
                    <div
                      className="timeline-header"
                      style={styles.timelineHeader}
                    >
                      <span
                        className="timeline-year"
                        style={styles.timelineYear}
                      >
                        2022
                      </span>
                      <h4
                        className="timeline-title"
                        style={styles.timelineTitle}
                      >
                        Started Web Development Journey
                      </h4>
                    </div>
                    <p
                      className="timeline-description"
                      style={styles.timelineDescription}
                    >
                      Began learning HTML, CSS, and JavaScript while studying
                      Computer Science.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="timeline-item" style={styles.timelineItem}>
                  <div
                    className="timeline-icon"
                    style={{
                      ...styles.timelineIcon,
                      backgroundColor: "#10B981",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div
                    className="timeline-content"
                    style={styles.timelineContent}
                  >
                    <div
                      className="timeline-header"
                      style={styles.timelineHeader}
                    >
                      <span
                        className="timeline-year"
                        style={styles.timelineYear}
                      >
                        2022
                      </span>
                      <h4
                        className="timeline-title"
                        style={styles.timelineTitle}
                      >
                        First Internship
                      </h4>
                    </div>
                    <p
                      className="timeline-description"
                      style={styles.timelineDescription}
                    >
                      Frontend Developer Intern at Tech Startup, worked on React
                      applications.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="timeline-item" style={styles.timelineItem}>
                  <div
                    className="timeline-icon"
                    style={{
                      ...styles.timelineIcon,
                      backgroundColor: "#F59E0B",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </div>
                  <div
                    className="timeline-content"
                    style={styles.timelineContent}
                  >
                    <div
                      className="timeline-header"
                      style={styles.timelineHeader}
                    >
                      <span
                        className="timeline-year"
                        style={styles.timelineYear}
                      >
                        2023
                      </span>
                      <h4
                        className="timeline-title"
                        style={styles.timelineTitle}
                      >
                        Full-Stack Developer
                      </h4>
                    </div>
                    <p
                      className="timeline-description"
                      style={styles.timelineDescription}
                    >
                      Joined as Full-Stack Developer, built scalable web
                      applications.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 4 */}
                <div className="timeline-item" style={styles.timelineItem}>
                  <div
                    className="timeline-icon"
                    style={{
                      ...styles.timelineIcon,
                      backgroundColor: "#EF4444",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </div>
                  <div
                    className="timeline-content"
                    style={styles.timelineContent}
                  >
                    <div
                      className="timeline-header"
                      style={styles.timelineHeader}
                    >
                      <span
                        className="timeline-year"
                        style={styles.timelineYear}
                      >
                        2024
                      </span>
                      <h4
                        className="timeline-title"
                        style={styles.timelineTitle}
                      >
                        Senior Developer
                      </h4>
                    </div>
                    <p
                      className="timeline-description"
                      style={styles.timelineDescription}
                    >
                      Promoted to Senior Developer, leading team of 5
                      developers.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 5 */}
                <div className="timeline-item" style={styles.timelineItem}>
                  <div
                    className="timeline-icon"
                    style={{
                      ...styles.timelineIcon,
                      backgroundColor: "#8B5CF6",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                  </div>
                  <div
                    className="timeline-content"
                    style={styles.timelineContent}
                  >
                    <div
                      className="timeline-header"
                      style={styles.timelineHeader}
                    >
                      <span
                        className="timeline-year"
                        style={styles.timelineYear}
                      >
                        2025
                      </span>
                      <h4
                        className="timeline-title"
                        style={styles.timelineTitle}
                      >
                        Freelance & Consulting
                      </h4>
                    </div>
                    <p
                      className="timeline-description"
                      style={styles.timelineDescription}
                    >
                      Started freelancing and consulting for various clients
                      worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
