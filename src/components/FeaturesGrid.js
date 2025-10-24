import React from 'react';

const FeaturesGrid = () => {
  const features = [
    {
      icon: '✍️',
      title: 'Blog',
      description: 'write blog posts that help users explore and learn more about Apple technology, updates, and features'
    },
   
  
    {
      icon: '📥',
      title: 'Export Data',
      description: 'Download variety information as PDF documents for offline reference and sharing.'
    },
    {
      icon: '🌍',
      title: 'Global Origins',
      description: 'Explore apples from around the world with detailed origin and growing condition data.'
    },
  ];

  return (
    <section className="features-section">
      <h2>Why Choose AppleVerse 2.0?</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;