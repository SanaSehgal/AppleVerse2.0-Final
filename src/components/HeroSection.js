import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>AppleVerse 2.0</h1>
        <p className="tagline">Discover the World of Apples - From Farm to Table</p>
        <p className="subtitle">
          Explore thousands of apple varieties with intelligent search, 
          image recognition, and comprehensive data from Agriculture Canada
        </p>
      </div>
      <div className="hero-image">
        <div className="hero-image-placeholder">
          Apple Variety Showcase
        </div>
      </div>
    </section>
  );
};

export default HeroSection;