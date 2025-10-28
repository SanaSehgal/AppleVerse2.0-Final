import React, { useState, useEffect } from "react";
import "./TreeScrollPage.css";

export default function TreeScrollPage() {
  const [scrollY, setScrollY] = useState(0);
  const [appleHit, setAppleHit] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check if apple hits Newton (adjusted for removed intro section)
      if (window.scrollY >= 3800 && window.scrollY <= 4200 && !appleHit) {
        setAppleHit(true);
        setTimeout(() => setAppleHit(false), 2000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [appleHit]);

  // Apple position: make it move down as we scroll
  // Increase max distance so apple can reach bottom
  const appleY = Math.min(scrollY * 0.5, 2500);
  
  // Add rotation for falling effect
  const appleRotation = Math.min(scrollY * 0.3, 720);

  return (
    <div className="tree-scroll-page">
      {/* Tree fixed on side */}
      <div className="tree-container">
        {/* Tree SVG */}
        <svg className="tree" viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg">
          {/* Tree trunk */}
          <rect x="85" y="250" width="30" height="150" fill="#8B4513" />
          
          {/* Tree foliage - 3 layers */}
          <ellipse cx="100" cy="250" rx="80" ry="60" fill="#2d5016" />
          <ellipse cx="100" cy="200" rx="70" ry="55" fill="#3a6b1f" />
          <ellipse cx="100" cy="160" rx="60" ry="50" fill="#4a8028" />
          
          {/* Some leaves detail */}
          <circle cx="80" cy="170" r="15" fill="#5a9535" opacity="0.7" />
          <circle cx="120" cy="180" r="18" fill="#5a9535" opacity="0.7" />
          <circle cx="100" cy="140" r="12" fill="#5a9535" opacity="0.7" />
        </svg>

        {/* Apple */}
        <div 
          className={`apple ${appleHit ? 'hit' : ''}`}
          style={{ 
            transform: `translateY(${appleY}px) rotate(${appleRotation}deg)`,
          }}
        >
          {/* Apple SVG */}
          <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            {/* Apple body */}
            <ellipse cx="25" cy="28" rx="18" ry="20" fill="#dc143c" />
            {/* Apple shine */}
            <ellipse cx="20" cy="23" rx="8" ry="10" fill="#ff6b7a" opacity="0.6" />
            {/* Stem */}
            <rect x="24" y="10" width="2" height="10" fill="#8B4513" />
            {/* Leaf */}
            <ellipse cx="28" cy="12" rx="6" ry="3" fill="#2d5016" transform="rotate(30 28 12)" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="content">
        {/* About Section - First section */}
        <section className="about">
          <h2>Contact Us</h2>
          <div className="about-grid">
            <div className="about-card">
              <span className="about-icon">📞</span>
              <h3>Call us</h3>
              <p>+1 (420) 690-1738</p>
            </div>
            <div className="about-card">
              <span className="about-icon">📨</span>
              <h3>Email Us</h3>
              <p>help.appleverse@gmail.com</p>
            </div>
            <div className="about-card">
              <span className="about-icon">🕤</span>
              <h3>Our Timings</h3>
              <p>Mon - Fri</p>
              <p>9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Meet The Team</h2>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-number">01</div>
              <div className="feature-content">
                <h3>Namratha Muraleedharan</h3>
                <p>Professional Apple Skin Peeler</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-number">02</div>
              <div className="feature-content">
                <h3>Sana Sehgal</h3>
                <p>Official Apple Eater</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-number">03</div>
              <div className="feature-content">
                <h3>Jayanth</h3>
                <p>Head of Fruit Bowls</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-number">04</div>
              <div className="feature-content">
                <h3>Saima Khatoon</h3>
                <p>Chief of Crispy Apples</p>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <h2>Find Us</h2>
          <p className="map-description">Visit our research center at 300 Ouellette Ave, Windsor, ON N9A 1A5</p>
          <div className="map-container">
            <iframe
              title="AppleVerse Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2951.8738281796495!2d-83.03647!3d42.31669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b2cce7f3f3f3f%3A0x3f3f3f3f3f3f3f3f!2s300%20Ouellette%20Ave%2C%20Windsor%2C%20ON%20N9A%201A5!5e0!3m2!1sen!2sca!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        {/* Newton Section - AT BOTTOM */}
        <section className="newton-section">
          <div className={`newton-container ${appleHit ? 'shake' : ''}`}>
            {/* Newton's head SVG */}
            <svg className="newton" viewBox="0 0 150 200" xmlns="http://www.w3.org/2000/svg">
              {/* Head */}
              <ellipse cx="75" cy="75" rx="50" ry="60" fill="#ffd7ba" />
              
              {/* Hair/Wig - Newton's famous wig */}
              <path d="M 30 60 Q 20 30 40 20 Q 50 15 75 20 Q 100 15 110 20 Q 130 30 120 60" 
                    fill="#e0e0e0" stroke="#ccc" strokeWidth="2"/>
              <ellipse cx="35" cy="50" rx="15" ry="20" fill="#e0e0e0" />
              <ellipse cx="115" cy="50" rx="15" ry="20" fill="#e0e0e0" />
              
              {/* Eyes */}
              <circle cx="60" cy="70" r="5" fill="#333" />
              <circle cx="90" cy="70" r="5" fill="#333" />
              
              {/* Nose */}
              <line x1="75" y1="75" x2="75" y2="85" stroke="#333" strokeWidth="2" />
              
              {/* Mouth */}
              <path d="M 60 95 Q 75 100 90 95" stroke="#333" strokeWidth="2" fill="none" />
              
              {/* Body/Coat */}
              <rect x="25" y="130" width="100" height="70" fill="#4a4a4a" rx="10" />
              
              {/* Collar */}
              <rect x="55" y="125" width="40" height="15" fill="#fff" />
            </svg>

            {appleHit && (
              <div className="thought-bubble">
                <p>💡 Eureka!</p>
              </div>
            )}
          </div>
          
          <div className="newton-text">
            <h2>Isaac Newton</h2>
            <p className="quote">"What goes up must come down..."</p>
            <p className="discovery">And thus, the theory of gravity was born! 🌍</p>
          </div>
        </section>
      </div>
    </div>
  );
}