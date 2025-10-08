import React, { useState } from 'react';
import { Apple, Home, Package, Info, LogIn } from 'lucide-react';

const Navigation = ({ onAdminLogin }) => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'about', label: 'About', icon: Info }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    console.log(`Navigating to: ${tabId}`);
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
                onClick={() => handleTabClick(tab.id)}
              >
                <IconComponent size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Clean Admin Button */}
        <div className="nav-actions">
          <button 
            className="admin-login-btn"
            onClick={onAdminLogin}
            title="Administrator Access"
          >
            <LogIn size={18} />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;