import React, { useState } from 'react';
import { Search, Camera, Loader, X } from 'lucide-react';

const SearchSection = ({ 
  searchQuery, 
  setSearchQuery, 
  onShowAdvancedFilters,
  onSearch,
  onClearSearch,
  isSearching,
  hasSearched
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const quickFilters = [
    { id: 'all', label: 'All Apples' },
    { id: 'name', label: 'By Name' },
    { id: 'origin', label: 'By Origin' },
    { id: 'taste', label: 'By Taste' },
    { id: 'useCase', label: 'By Use Case' },
    { id: 'advanced', label: 'Advanced Filters' }
  ];

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    if (filterId === 'advanced') {
      onShowAdvancedFilters();
    }
  };

  const handleSearchClick = () => {
    onSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleClearClick = () => {
    onClearSearch();
  };

  return (
    <section className="search-container">
      <div className="main-search">
        <div className="search-input-group">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about apples... Try 'best apples for baking' or 'cold-hardy varieties for Ontario'"
            className="smart-search-input"
            disabled={isSearching}
          />
          {hasSearched && (
            <button className="clear-search-btn" onClick={handleClearClick}>
              <X size={16} />
            </button>
          )}
        </div>
        <button 
          className={`search-btn ${isSearching ? 'loading' : ''}`}
          onClick={handleSearchClick}
          disabled={isSearching}
        >
          {isSearching ? (
            <Loader size={20} className="spinner" />
          ) : (
            <Search size={20} />
          )}
          {isSearching ? 'Searching...' : 'Search'}
        </button>
        
      </div>
      
      <div className="quick-filters">
        <div className="filter-pills">
          {quickFilters.map(filter => (
            <span
              key={filter.id}
              className={`filter-pill ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilterClick(filter.id)}
            >
              {filter.label}
            </span>
          ))}
        </div>
      </div>

      {/* Search status info */}
      {hasSearched && (
        <div className="search-status">
          <p>Showing results for: <strong>"{searchQuery}"</strong></p>
          <button className="clear-results-btn" onClick={handleClearClick}>
            Clear results
          </button>
        </div>
      )}
    </section>
  );
};

export default SearchSection;