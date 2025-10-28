import React, { useState } from 'react';
import { Apple, Home, Package, Info, LogIn, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, route: '/' },
    { id: 'library', label: 'Library', icon: Package, route: '/library' },
    { id: 'blogs', label: 'Blogs', icon: PlusCircle, route: '/blogs' }, // ✅ Updated label & route
    { id: 'about', label: 'About', icon: Info, route: '/about' },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    if (tab.route) {
      navigate(tab.route);
    }
    console.log(`Navigating to: ${tab.id}`);
  };

  const handleSignupLogin = () => {
    navigate('/signup-login');
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
                onClick={() => handleTabClick(tab)}
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
            onClick={handleSignupLogin}
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
