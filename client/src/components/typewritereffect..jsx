import React, { useState, useEffect, useRef } from 'react';

const TypewriterEffect = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  const words = ['Developer', 'Designer', 'Creator', 'Problem Solver'];
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const delayBetweenWords = 2000;

  useEffect(() => {
    const typeWriter = () => {
      const currentWord = words[currentWordIndex];
      
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
          timeoutRef.current = setTimeout(typeWriter, typeSpeed);
        } else {
          // Word complete, start deleting after delay
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
            typeWriter();
          }, delayBetweenWords);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
          timeoutRef.current = setTimeout(typeWriter, deleteSpeed);
        } else {
          // Deletion complete, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          timeoutRef.current = setTimeout(typeWriter, 100);
        }
      }
    };

    // Start the typewriter effect
    typeWriter();

    // Clean up on component unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentText, currentWordIndex, isDeleting, words, typeSpeed, deleteSpeed, delayBetweenWords]);

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      margin: 0,
      backgroundColor: "#f8fafc"
    }}>
      <div className="typewriter-container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem"
      }}>
        <span style={{ marginRight: "0.5rem" }}>I'm a</span>
        <span className="typewriter-text" style={{
          position: "relative",
          color: "#6366f1",
          fontWeight: "bold"
        }}>
          {currentText}
        </span>
        <span className="cursor" style={{
          display: "inline-block",
          width: "2px",
          height: "2rem",
          backgroundColor: "#6366f1",
          marginLeft: "0.25rem",
          animation: "blink 0.8s infinite"
        }}></span>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default TypewriterEffect;