import React, { useState } from 'react';
import { Apple, Home, Package, Info, LogIn, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const Navigation = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate(); // ✅ Hook for navigation

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, route: '/' },
    { id: 'Library', label: 'Library', icon: Package, route: '/library' },
    { id: 'createApple', label: 'Create Apple', icon: PlusCircle, route: '/createapple' },
    { id: 'about', label: 'About', icon: Info, route: '/about' },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    if (tab.route) {
      navigate(tab.route); // ✅ Navigate to page route
    }
    console.log(`Navigating to: ${tab.id}`);
  };

  const handleSignupLogin = () => {
    navigate('/signup-login'); // ✅ Go to Signup/Login page
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo/Brand */}
        <div className="nav-brand">
          <Apple size={28} className="brand-icon" />
          <span className="brand-text">AppleVerse 2.0</span>
        </div>

        {/* Main Navigation Tabs */}
        <div className="nav-tabs">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab)} // ✅ Pass full tab object
              >
                <IconComponent size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Signup/Login Button */}
        <div className="nav-actions">
          <button 
            className="admin-login-btn"
            onClick={handleSignupLogin} // ✅ Updated navigation logic
            title="Signup or Login"
          >
            <LogIn size={18} />
            <span>Signup/Login</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
