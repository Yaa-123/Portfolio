import React, { useEffect, useRef, useState } from 'react';

const FloatingTechIcons = () => {
  const [highlightedSkill, setHighlightedSkill] = useState(null);
  const containerRef = useRef(null);

  // Tech icons data
  const techIcons = [
    {
      id: 'react',
      name: 'React',
      symbol: '⚛️',
      color: '#61DAFB',
      size: 32,
      initialX: 15,
      initialY: 20,
      speed: 0.5,
      skills: ['React', 'JavaScript', 'TypeScript']
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      symbol: '🟢',
      color: '#339933',
      size: 28,
      initialX: 85,
      initialY: 30,
      speed: 0.3,
      skills: ['Node.js', 'JavaScript', 'Backend']
    },
    {
      id: 'python',
      name: 'Python',
      symbol: '🐍',
      color: '#3776AB',
      size: 24,
      initialX: 25,
      initialY: 70,
      speed: 0.4,
      skills: ['Python', 'Backend', 'ML']
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      symbol: '📘',
      color: '#3178C6',
      size: 20,
      initialX: 75,
      initialY: 15,
      speed: 0.6,
      skills: ['TypeScript', 'JavaScript', 'Frontend']
    },
    {
      id: 'css',
      name: 'CSS',
      symbol: '🎨',
      color: '#1572B6',
      size: 26,
      initialX: 60,
      initialY: 80,
      speed: 0.35,
      skills: ['CSS3', 'Tailwind CSS', 'Frontend']
    },
    {
      id: 'docker',
      name: 'Docker',
      symbol: '🐳',
      color: '#2496ED',
      size: 30,
      initialX: 90,
      initialY: 60,
      speed: 0.25,
      skills: ['Docker', 'DevOps', 'Tools']
    },
    {
      id: 'git',
      name: 'Git',
      symbol: '🔧',
      color: '#F05032',
      size: 22,
      initialX: 40,
      initialY: 25,
      speed: 0.45,
      skills: ['Git', 'Tools', 'DevOps']
    },
    {
      id: 'database',
      name: 'Database',
      symbol: '🗃️',
      color: '#336791',
      size: 28,
      initialX: 10,
      initialY: 60,
      speed: 0.35,
      skills: ['PostgreSQL', 'MongoDB', 'Backend']
    },
    {
      id: 'aws',
      name: 'AWS',
      symbol: '☁️',
      color: '#232F3E',
      size: 24,
      initialX: 70,
      initialY: 45,
      speed: 0.4,
      skills: ['AWS', 'Cloud', 'Tools']
    },
    {
      id: 'figma',
      name: 'Figma',
      symbol: '🎯',
      color: '#F24E1E',
      size: 20,
      initialX: 30,
      initialY: 45,
      speed: 0.55,
      skills: ['Figma', 'Design', 'Tools']
    }
  ];

  // Function to check if icon should be highlighted
  const isIconHighlighted = (icon) => {
    if (!highlightedSkill) return false;
    return icon.skills.some(skill => 
      skill.toLowerCase().includes(highlightedSkill.toLowerCase()) ||
      highlightedSkill.toLowerCase().includes(skill.toLowerCase())
    );
  };

  // Helper function to convert hex to rgba
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Add floating particles
  const addFloatingParticles = (container) => {
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      
      // Random initial position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random animation
      const duration = 8000 + Math.random() * 10000;
      const delay = Math.random() * 5000;
      
      const keyframes = [
        { transform: 'translate(0, 0)', opacity: 0, scale: 0 },
        { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`, opacity: 1, scale: 1 },
        { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`, opacity: 0, scale: 0 }
      ];
      
      const options = {
        duration: duration,
        iterations: Infinity,
        easing: 'ease-in-out',
        delay: delay
      };
      
      particle.animate(keyframes, options);
      container.appendChild(particle);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing content
    container.innerHTML = '';

    // Create tech icons
    techIcons.forEach((icon, index) => {
      // Create icon element
      const iconElement = document.createElement('div');
      iconElement.className = 'tech-icon';
      iconElement.id = `icon-${icon.id}`;
      iconElement.innerHTML = `<span>${icon.symbol}</span>`;
      
      // Set initial position and style
      iconElement.style.left = `${icon.initialX}%`;
      iconElement.style.top = `${icon.initialY}%`;
      iconElement.style.fontSize = `${icon.size}px`;
      iconElement.style.filter = `drop-shadow(0 2px 8px ${hexToRgba(icon.color, 0.25)})`;
      iconElement.style.color = icon.color;
      
      // Create highlight element
      const highlightElement = document.createElement('div');
      highlightElement.className = 'tech-icon-highlight';
      highlightElement.id = `highlight-${icon.id}`;
      highlightElement.style.background = `radial-gradient(circle, ${hexToRgba(icon.color, 0.2)} 0%, transparent 70%)`;
      highlightElement.style.width = `${icon.size * 3}px`;
      highlightElement.style.height = `${icon.size * 3}px`;
      highlightElement.style.left = `-${icon.size * 1.5}px`;
      highlightElement.style.top = `-${icon.size * 1.5}px`;
      highlightElement.style.opacity = '0';
      
      // Add elements to container
      iconElement.appendChild(highlightElement);
      container.appendChild(iconElement);
      
      // Animate the icon
      animateIcon(iconElement, icon, index);
    });
    
    // Add floating particles
    addFloatingParticles(container);

    // Example: Highlight React skills after 5 seconds
    const highlightTimeout = setTimeout(() => {
      setHighlightedSkill('React');
    }, 5000);
    
    // Example: Clear highlight after 10 seconds
    const clearHighlightTimeout = setTimeout(() => {
      setHighlightedSkill(null);
    }, 10000);

    return () => {
      clearTimeout(highlightTimeout);
      clearTimeout(clearHighlightTimeout);
    };
  }, []);

  // Animate a tech icon
  const animateIcon = (element, icon, index) => {
    // Basic floating animation
    const duration = 20000 + icon.speed * 10000;
    const delay = index * 2000;
    
    // Keyframes for movement
    const keyframes = [
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 0.3 },
      { transform: 'translate(30px, -25px) rotate(180deg)', opacity: 0.7 },
      { transform: 'translate(-20px, 15px) rotate(360deg)', opacity: 0.4 },
      { transform: 'translate(10px, -10px) rotate(180deg)', opacity: 0.6 },
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 0.3 }
    ];
    
    const options = {
      duration: duration,
      iterations: Infinity,
      easing: 'ease-in-out',
      delay: delay
    };
    
    element.animate(keyframes, options);
    
    // Check for highlight state periodically
    const highlightInterval = setInterval(() => {
      if (isIconHighlighted(icon)) {
        // Pulse animation when highlighted
        element.animate([
          { transform: 'scale(1)', filter: `drop-shadow(0 0 0px rgba(255,255,255,0))` },
          { transform: 'scale(1.5)', filter: `drop-shadow(0 0 20px ${icon.color})` },
          { transform: 'scale(1)', filter: `drop-shadow(0 0 0px rgba(255,255,255,0))` }
        ], {
          duration: 1000,
          iterations: Infinity,
          easing: 'ease-in-out'
        });
        
        // Show highlight
        const highlight = document.getElementById(`highlight-${icon.id}`);
        if (highlight) {
          highlight.style.opacity = '0.6';
          highlight.animate([
            { transform: 'scale(0)', opacity: 0 },
            { transform: 'scale(2)', opacity: 0.6 },
            { transform: 'scale(0)', opacity: 0 }
          ], {
            duration: 2000,
            iterations: Infinity,
            easing: 'ease-out'
          });
        }
      } else {
        // Normal slight scale animation when not highlighted
        element.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.1)' },
          { transform: 'scale(1)' }
        ], {
          duration: 4000,
          iterations: Infinity,
          easing: 'ease-in-out'
        });
        
        // Hide highlight
        const highlight = document.getElementById(`highlight-${icon.id}`);
        if (highlight) {
          highlight.style.opacity = '0';
        }
      }
    }, 100);

    return () => {
      clearInterval(highlightInterval);
    };
  };

  return (
    <div style={{ 
      margin: 0, 
      padding: 0, 
      overflow: 'hidden', 
      height: '100vh', 
      background: '#0f172a',
      position: 'relative'
    }}>
      <div 
        ref={containerRef} 
        className="floating-icons-container"
      ></div>
      
      <style>{`
        .floating-icons-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .tech-icon {
          position: absolute;
          display: block;
          transition: all 0.3s;
          z-index: 10;
        }
        
        .tech-icon-highlight {
          position: absolute;
          border-radius: 50%;
          z-index: 5;
        }
        
        .floating-particle {
          position: absolute;
          width: 0.25rem;
          height: 0.25rem;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default FloatingTechIcons;