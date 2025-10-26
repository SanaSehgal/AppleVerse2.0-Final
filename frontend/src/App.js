import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import SearchSection from './components/SearchSection';
import FeaturesGrid from './components/FeaturesGrid';
import AdvancedFilters from './components/AdvancedFilters';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import CreateApple from './pages/CreateApple';
import SignupLogin from "./pages/SignupLogin"; // ✅ Correct import
import './App.css';

function App() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock search logic
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
        description: 'Exceptionally crisp and juicy with a perfect balance of sweetness and tartness.',
        harvestSeason: 'Late September',
        hardiness: 'Zone 3-6',
        storage: '4-6 months',
        color: '#ff6b6b',
        secondaryColor: '#ffa726',
        emoji: '🍎',
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
        emoji: '🍏',
      },
    ];

    if (!query) return mockResults;

    const q = query.toLowerCase();
    return mockResults.filter(
      (apple) =>
        apple.name.toLowerCase().includes(q) ||
        apple.origin.toLowerCase().includes(q) ||
        apple.taste.toLowerCase().includes(q)
    );
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    setIsSearching(true);
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
    <Router>
      <Navigation onAdminLogin={handleAdminLogin} />

      <Routes>
        {/* ✅ Signup/Login Page */}
        <Route path="/signup-login" element={<SignupLogin />} />

        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
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
            </>
          }
        />

        {/* Create Apple Page */}
        <Route path="/createapple" element={<CreateApple />} />
      </Routes>
    </Router>
  );
}

export default App;
