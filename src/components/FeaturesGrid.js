import React from 'react';

const FeaturesGrid = () => {
  const features = [
    {
      icon: '🔍',
      title: 'Smart Search',
      description: 'Ask questions in natural language and get intelligent, relevant results tailored to your needs.'
    },
    {
      icon: '📱',
      title: 'Image Recognition',
      description: 'Upload photos of apples to instantly identify varieties using advanced AI technology.'
    },
    {
      icon: '📊',
      title: 'Comprehensive Database',
      description: 'Access detailed information from Agriculture Canada with thousands of apple varieties.'
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
    {
      icon: '👥',
      title: 'Multi-User Friendly',
      description: 'Designed for farmers, researchers, food companies, and everyday apple enthusiasts.'
    }
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