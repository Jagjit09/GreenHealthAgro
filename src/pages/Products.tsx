"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { products, categories as rawCategories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List as ListIcon, ChevronDown } from 'lucide-react';

function ProductsContent() {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState(categoryQuery || "All");
  const [sortBy, setSortBy] = useState('Default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (categoryQuery) {
      setActiveCategory(categoryQuery);
    }
  }, [categoryQuery]);

  let filteredProducts = activeCategory === "All" 
    ? [...products]
    : products.filter(p => p.category === activeCategory);

  if (sortBy === 'Price: Low to High') {
    filteredProducts.sort((a, b) => (a.originalPrice * (1 - a.discount/100)) - (b.originalPrice * (1 - b.discount/100)));
  } else if (sortBy === 'Price: High to Low') {
    filteredProducts.sort((a, b) => (b.originalPrice * (1 - b.discount/100)) - (a.originalPrice * (1 - a.discount/100)));
  } else if (sortBy === 'Discount: High to Low') {
    filteredProducts.sort((a, b) => b.discount - a.discount);
  } else if (sortBy === 'Rating: High to Low') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div style={{ width: '100%', background: 'var(--background)', minHeight: '100vh' }}>
      {/* Luxury Gradient Header */}
      <div style={{ 
        background: 'var(--surface-light)', 
        margin: '0 calc(-50vw + 50%)', 
        padding: '5rem 2rem 7rem', 
        textAlign: 'center',
        color: 'var(--text-main)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)'
      }}>
        {/* Decorative ambient glow */}
        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(234,88,12,0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
        
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-1px', position: 'relative', zIndex: 1 }}>Premium Collection</h1>
        <p style={{ fontSize: '1.15rem', opacity: 0.8, fontWeight: 300, letterSpacing: '0.5px', maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>Discover nature's finest ingredients, carefully crafted for your holistic wellbeing.</p>
      </div>

      {/* Ultra-Premium Toolbar Wrapper */}
      <div className="products-toolbar" style={{ 
        marginTop: '-2rem',
        marginBottom: '3rem',
        gap: '1rem',
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        marginInline: 'auto',
        padding: '0 5%'
      }}>
        {/* Category Pills Glass Dock */}
        <div style={{ 
          display: 'flex', 
          gap: '0.25rem', 
          overflowX: 'auto', 
          padding: '0.5rem 1.5rem', 
          scrollbarWidth: 'none', 
          alignItems: 'center', 
          background: 'rgba(10, 10, 10, 0.8)', 
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md)', 
          borderRadius: '100px'
        }}>
          {["All", "instanttea", "instantcoffe", "mushroomsoup", "supplementary", "Lemonade"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 18px',
                borderRadius: '999px',
                border: 'none',
                background: activeCategory === cat ? 'var(--primary)' : 'transparent',
                color: activeCategory === cat ? 'white' : 'var(--text-muted)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: activeCategory === cat ? '0 4px 15px var(--primary-glow)' : 'none',
                textTransform: 'capitalize'
              }}
              onMouseEnter={(e) => { if(activeCategory !== cat) e.currentTarget.style.color = 'var(--text-main)' }}
              onMouseLeave={(e) => { if(activeCategory !== cat) e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              {cat === 'instanttea' ? 'Instant Tea' : cat === 'instantcoffe' ? 'Instant Coffee' : cat === 'mushroomsoup' ? 'Mushroom Soup' : cat}
            </button>
          ))}
          {/* Spacer to enforce right padding in scrollable flex container */}
          <div style={{ paddingRight: '1rem', flexShrink: 0 }} />
        </div>

        {/* Right Actions Glass Dock */}
        <div className="products-actions" style={{ 
          display: 'flex', 
          gap: '1rem', 
          alignItems: 'center',
          background: 'rgba(10, 10, 10, 0.8)', 
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md)', 
          borderRadius: '100px',
          padding: '0.5rem'
        }}>
          
          {/* Filter Button */}
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '10px 20px', 
            borderRadius: '999px', 
            border: '1px solid var(--border)', 
            background: 'var(--surface)', 
            cursor: 'pointer', 
            color: 'var(--text-main)',
            fontWeight: 600,
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Filter size={16} /> Filter
          </button>

          {/* Custom Select Wrapper */}
          <div style={{ position: 'relative' }}>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ 
                appearance: 'none',
                padding: '10px 40px 10px 24px', 
                borderRadius: '999px', 
                border: '1px solid var(--border)', 
                color: 'var(--text-main)', 
                outline: 'none', 
                background: 'var(--surface)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <option>Default Sort</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Discount: High to Low</option>
              <option>Rating: High to Low</option>
            </select>
            <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }}/>
          </div>

          {/* macOS Style Segmented Control */}
          <div style={{ 
            display: 'flex', 
            background: 'var(--surface-light)', 
            borderRadius: '999px', 
            padding: '4px',
            gap: '2px',
            border: '1px solid var(--border)'
          }}>
            <button 
              onClick={() => setViewMode('grid')}
              style={{ 
                padding: '8px 14px', 
                borderRadius: '999px',
                background: viewMode === 'grid' ? 'var(--surface)' : 'transparent', 
                color: viewMode === 'grid' ? 'var(--text-main)' : 'var(--text-muted)', 
                border: 'none', 
                cursor: 'pointer',
                boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Grid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              style={{ 
                padding: '8px 14px', 
                borderRadius: '999px',
                background: viewMode === 'list' ? 'var(--surface)' : 'transparent', 
                color: viewMode === 'list' ? 'var(--text-main)' : 'var(--text-muted)', 
                border: 'none', 
                cursor: 'pointer',
                boxShadow: viewMode === 'list' ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ListIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="products-container" style={{ paddingTop: 0, paddingBottom: '6rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className={viewMode === 'grid' ? "grid" : "list"} style={{ display: viewMode === 'list' ? 'flex' : '', flexDirection: viewMode === 'list' ? 'column' : 'row', gap: '2.5rem' }}>
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} layoutMode={viewMode} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', color: 'var(--text-muted)', background: 'var(--surface)', borderRadius: '24px', boxShadow: 'var(--shadow-md)', marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>No Products Found</h3>
            <p>Try adjusting your filters or search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: '120px', textAlign: 'center' }}>Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
