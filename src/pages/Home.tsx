"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sliderData, products } from "@/data/products";
import { Link } from 'react-router-dom';
import { Search, Leaf, Coffee, ShoppingBag, Heart, Apple, Wheat } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Canvas3D from "@/components/Canvas3D";

const categories = [
  { name: "Instant Tea", id: "instanttea", icon: <Coffee size={24} /> },
  { name: "Instant Coffee", id: "instantcoffe", icon: <Leaf size={24} /> },
  { name: "Mushroom Soup", id: "mushroomsoup", icon: <ShoppingBag size={24} /> },
  { name: "Supplementary", id: "supplementary", icon: <Heart size={24} /> },
  { name: "Lemonade", id: "Lemonade", icon: <Apple size={24} /> },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('instanttea');
  const [searchQuery, setSearchQuery] = useState('');
  const [season, setSeason] = useState<'spring' | 'summer' | 'rain' | 'winter'>('spring');

  useEffect(() => {
    const seasons: ('spring' | 'summer' | 'rain' | 'winter')[] = ['spring', 'summer', 'rain', 'winter'];
    
    const timer = setInterval(() => {
      // Cycle text slide
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
      
      // Cycle leaf season colors
      setSeason((prevSeason) => {
        const currentIndex = seasons.indexOf(prevSeason);
        return seasons[(currentIndex + 1) % seasons.length];
      });
    }, 10000); // 10 second interval
    return () => clearInterval(timer);
  }, []);

  const displayedProducts = products
    .filter(p => p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 8);
    
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* HERO SECTION WITH 3D CANVAS */}
      <section className="hero-wrapper">
        <div className="hero-section">
          {/* We pass the selected season to the 3D Canvas */}
          <Canvas3D season={season} />
          
          <div className="hero-content" style={{ pointerEvents: 'none' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >

                <h1 className="hero-title" style={{ whiteSpace: 'pre-line', color: 'var(--text-main)' }}>
                  Store for organic<br/>shopping with joy
                </h1>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Fresh Promo Banners Section */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 5% 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Banner 1: Faint Cyan from Portfolio */}
        <div style={{ position: 'relative', overflow: 'hidden', background: 'rgba(83, 204, 236, 0.15)', borderRadius: '16px', padding: '1.5rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(83, 204, 236, 0.4)', color: 'var(--text-main)', fontSize: '0.75rem', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', zIndex: 10 }}>
            TRENDING
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>50% OFF</h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0, paddingBottom: '16px', fontWeight: 500 }}>On all premium mushroom soups</p>
          <div style={{ alignSelf: 'flex-start', border: '1px dashed rgba(83, 204, 236, 0.6)', padding: '6px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
            SOUP50
          </div>
          <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.1 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
          </div>
        </div>

        {/* Banner 2: Faint Peach from Portfolio */}
        <div style={{ position: 'relative', overflow: 'hidden', background: 'rgba(255, 204, 152, 0.25)', borderRadius: '16px', padding: '1.5rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255, 204, 152, 0.7)', color: 'var(--text-main)', fontSize: '0.75rem', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', zIndex: 10 }}>
            BESTSELLER
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>BUY 1 GET 1</h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0, paddingBottom: '16px', fontWeight: 500 }}>Buy any Instant Tea, get one free</p>
          <div style={{ alignSelf: 'flex-start', border: '1px dashed rgba(255, 204, 152, 0.6)', padding: '6px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
            TEABOGO
          </div>
          <div style={{ position: 'absolute', right: '10px', bottom: '-5px', opacity: 0.1 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
          </div>
        </div>

        {/* Banner 3: Faint Rose/Accent from Portfolio */}
        <div style={{ position: 'relative', overflow: 'hidden', background: 'rgba(212, 93, 110, 0.12)', borderRadius: '16px', padding: '1.5rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(212, 93, 110, 0.25)', color: 'var(--text-main)', fontSize: '0.75rem', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', zIndex: 10 }}>
            FREEBIES
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>FREE DELIVERY</h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0, paddingBottom: '16px', fontWeight: 500 }}>On orders above ₹199</p>
          <div style={{ alignSelf: 'flex-start', border: '1px dashed rgba(212, 93, 110, 0.6)', padding: '6px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
            DELFREE
          </div>
          <div style={{ position: 'absolute', right: '-5px', bottom: '5px', opacity: 0.1 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
          </div>
        </div>

      </section>

      {/* Categories Section */}
      <section className="products-container" style={{ paddingBottom: '2rem' }}>
        <div className="section-header">
          <h2 className="section-title">Select Categories</h2>
          <Link to="/products" className="show-all">Show All</Link>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveCategory(cat.id)}
              style={{ 
                minWidth: '140px', 
                padding: '1.5rem 1rem', 
                background: activeCategory === cat.id ? 'var(--surface)' : 'var(--surface-light)',
                boxShadow: activeCategory === cat.id ? '0 10px 25px rgba(0,0,0,0.3)' : 'none',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: activeCategory === cat.id ? '2px solid var(--primary)' : '2px solid transparent'
              }}
            >
              <div style={{ color: activeCategory === cat.id ? 'var(--primary)' : 'var(--text-main)' }}>{cat.icon}</div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textAlign: 'center', color: activeCategory === cat.id ? 'var(--primary)' : 'var(--text-main)' }}>
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        {/* Filtered Products Display */}
        <div style={{ marginTop: '2rem' }}>
          
          <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto 2.5rem', pointerEvents: 'auto' }}>
            <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '16px 16px 16px 48px', 
                borderRadius: '999px', 
                border: '1px solid var(--border)', 
                outline: 'none',
                fontSize: '1rem',
                background: 'var(--surface)',
                color: 'var(--text-main)',
                boxShadow: 'var(--shadow-sm)'
              }} 
            />
          </div>

          <div className="grid">
            {displayedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          {displayedProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              No products found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Most Popular Products Section */}
      <section className="products-container" style={{ paddingTop: '2rem' }}>
        <div className="section-header">
          <h2 className="section-title">Most Popular</h2>
          <Link to="/products" className="show-all">Show All</Link>
        </div>
        
        <div className="grid">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
