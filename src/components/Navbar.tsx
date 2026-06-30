"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Bell, Menu, Sun, Moon } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { cart, setIsCartOpen, setIsLoginOpen, notifications, clearNotifications, theme, toggleTheme, isLoggedIn, user, logout } = useApp();
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 90) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      
      setIsScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
              GreenHealth
            </span>
          </div>
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link href="/" className="nav-link">Home</Link></li>
        <li><Link href="/products" className="nav-link">Products</Link></li>
        <li><Link href="/ingredients" className="nav-link">Ingredients</Link></li>
        <li><Link href="/about" className="nav-link">About Us</Link></li>
        <li><Link href="/admin" className="nav-link" style={{ color: 'var(--primary)', fontWeight: 700 }}>Admin</Link></li>
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px'
          }}
        >
          {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        <div style={{ position: 'relative', cursor: 'pointer', color: 'var(--text-main)' }}>
          <div onClick={() => setShowNotif(!showNotif)}>
            <Bell size={22} />
            {notifications.length > 0 && (
              <span style={{ position: 'absolute', top: -5, right: -5, background: 'var(--primary)', color: 'white', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                {notifications.length}
              </span>
            )}
          </div>
          
          <AnimatePresence>
            {showNotif && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                style={{ position: 'absolute', top: '150%', right: -60, width: 280, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', boxShadow: 'var(--shadow-md)', zIndex: 100 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0 }}>Notifications</h4>
                  {notifications.length > 0 && <button onClick={clearNotifications} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}>Clear All</button>}
                </div>
                {notifications.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>No new notifications</p>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: 200, overflowY: 'auto' }}>
                    {notifications.slice().reverse().map(n => (
                      <li key={n.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                        {n.message}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div style={{ position: 'relative', cursor: 'pointer', color: 'var(--text-main)' }} onClick={() => setIsCartOpen(true)}>
          <ShoppingCart size={22} />
          {cartItemsCount > 0 && (
            <span style={{ position: 'absolute', top: -5, right: -5, background: 'var(--primary)', color: 'white', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
              {cartItemsCount}
            </span>
          )}
        </div>
        
        <div style={{ position: 'relative', cursor: 'pointer', color: 'var(--text-main)' }}>
          {isLoggedIn ? (
            <div onClick={() => setShowUserMenu(!showUserMenu)} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setIsLoginOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}
            >
              <User size={22} />
            </button>
          )}

          <AnimatePresence>
            {isLoggedIn && showUserMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                style={{ position: 'absolute', top: '150%', right: 0, width: 200, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '0.5rem', boxShadow: 'var(--shadow-md)', zIndex: 100 }}
              >
                <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>{user?.name}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user?.email}</p>
                </div>
                <Link 
                  href="/orders"
                  onClick={() => setShowUserMenu(false)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', background: 'none', border: 'none', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer', borderRadius: '8px', transition: 'background 0.2s', textDecoration: 'none', marginBottom: '4px' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                >
                  My Orders
                </Link>
                <button 
                  onClick={() => { logout(); setShowUserMenu(false); }}
                  style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', background: 'none', border: 'none', color: '#ef4444', fontWeight: 600, cursor: 'pointer', borderRadius: '8px', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                >
                  Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
