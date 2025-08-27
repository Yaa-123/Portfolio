import React, { useState, useEffect, useRef } from 'react';

const SkillsSection = () => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [highlightedSkill, setHighlightedSkill] = useState(null);
  
  const skillCategories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools' },
  ];

  const skills = [
    { name: 'React', level: 95, category: 'frontend', color: '#61DAFB' },
    { name: 'TypeScript', level: 90, category: 'frontend', color: '#3178C6' },
    { name: 'Next.js', level: 88, category: 'frontend', color: '#000000' },
    { name: 'Tailwind CSS', level: 92, category: 'frontend', color: '#06B6D4' },
    { name: 'Node.js', level: 85, category: 'backend', color: '#339933' },
    { name: 'Python', level: 80, category: 'backend', color: '#3776AB' },
    { name: 'PostgreSQL', level: 78, category: 'backend', color: '#336791' },
    { name: 'MongoDB', level: 82, category: 'backend', color: '#47A248' },
    { name: 'Git', level: 90, category: 'tools', color: '#F05032' },
    { name: 'Docker', level: 75, category: 'tools', color: '#2496ED' },
    { name: 'AWS', level: 70, category: 'tools', color: '#232F3E' },
    { name: 'Figma', level: 85, category: 'tools', color: '#F24E1E' },
  ];

  const skillCloud = [
    'JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker',
    'GraphQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Kubernetes', 'Terraform',
    'Jest', 'Cypress', 'Webpack', 'Vite', 'Sass', 'CSS3', 'HTML5'
  ];

  const floatingIconsRef = useRef(null);
  const pulsingCirclesRef = useRef(null);

  // Create floating icons
  useEffect(() => {
    const floatingIconsContainer = floatingIconsRef.current;
    if (!floatingIconsContainer) return;

    const icons = ['⚛️', '🔧', '💻', '🚀', '⚡', '🎨', '📱', '🔥', '💎', '🌟'];
    const colors = ['text-blue-400', 'text-purple-400', 'text-pink-400', 'text-cyan-400', 'text-indigo-400'];
    
    for (let i = 0; i < 20; i++) {
      const icon = document.createElement('div');
      icon.className = `absolute text-2xl opacity-20 ${colors[i % 5]}`;
      icon.style.left = `${Math.random() * 100}%`;
      icon.style.top = `${Math.random() * 100}%`;
      icon.textContent = icons[i % 10];
      
      // Animate with JavaScript
      animateFloatingIcon(icon);
      
      floatingIconsContainer.appendChild(icon);
    }

    return () => {
      floatingIconsContainer.innerHTML = '';
    };
  }, []);

  // Create pulsing circles
  useEffect(() => {
    const pulsingCirclesContainer = pulsingCirclesRef.current;
    if (!pulsingCirclesContainer) return;

    const colors = ['bg-blue-500/10', 'bg-purple-500/10', 'bg-pink-500/10', 'bg-cyan-500/10'];
    
    for (let i = 0; i < 8; i++) {
      const circle = document.createElement('div');
      circle.className = `absolute rounded-full ${colors[i % 4]}`;
      circle.style.width = `${Math.random() * 300 + 100}px`;
      circle.style.height = circle.style.width;
      circle.style.left = `${Math.random() * 100}%`;
      circle.style.top = `${Math.random() * 100}%`;
      
      // Animate with JavaScript
      animatePulsingCircle(circle);
      
      pulsingCirclesContainer.appendChild(circle);
    }

    return () => {
      pulsingCirclesContainer.innerHTML = '';
    };
  }, []);

  const animateFloatingIcon = (icon) => {
    let x = 0;
    let y = 0;
    let rotation = 0;
    let scale = 1;
    
    const targetX = Math.random() * 100 - 50;
    const targetY = Math.random() * 100 - 50;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 5;
    
    setTimeout(() => {
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed % (duration * 1000)) / (duration * 1000);
        
        x = targetX * Math.sin(progress * Math.PI * 2);
        y = targetY * Math.sin(progress * Math.PI * 2);
        rotation = 360 * progress;
        scale = 1 + 0.5 * Math.sin(progress * Math.PI * 2);
        
        icon.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
        
        requestAnimationFrame(animate);
      };
      
      animate();
    }, delay * 1000);
  };

  const animatePulsingCircle = (circle) => {
    let scale = 1;
    let opacity = 0.1;
    
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 3;
    
    setTimeout(() => {
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed % (duration * 1000)) / (duration * 1000);
        
        scale = 1 + 0.5 * Math.sin(progress * Math.PI);
        opacity = 0.1 + 0.2 * Math.sin(progress * Math.PI);
        
        circle.style.transform = `scale(${scale})`;
        circle.style.opacity = opacity;
        
        requestAnimationFrame(animate);
      };
      
      animate();
    }, delay * 1000);
  };

  const handleFilterClick = (categoryId) => {
    setCurrentFilter(categoryId);
  };

  const handleSkillHover = (skillName) => {
    setHighlightedSkill(skillName);
  };

  const handleSkillLeave = () => {
    setHighlightedSkill(null);
  };

  const filteredSkills = currentFilter === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === currentFilter);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Gradient Background */}
        <div 
          className="absolute inset-0 opacity-30 gradient-animate" 
          style={{ 
            background: 'linear-gradient(125deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe)',
            backgroundSize: '400% 400%'
          }}
        />

        {/* Floating Tech Icons */}
        <div ref={floatingIconsRef} id="floating-icons-container" />

        {/* Pulsing Circles */}
        <div ref={pulsingCirclesRef} id="pulsing-circles-container" />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-20 max-w-6xl relative z-10 min-h-screen flex flex-col justify-center">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 font-bold">Skills &amp; Expertise</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks
          </p>
        </div>

        {/* Skill Cloud */}
        <div className="mb-16 bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl">
          <h3 className="text-2xl mb-8 text-center font-semibold">Technology Cloud</h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto" id="skill-cloud">
            {skillCloud.map((skill, index) => (
              <div
                key={skill}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full cursor-pointer hover:bg-gray-100 transition-colors relative overflow-hidden group skill-cloud-item"
                onMouseEnter={() => handleSkillHover(skill)}
                onMouseLeave={handleSkillLeave}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                  transform: 'scale(0)'
                }}
              >
                <span className="text-sm relative z-10">{skill}</span>
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100" 
                  style={{ transform: 'translateX(-100%)', transition: 'transform 0.5s ease' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl" id="filter-buttons">
            {skillCategories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-xl transition-colors relative overflow-hidden filter-button ${
                  category.id === currentFilter 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-500 hover:text-black'
                }`}
                onClick={() => handleFilterClick(category.id)}
              >
                <span className="relative z-10">{category.label}</span>
                <div 
                  className="absolute inset-0 bg-gray-200" 
                  style={{ opacity: 0, transition: 'opacity 0.2s ease' }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl" id="skills-grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill.name}
                className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 relative overflow-hidden group skill-card"
                onMouseEnter={() => handleSkillHover(skill.name)}
                onMouseLeave={handleSkillLeave}
                style={{
                  opacity: 0,
                  transform: 'translateY(50px)'
                }}
              >
                {/* Background glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                  style={{ 
                    background: `radial-gradient(circle at center, ${skill.color} 0%, transparent 70%)` 
                  }}
                />
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <h4 className="text-lg font-medium">{skill.name}</h4>
                  <div 
                    className="w-4 h-4 rounded-full glow-dot" 
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
                <div className="space-y-2 relative z-10">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full progress-fill-animate" 
                      style={{ 
                        backgroundColor: skill.color, 
                        width: '0%' 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientBackground {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .gradient-animate {
          animation: gradientBackground 25s ease infinite;
        }

        .skill-cloud-item {
          transition: all 0.3s ease;
        }

        .skill-cloud-item:hover {
          transform: scale(1.1) translateY(-5px);
        }

        .skill-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .filter-button:hover {
          transform: scale(1.05);
        }

        .filter-button:active {
          transform: scale(0.95);
        }

        .glow-dot {
          animation: glowPulse 2s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0px currentColor; }
          50% { box-shadow: 0 0 10px currentColor; }
        }

        .progress-fill-animate {
          transition: width 1s ease;
        }
      `}</style>
    </div>
  );
};

export default SkillsSection;