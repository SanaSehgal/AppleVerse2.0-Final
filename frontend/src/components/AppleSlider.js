import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react';

const AppleSlider = ({ apples, onAppleSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextApple = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === apples.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevApple = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? apples.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentApple = apples[currentIndex];

  return (
    <div className="apple-slider">
      {/* Main Slider */}
      <div className="slider-container">
        <button className="slider-arrow left-arrow" onClick={prevApple}>
          <ChevronLeft size={24} />
        </button>

        <div className="slider-content">
          <div className="apple-featured-card">
            {/* Apple Image */}
            <div className="apple-image-slider">
              <div 
                className="apple-image-placeholder"
                style={{ 
                  background: `linear-gradient(45deg, ${currentApple.color || '#ff6b6b'}, ${currentApple.secondaryColor || '#4ecdc4'})` 
                }}
              >
                <span>{currentApple.emoji || '🍎'}</span>
              </div>
              <div className="image-actions">
                <button className="action-btn">
                  <Heart size={18} />
                </button>
                <button className="action-btn">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Apple Info */}
            <div className="apple-details">
              <div className="apple-header">
                <h2>{currentApple.name}</h2>
                <span className="apple-origin-flag">{currentApple.originFlag || '🇨🇦'}</span>
              </div>
              
              <p className="apple-latin">{currentApple.latinName || 'Malus domestica'}</p>
              
              <div className="apple-characteristics">
                <div className="characteristic">
                  <span className="label">Taste:</span>
                  <span className="value taste-badge">{currentApple.taste}</span>
                </div>
                <div className="characteristic">
                  <span className="label">Texture:</span>
                  <span className="value">{currentApple.texture || 'Crisp'}</span>
                </div>
                <div className="characteristic">
                  <span className="label">Best For:</span>
                  <div className="use-tags">
                    {currentApple.uses.map((use, index) => (
                      <span key={index} className="use-tag">{use}</span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="apple-description">{currentApple.description}</p>

              <div className="apple-stats">
                <div className="stat">
                  <span className="stat-value">{currentApple.harvestSeason || 'Fall'}</span>
                  <span className="stat-label">Harvest</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{currentApple.hardiness || 'Zone 4'}</span>
                  <span className="stat-label">Hardiness</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{currentApple.storage || '3-6 months'}</span>
                  <span className="stat-label">Storage</span>
                </div>
              </div>

              <button 
                className="view-full-details-btn"
                onClick={() => onAppleSelect(currentApple)}
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>

        <button className="slider-arrow right-arrow" onClick={nextApple}>
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slider Dots */}
      <div className="slider-dots">
        {apples.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Slider Counter */}
      <div className="slider-counter">
        {currentIndex + 1} / {apples.length}
      </div>
    </div>
  );
};

export default AppleSlider;