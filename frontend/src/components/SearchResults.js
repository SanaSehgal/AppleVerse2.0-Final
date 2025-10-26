import React, { useState } from 'react';
import { Filter, Grid, Sliders } from 'lucide-react';
import AppleSlider from './AppleSlider';

const SearchResults = ({ query, results, onClearSearch, onFilter }) => {
  const [viewMode, setViewMode] = useState('slider'); // 'slider' or 'grid'

  return (
    <div className="search-results-section">
      {/* Results Header */}
      <div className="results-header">
        <div className="results-info">
          <h2>Search Results</h2>
          <p>Found {results.length} varieties for "<strong>{query}</strong>"</p>
        </div>

        <div className="results-controls">
          {/* View Toggle */}
          <div className="view-toggle">
            <button 
              className={`view-toggle-btn ${viewMode === 'slider' ? 'active' : ''}`}
              onClick={() => setViewMode('slider')}
              title="Slider View"
            >
              <Sliders size={18} />
              <span>Explore</span>
            </button>
            <button 
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid size={18} />
              <span>Compare</span>
            </button>
          </div>

          <button className="filter-btn" onClick={onFilter}>
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* No Results State */}
      {results.length === 0 && (
        <div className="no-results">
          <div className="no-results-content">
            <h3>No apples found for "{query}"</h3>
            <p>Try searching with different keywords:</p>
            <div className="search-suggestions">
              <button onClick={() => {/* You can set these as quick searches */}}>
                "sweet apples"
              </button>
              <button onClick={() => {/* You can set these as quick searches */}}>
                "apples for baking"
              </button>
              <button onClick={() => {/* You can set these as quick searches */}}>
                "Canadian varieties"
              </button>
              <button onClick={() => {/* You can set these as quick searches */}}>
                "tart apples"
              </button>
            </div>
            <button className="clear-search-main-btn" onClick={onClearSearch}>
              Clear Search
            </button>
          </div>
        </div>
      )}

      {/* Slider View */}
      {results.length > 0 && viewMode === 'slider' && (
        <div className="slider-view">
          <div className="view-description">
            <h3>Explore Varieties</h3>
            <p>Use the arrows to browse through each apple variety in detail</p>
          </div>
          <AppleSlider 
            apples={results} 
            onAppleSelect={(apple) => console.log('Selected:', apple)}
          />
        </div>
      )}

      {/* Grid View */}
      {results.length > 0 && viewMode === 'grid' && (
        <div className="grid-view">
          <div className="view-description">
            <h3>Compare All Varieties</h3>
            <p>View and compare all {results.length} matching apple varieties</p>
          </div>
          <div className="results-grid">
            {results.map((apple) => (
              <div key={apple.id} className="apple-card">
                <div className="apple-image">
                  <div 
                    className="image-placeholder"
                    style={{ 
                      background: `linear-gradient(45deg, ${apple.color || '#ff6b6b'}, ${apple.secondaryColor || '#4ecdc4'})` 
                    }}
                  >
                    {apple.emoji || '🍎'}
                  </div>
                </div>
                
                <div className="apple-info">
                  <h3>{apple.name}</h3>
                  <p className="apple-origin">📍 {apple.origin}</p>
                  <p className="apple-taste">🍎 {apple.taste}</p>
                  
                  <div className="apple-uses">
                    {apple.uses.map((use, index) => (
                      <span key={index} className="use-tag">{use}</span>
                    ))}
                  </div>
                  
                  <p className="apple-description">{apple.description}</p>
                  
                  <button className="view-details-btn">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;