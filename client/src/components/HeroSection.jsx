import React, { useEffect, useRef, useState } from 'react';

const HeroSection = () => {
  const avatarRef = useRef(null);
  const [currentRole, setCurrentRole] = useState('Full-Stack Developer');
  const roles = ['Full-Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];

  useEffect(() => {
    // Mouse move effect for avatar
    const handleMouseMove = (e) => {
      if (avatarRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * 20;
        
        avatarRef.current.style.transform = `translate(${x}px, ${y}px) rotateX(${y * 0.5}deg) rotateY(${x * 0.5}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Typewriter effect for roles
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    const typeWriter = () => {
      const currentText = roles[roleIndex];
      
      if (isDeleting) {
        setCurrentRole(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setCurrentRole(currentText.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingTimeout = setTimeout(typeWriter, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingTimeout = setTimeout(typeWriter, 500);
      } else {
        typingTimeout = setTimeout(typeWriter, isDeleting ? 50 : 100);
      }
    };

    typingTimeout = setTimeout(typeWriter, 1000);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(typingTimeout);
    };
  }, []);

  const navigateTo = (section) => {
    console.log(`Navigating to ${section}`);
    // In a real implementation, this would scroll to the section
    // or trigger whatever navigation behavior you need
  };

  // Inline styles
  const styles = {
    heroSection: {
      position: 'relative',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    contentContainer: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      maxWidth: '56rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem'
    },
    avatarContainer: {
      width: '10rem',
      height: '10rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '2rem',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '9999px',
      transformStyle: 'preserve-3d'
    },
    avatarRing: {
      position: 'absolute',
      inset: 0,
      borderRadius: '9999px',
      border: '2px solid rgba(102, 126, 234, 0.3)'
    },
    avatarRingSecondary: {
      position: 'absolute',
      inset: '0.5rem',
      borderRadius: '9999px',
      border: '1px solid rgba(118, 75, 162, 0.5)'
    },
    avatarMain: {
      position: 'absolute',
      inset: '0.75rem',
      borderRadius: '9999px',
      overflow: 'hidden',
      boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)'
    },
    avatarGradient: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.6), rgba(102, 126, 234, 0.8))'
    },
    avatarImageContainer: {
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    avatarImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '9999px',
      filter: 'brightness(1.1) contrast(1.1)',
      mixBlendMode: 'screen'
    },
    avatarOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, transparent, rgba(102, 126, 234, 0.1), transparent)',
      opacity: 0.3
    },
    avatarParticle: {
      position: 'absolute',
      width: '0.5rem',
      height: '0.5rem',
      backgroundColor: 'rgba(102, 126, 234, 0.3)',
      borderRadius: '9999px',
      left: '50%',
      top: '50%'
    },
    title: {
      fontSize: '3.75rem',
      lineHeight: 1,
      marginBottom: '1.5rem',
      position: 'relative',
      fontWeight: 500
    },
    titleGlow: {
      position: 'absolute',
      inset: 0,
      fontSize: '3.75rem',
      lineHeight: 1,
      fontWeight: 500,
      background: 'linear-gradient(45deg, #667eea, #764ba2, #667eea)',
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      filter: 'blur(1px)'
    },
    subtitle: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      color: 'rgba(156, 163, 175, 1)',
      marginBottom: '2rem',
      height: '4rem'
    },
    description: {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
      color: 'rgba(156, 163, 175, 1)',
      maxWidth: '42rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '3rem'
    },
    buttonContainer: {
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center'
    },
    primaryButton: {
      padding: '0.75rem 2rem',
      backgroundColor: 'rgba(102, 126, 234, 1)',
      color: 'white',
      borderRadius: '0.5rem',
      transitionProperty: 'background-color',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '150ms',
      position: 'relative',
      overflow: 'hidden',
      fontWeight: 500,
      border: 'none',
      cursor: 'pointer'
    },
    primaryButtonOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(102, 126, 234, 0.2), rgba(102, 126, 234, 0.4))',
      transform: 'translateX(-100%)'
    },
    secondaryButton: {
      padding: '0.75rem 2rem',
      border: '1px solid rgba(229, 231, 235, 1)',
      borderRadius: '0.5rem',
      transitionProperty: 'background-color',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '150ms',
      position: 'relative',
      overflow: 'hidden',
      fontWeight: 500,
      background: 'transparent',
      cursor: 'pointer'
    },
    secondaryButtonOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(249, 250, 251, 0.2), rgba(249, 250, 251, 0.4))',
      transform: 'translateX(-100%)'
    },
    scrollIndicator: {
      position: 'absolute',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      cursor: 'pointer'
    },
    scrollButton: {
      padding: '0.5rem',
      borderRadius: '9999px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  return (
    <div className="hero-section" style={styles.heroSection}>
      {/* Dynamic Gradient Mesh Background would go here */}
      {/* Floating Tech Icons would go here */}
      
      <div className="content-container" style={styles.contentContainer}>
        <div className="avatar-container" id="avatar" ref={avatarRef} style={styles.avatarContainer}>
          {/* Animated border rings */}
          <div className="avatar-ring" style={styles.avatarRing}></div>
          <div className="avatar-ring-secondary" style={styles.avatarRingSecondary}></div>
          
          {/* Main image container with animated background */}
          <div className="avatar-main" style={styles.avatarMain}>
            {/* Animated background gradient */}
            <div className="avatar-gradient" style={styles.avatarGradient}></div>
            
            {/* Main image */}
            <div className="avatar-image-container" style={styles.avatarImageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&h=400&fit=crop&crop=face" 
                alt="Developer Ella" 
                className="avatar-image"
                style={styles.avatarImage}
              />
            </div>
            
            {/* Overlay gradient */}
            <div className="avatar-overlay" style={styles.avatarOverlay}></div>
          </div>
          
          {/* Floating particles around avatar */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="avatar-particle" style={{
              ...styles.avatarParticle,
              transform: `rotate(${i * 45}deg) translateX(3rem) rotate(-${i * 45}deg)`
            }}></div>
          ))}
        </div>

        <h1 className="title" style={styles.title}>
          <span className="relative inline-block">
            Developer Ella
            {/* Text glow effect */}
            <span className="title-glow" style={styles.titleGlow}>Developer Ella</span>
          </span>
        </h1>
        
        <div className="subtitle" style={styles.subtitle}>
          {/* Typewriter effect */}
          {currentRole}
          <span className="blinking-cursor">|</span>
        </div>

        <p className="description" style={styles.description}>
          Passionate about creating beautiful, functional web experiences that make a difference. 
          Let's build something amazing together.
        </p>

        <div className="button-container" style={styles.buttonContainer}>
          <button className="primary-button" onClick={() => navigateTo('projects')} style={styles.primaryButton}>
            <span className="relative z-10">View My Work</span>
            <div className="primary-button-overlay" style={styles.primaryButtonOverlay}></div>
          </button>
          <button className="secondary-button" onClick={() => navigateTo('contact')} style={styles.secondaryButton}>
            <span className="relative z-10">Get In Touch</span>
            <div className="secondary-button-overlay" style={styles.secondaryButtonOverlay}></div>
          </button>
        </div>
      </div>

      <div className="scroll-indicator" onClick={() => navigateTo('skills')} style={styles.scrollIndicator}>
        <div className="scroll-button" style={styles.scrollButton}>
          {/* ChevronDown icon */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>

      <style>
        {`
          @media (min-width: 768px) {
            .title {
              font-size: 4.5rem;
            }
            .title-glow {
              font-size: 4.5rem;
            }
            .subtitle {
              font-size: 1.5rem;
              line-height: 2rem;
            }
          }

          .blinking-cursor {
            animation: blink 1s infinite;
          }

          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }

          .primary-button:hover {
            background-color: rgba(102, 126, 234, 0.9);
          }

          .secondary-button:hover {
            background-color: rgba(249, 250, 251, 1);
          }
        `}
      </style>
    </div>
  );
};

export default HeroSection;