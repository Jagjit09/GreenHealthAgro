import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h2 className="text-gradient" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>
            GreenHealth
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Delivering nature's best organic superfoods directly to your doorstep. Live healthier, naturally.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" className="btn-icon"><Globe size={18} /></a>
            <a href="#" className="btn-icon"><Share2 size={18} /></a>
          </div>
        </div>





        <div className="footer-col">
          <h3>Contact Us</h3>
          <ul className="footer-links">
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <MapPin size={16} className="text-gradient" /> 123 Organic Lane, Green City
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <Phone size={16} className="text-gradient" /> +1 (555) 123-4567
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <Mail size={16} className="text-gradient" /> support@greenhealth.com
            </li>
          </ul>
        </div>
      </div>
      
      {/* Quick Links Horizontal Card */}
      <div className="footer-col" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <h3 style={{ margin: 0, whiteSpace: 'nowrap' }}>Quick Links</h3>
        <ul className="footer-links" style={{ flexDirection: 'row', gap: '2rem', margin: 0, flexWrap: 'wrap', alignItems: 'center' }}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Shop Products</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/ingredients">Our Ingredients</Link></li>
        </ul>
      </div>

      {/* Categories Horizontal Card */}
      <div className="footer-col" style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <h3 style={{ margin: 0, whiteSpace: 'nowrap' }}>Categories</h3>
        <ul className="footer-links" style={{ flexDirection: 'row', gap: '2rem', margin: 0, flexWrap: 'wrap', alignItems: 'center' }}>
          <li><Link href="/products">Instant Tea</Link></li>
          <li><Link href="/products">Instant Coffee</Link></li>
          <li><Link href="/products">Mushroom Soup</Link></li>
          <li><Link href="/products">Supplementary</Link></li>
        </ul>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Green Health Agro Foods. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
