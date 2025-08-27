import React, { useState, useEffect } from 'react';

const PageTransitionEffects = () => {
  const [currentSection, setCurrentSection] = useState('home');
  
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
  ];

  const changeSection = (sectionId) => {
    if (sectionId !== currentSection) {
      setCurrentSection(sectionId);
    }
  };

  // Initialize with home section
  useEffect(() => {
    setCurrentSection('home');
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Page Transition Effects</h1>
        <p className="subtitle">Smooth transitions between content sections</p>
      </header>

      <div className="navigation">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-btn ${currentSection === section.id ? 'active' : ''}`}
            onClick={() => changeSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="content-container">
        {/* Home Section */}
        <div id="home" className={`page ${currentSection === 'home' ? 'active' : ''}`}>
          <h2 className="page-heading">Welcome Home</h2>
          <p>This is a demonstration of smooth page transitions using React and CSS.</p>
          <div className="content-grid">
            <div className="card">
              <h3>Modern Design</h3>
              <p>Clean and intuitive interface with smooth animations.</p>
            </div>
            <div className="card">
              <h3>Responsive Layout</h3>
              <p>Works perfectly on all device sizes and screen resolutions.</p>
            </div>
            <div className="card">
              <h3>Easy to Use</h3>
              <p>Simple navigation with elegant transition effects.</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className={`page ${currentSection === 'about' ? 'active' : ''}`}>
          <h2 className="page-heading">About Us</h2>
          <p>Learn more about our mission and values.</p>
          <div className="content-grid">
            <div className="card">
              <h3>Our Story</h3>
              <p>Founded in 2020, we've been dedicated to creating beautiful web experiences.</p>
            </div>
            <div className="card">
              <h3>Our Team</h3>
              <p>Talented designers and developers working together to create amazing products.</p>
            </div>
            <div className="card">
              <h3>Our Values</h3>
              <p>Quality, innovation, and user experience are at the core of everything we do.</p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className={`page ${currentSection === 'services' ? 'active' : ''}`}>
          <h2 className="page-heading">Our Services</h2>
          <p>We offer a wide range of digital services to help your business grow.</p>
          <div className="content-grid">
            <div className="card">
              <h3>Web Design</h3>
              <p>Custom website designs that reflect your brand and engage your audience.</p>
            </div>
            <div className="card">
              <h3>Development</h3>
              <p>Robust web applications built with modern technologies and best practices.</p>
            </div>
            <div className="card">
              <h3>SEO Optimization</h3>
              <p>Improve your search engine rankings and increase organic traffic.</p>
            </div>
          </div>
        </div>

        {/* Portfolio Section */}
        <div id="portfolio" className={`page ${currentSection === 'portfolio' ? 'active' : ''}`}>
          <h2 className="page-heading">Our Work</h2>
          <p>Check out some of our recent projects and success stories.</p>
          <div className="content-grid">
            <div className="card">
              <h3>E-commerce Platform</h3>
              <p>A fully responsive online store with seamless checkout experience.</p>
            </div>
            <div className="card">
              <h3>Corporate Website</h3>
              <p>Modern design for a financial services company with interactive elements.</p>
            </div>
            <div className="card">
              <h3>Mobile App</h3>
              <p>Cross-platform application for health and fitness tracking.</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className={`page ${currentSection === 'contact' ? 'active' : ''}`}>
          <h2 className="page-heading">Get In Touch</h2>
          <p>We'd love to hear from you and discuss how we can help with your project.</p>
          <div className="content-grid">
            <div className="card">
              <h3>Email</h3>
              <p>hello@example.com</p>
            </div>
            <div className="card">
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="card">
              <h3>Address</h3>
              <p>123 Web Street, Digital City, 10001</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>Page Transition Effects &copy; 2023</p>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #333;
          min-height: 100vh;
          overflow-x: hidden;
        }

        header {
          text-align: center;
          padding: 40px 0;
          color: white;
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .navigation {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin: 30px 0;
        }

        .nav-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          padding: 12px 24px;
          border-radius: 30px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .nav-btn.active {
          background: rgba(255, 255, 255, 0.9);
          color: #667eea;
        }

        .content-container {
          position: relative;
          min-height: 500px;
          margin-top: 20px;
        }

        .page {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          opacity: 0;
          transform: translateY(50px) scale(0.95);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          pointer-events: none;
        }

        .page.active {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }

        .page-heading {
          font-size: 2.2rem;
          margin-bottom: 20px;
          color: #667eea;
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .card {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          transition: transform 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .card h3 {
          color: #667eea;
          margin-bottom: 10px;
        }

        .card p {
          color: #666;
          line-height: 1.5;
        }

        .footer {
          text-align: center;
          padding: 40px 0;
          color: white;
          margin-top: 50px;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.2rem;
          }
          
          .navigation {
            flex-direction: column;
            align-items: center;
          }
          
          .nav-btn {
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default PageTransitionEffects;