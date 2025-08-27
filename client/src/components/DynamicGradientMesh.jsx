import React, { useEffect, useRef } from 'react';

const DynamicGradientMesh = () => {
  const baseGradientRef = useRef(null);
  const waveOverlayRef = useRef(null);
  const secondaryWaveRef = useRef(null);

  useEffect(() => {
    const baseGradient = baseGradientRef.current;
    const waveOverlay = waveOverlayRef.current;
    const secondaryWave = secondaryWaveRef.current;
    
    // Gradient animation setup
    const gradients = [
      'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)',
      'radial-gradient(circle at 60% 30%, rgba(198, 120, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(255, 198, 120, 0.3) 0%, transparent 50%), radial-gradient(circle at 90% 60%, rgba(120, 255, 198, 0.3) 0%, transparent 50%)',
      'radial-gradient(circle at 50% 90%, rgba(255, 150, 120, 0.3) 0%, transparent 50%), radial-gradient(circle at 10% 10%, rgba(150, 255, 120, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 40%, rgba(120, 150, 255, 0.3) 0%, transparent 50%)',
      'radial-gradient(circle at 80% 80%, rgba(200, 120, 180, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 30%, rgba(120, 200, 180, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 10%, rgba(180, 200, 120, 0.3) 0%, transparent 50%)'
    ];
    
    let currentIndex = 0;
    
    function animateGradient() {
      if (baseGradient) {
        baseGradient.style.backgroundImage = gradients[currentIndex];
        currentIndex = (currentIndex + 1) % gradients.length;
      }
    }
    
    // Initial gradient
    animateGradient();
    
    // Change gradient every 8 seconds
    const gradientInterval = setInterval(animateGradient, 8000);
    
    // Background position animation for base gradient
    const baseGradientKeyframes = [
      { backgroundPosition: '0% 0%' },
      { backgroundPosition: '100% 100%' },
      { backgroundPosition: '0% 0%' }
    ];
    
    const baseGradientOptions = {
      duration: 20000,
      iterations: Infinity,
      easing: 'linear'
    };
    
    if (baseGradient) {
      baseGradient.animate(baseGradientKeyframes, baseGradientOptions);
    }
    
    // Wave overlay animation
    const waveKeyframes = [
      { backgroundPosition: '0% 0%' },
      { backgroundPosition: '100% 100%' },
      { backgroundPosition: '0% 0%' }
    ];
    
    const waveOptions = {
      duration: 15000,
      iterations: Infinity,
      easing: 'ease-in-out'
    };
    
    if (waveOverlay) {
      waveOverlay.animate(waveKeyframes, waveOptions);
    }
    
    // Secondary wave animation
    const secondaryWaveKeyframes = [
      { backgroundPosition: '100% 100%' },
      { backgroundPosition: '0% 0%' },
      { backgroundPosition: '100% 100%' }
    ];
    
    const secondaryWaveOptions = {
      duration: 25000,
      iterations: Infinity,
      easing: 'ease-in-out'
    };
    
    if (secondaryWave) {
      secondaryWave.animate(secondaryWaveKeyframes, secondaryWaveOptions);
    }
    
    // Cleanup on unmount
    return () => {
      clearInterval(gradientInterval);
    };
  }, []);

  return (
    <div className="gradient-container">
      {/* Base gradient mesh */}
      <div className="base-gradient" ref={baseGradientRef}></div>
      
      {/* Wave overlay */}
      <div className="wave-overlay" ref={waveOverlayRef}></div>
      
      {/* Secondary wave layer */}
      <div className="secondary-wave" ref={secondaryWaveRef}></div>
      
      {/* Subtle noise texture */}
      <div className="noise-texture"></div>
      
      <style jsx>{`
        .gradient-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        
        .base-gradient {
          position: absolute;
          inset: 0;
          background-size: 100% 100%;
          filter: blur(40px);
          background-image: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), 
                           radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%);
        }
        
        .wave-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.03) 50%, transparent 70%);
          background-size: 200% 200%;
        }
        
        .secondary-wave {
          position: absolute;
          inset: 0;
          background: linear-gradient(-45deg, transparent 40%, rgba(120, 119, 198, 0.05) 50%, transparent 60%);
          background-size: 300% 300%;
        }
        
        .noise-texture {
          position: absolute;
          inset: 0;
          opacity: 0.2;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3Ccircle cx='19' cy='19' r='1'/%3E%3Ccircle cx='25' cy='25' r='1'/%3E%3Ccircle cx='31' cy='31' r='1'/%3E%3Ccircle cx='37' cy='37' r='1'/%3E%3Ccircle cx='43' cy='43' r='1'/%3E%3Ccircle cx='49' cy='49' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

// Main App component to render the gradient
const App = () => {
  return (
    <div style={{ margin: 0, padding: 0, height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <DynamicGradientMesh />
    </div>
  );
};

export default App;