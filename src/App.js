import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import SearchSection from './components/SearchSection';
import FeaturesGrid from './components/FeaturesGrid';
import AdvancedFilters from './components/AdvancedFilters';
import SearchResults from './components/SearchResults'; // We'll update this component
import Footer from './components/Footer';
import './App.css';

function App() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock search function
  const performSearch = (query) => {
    const mockResults = [
      {
        id: 1,
        name: 'Honeycrisp',
        origin: 'Minnesota, USA',
        originFlag: '🇺🇸',
        taste: 'Sweet',
        texture: 'Extra Crisp',
        uses: ['Fresh Eating', 'Salads', 'Desserts'],
        description: 'Exceptionally crisp and juicy with a perfect balance of sweetness and tartness. Known for its explosive crunch.',
        harvestSeason: 'Late September',
        hardiness: 'Zone 3-6',
        storage: '4-6 months',
        color: '#ff6b6b',
        secondaryColor: '#ffa726',
        emoji: '🍎'
      },
      {
        id: 2,
        name: 'Granny Smith',
        origin: 'Australia',
        originFlag: '🇦🇺',
        taste: 'Tart',
        texture: 'Firm',
        uses: ['Baking', 'Cooking', 'Fresh Eating'],
        description: 'Bright green with a very tart flavor. Excellent for baking as it holds its shape well when cooked.',
        harvestSeason: 'October',
        hardiness: 'Zone 6-9',
        storage: '5-7 months',
        color: '#66bb6a',
        secondaryColor: '#4caf50',
        emoji: '🍏'
      },
      {
        id: 3,
        name: 'Gala',
        origin: 'New Zealand',
        originFlag: '🇳🇿',
        taste: 'Sweet',
        texture: 'Crisp',
        uses: ['Fresh Eating', 'Salads', 'Sauces'],
        description: 'Mild, sweet, and aromatic with a thin skin. A great everyday eating apple.',
        harvestSeason: 'Mid August',
        hardiness: 'Zone 5-8',
        storage: '3-4 months',
        color: '#ffcc80',
        secondaryColor: '#ffb74d',
        emoji: '🍎'
      },
      {
        id: 4,
        name: 'McIntosh',
        origin: 'Canada',
        originFlag: '🇨🇦',
        taste: 'Tart-Sweet',
        texture: 'Tender',
        uses: ['Sauces', 'Juice', 'Fresh Eating'],
        description: 'Classic Canadian apple with tender white flesh and distinctive tart-sweet flavor.',
        harvestSeason: 'September',
        hardiness: 'Zone 4-7',
        storage: '2-3 months',
        color: '#ef5350',
        secondaryColor: '#e57373',
        emoji: '🍎'
      },
      {
        id: 5,
        name: 'Fuji',
        origin: 'Japan',
        originFlag: '🇯🇵',
        taste: 'Very Sweet',
        texture: 'Crisp',
        uses: ['Fresh Eating', 'Salads', 'Desserts'],
        description: 'Extremely sweet and crisp with dense flesh. Stores very well.',
        harvestSeason: 'October',
        hardiness: 'Zone 6-9',
        storage: '5-7 months',
        color: '#ff7043',
        secondaryColor: '#ff8a65',
        emoji: '🍎'
      },
      {
        id: 6,
        name: 'Ambrosia',
        origin: 'Canada',
        originFlag: '🇨🇦',
        taste: 'Sweet',
        texture: 'Crisp',
        uses: ['Fresh Eating', 'Salads'],
        description: 'Naturally low in acid with a honeyed sweetness and floral aroma.',
        harvestSeason: 'Late September',
        hardiness: 'Zone 4-8',
        storage: '4-5 months',
        color: '#ffab91',
        secondaryColor: '#ffccbc',
        emoji: '🍎'
      }
    ];

    // Filter results based on query
    let filteredResults = mockResults;
    
    if (query.toLowerCase().includes('sweet')) {
      filteredResults = mockResults.filter(apple => 
        apple.taste.toLowerCase().includes('sweet')
      );
    } else if (query.toLowerCase().includes('tart')) {
      filteredResults = mockResults.filter(apple => 
        apple.taste.toLowerCase().includes('tart')
      );
    } else if (query.toLowerCase().includes('baking') || query.toLowerCase().includes('pie')) {
      filteredResults = mockResults.filter(apple => 
        apple.uses.some(use => use.toLowerCase().includes('baking'))
      );
    } else if (query.toLowerCase().includes('canada') || query.toLowerCase().includes('canadian')) {
      filteredResults = mockResults.filter(apple => 
        apple.origin.toLowerCase().includes('canada')
      );
    }

    return filteredResults;
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      // If empty search, clear results but don't show features
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    // Show loading state
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = performSearch(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
      setHasSearched(true);
    }, 800);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleAdminLogin = () => {
    console.log('Admin login requested');
  };

  return (
    <div className="app">
      <Navigation onAdminLogin={handleAdminLogin} />
      <HeroSection />
      <SearchSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onShowAdvancedFilters={() => setShowAdvancedFilters(true)}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        isSearching={isSearching}
        hasSearched={hasSearched}
      />
      
      {/* Show search results OR features grid based on search state */}
      {hasSearched ? (
        <SearchResults 
          query={searchQuery}
          results={searchResults}
          onClearSearch={handleClearSearch}
          onFilter={() => setShowAdvancedFilters(true)}
        />
      ) : (
        <FeaturesGrid />
      )}
      
      {showAdvancedFilters && (
        <AdvancedFilters onClose={() => setShowAdvancedFilters(false)} />
      )}
      
      <Footer />
    </div>
  );
}

export default App;