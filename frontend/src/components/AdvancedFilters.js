import React from 'react';
import { X } from 'lucide-react';

const AdvancedFilters = ({ onClose }) => {
  return (
    <div className="filters-modal">
      <div className="filters-content">
        <div className="filters-header">
          <h2>Advanced Filters</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="filter-group">
          <label>Origin Country</label>
          <select>
            <option>All Countries</option>
            <option>Canada</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>France</option>
            <option>Japan</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Taste Profile</label>
          <select>
            <option>Any Taste</option>
            <option>Sweet</option>
            <option>Tart</option>
            <option>Balanced</option>
            <option>Mild</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Best Use Case</label>
          <select>
            <option>Any Use</option>
            <option>Fresh Eating</option>
            <option>Baking</option>
            <option>Juicing</option>
            <option>Cider</option>
            <option>Sauce</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Harvest Season</label>
          <select>
            <option>Any Season</option>
            <option>Early Season</option>
            <option>Mid Season</option>
            <option>Late Season</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Climate Hardiness</label>
          <select>
            <option>Any Climate</option>
            <option>Cold Hardy</option>
            <option>Moderate Climate</option>
            <option>Warm Climate</option>
          </select>
        </div>
        
        <button className="search-btn" style={{ width: '100%', marginTop: '1rem' }}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilters;