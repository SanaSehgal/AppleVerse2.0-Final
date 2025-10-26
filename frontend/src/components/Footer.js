import React from 'react';
import { Apple, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Brand Section */}
        <div className="footer-section">
          <div className="footer-brand">
            <div className="brand-logo">
              <Apple size={32} />
              <span>AppleVerse 2.0</span>
            </div>
            <p className="brand-description">
              Your comprehensive guide to apple varieties, connecting farmers, 
              researchers, and enthusiasts with the world of apples.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">GitHub</a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/search">Search Apples</a></li>
            <li><a href="/varieties">All Varieties</a></li>
            <li><a href="/image-search">Image Search</a></li>
            <li><a href="/export">Export Data</a></li>
            <li><a href="/about">About Project</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h3>Resources</h3>
          <ul className="footer-links">
            <li>
              <a href="https://agriculture.canada.ca" target="_blank" rel="noopener noreferrer">
                Agriculture Canada <ExternalLink size={14} />
              </a>
            </li>
            <li>
              <a href="https://www.ontarioapplegrowers.ca" target="_blank" rel="noopener noreferrer">
                Ontario Apple Growers <ExternalLink size={14} />
              </a>
            </li>
            <li>
              <a href="https://nationalfruitcollection.org.uk" target="_blank" rel="noopener noreferrer">
                National Fruit Collection <ExternalLink size={14} />
              </a>
            </li>
            <li><a href="/research">Research Papers</a></li>
            <li><a href="/api">API Documentation</a></li>
          </ul>
        </div>

        {/* Contact & Info */}
        <div className="footer-section">
          <h3>Contact & Support</h3>
          <div className="contact-info">
            <div className="contact-item">
              <Mail size={16} />
              <span>support@appleverse.ca</span>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <MapPin size={16} />
              <span>Ontario, Canada</span>
            </div>
          </div>
          
          <div className="newsletter">
            <h4>Stay Updated</h4>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            &copy; 2024 AppleVerse 2.0. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;