import React, { useState, useEffect } from 'react';
import './IntroAnimation.css';

export default function IntroAnimation({ onComplete }) {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Start the CSS fade out after 3.5 seconds
    const timer1 = setTimeout(() => {
      setFadingOut(true);
    }, 3500);

    // Call onComplete after the fade out transition finishes (0.5s CSS transition)
    const timer2 = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  const englishText = "Meyyurai".split("");

  return (
    <div className={`intro-container ${fadingOut ? 'fade-out' : ''}`}>
      <div className="bg-gradient"></div>
      
      {/* 3 Floating blurred dots */}
      <div className="dot dot-1"></div>
      <div className="dot dot-2"></div>
      <div className="dot dot-3"></div>

      {/* Center soft glowing radial spotlight */}
      <div className="radial-glow"></div>

      <div className="content-container">
        {/* English Text staggered */}
        <div className="english-text">
          {englishText.map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              {char}
            </span>
          ))}
        </div>
        
        {/* Tamil Text */}
        <div className="tamil-text">மெய்யுரை</div>
        
        {/* Glowing underline */}
        <div className="underline"></div>
      </div>
    </div>
  );
}
