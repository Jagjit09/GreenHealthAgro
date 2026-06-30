"use client";
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Star, Box } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Image as DreiImage, Text, Float, PresentationControls } from '@react-three/drei';

// The 3D Mesh Component
const ProductMesh = ({ image, name, category }: { image: string, name: string, category: string }) => {
  const proxyUrl = image.replace('https://greenhealthagrofoods.in', '');
  
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1} position={[0, 0.2, 0]}>
      <DreiImage url={proxyUrl} scale={[2.5, 2.5]} transparent />
      <Text 
        position={[0, -1.5, 0.1]} 
        fontSize={0.25} 
        color="#ffffff" 
        maxWidth={2.5} 
        textAlign="center" 
        anchorX="center" 
        anchorY="middle"
      >
        {name}
      </Text>
    </Float>
  );
};

export default function ProductCard({ product, index = 0, layoutMode = 'grid' }: { product: any, index?: number, layoutMode?: 'grid' | 'list' }) {
  const { addToCart } = useApp();
  const [is3D, setIs3D] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const price = Math.round(product.originalPrice * (1 - product.discount / 100));

  return (
    <motion.div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: layoutMode === 'list' ? 'flex' : 'flex',
        flexDirection: layoutMode === 'list' ? 'row' : 'column',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px', // Slightly rounder for luxury feel
        overflow: 'hidden',
        boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)', // Use the elegant global shadows
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)', // More pronounced float
        transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)', // Buttery smooth float
        position: 'relative'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      {/* IMAGE SECTION */}
      <div 
        style={{ 
          position: 'relative', 
          width: layoutMode === 'list' ? '240px' : '100%', 
          height: '200px',
          background: 'var(--surface-light)',
          flexShrink: 0,
          borderRight: layoutMode === 'list' ? '1px solid var(--border)' : 'none'
        }}
      >
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: '#ef4444',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '999px',
            fontSize: '0.7rem',
            fontWeight: 700,
            zIndex: 10,
            boxShadow: '0 2px 4px rgba(239,68,68,0.3)'
          }}>
            {product.discount}% OFF
          </div>
        )}

        {/* 3D Toggle Button */}
        {layoutMode === 'grid' && (
          <button 
            onClick={(e) => { e.preventDefault(); setIs3D(!is3D); }}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 20,
              background: is3D ? 'var(--primary)' : 'var(--surface)',
              color: is3D ? 'white' : 'var(--text-main)',
              border: `1px solid ${is3D ? 'var(--primary)' : 'var(--border)'}`,
              padding: '6px 12px',
              borderRadius: '999px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Box size={12} />
            {is3D ? 'Normal' : '3D'}
          </button>
        )}

        {/* Image / Canvas */}
        {is3D || (isHovered && !is3D && layoutMode === 'grid') ? (
          <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
              <Environment preset="city" />
              <Suspense fallback={null}>
                {is3D ? (
                  <ProductMesh image={product.image} name={product.name} category={product.category} />
                ) : (
                  <PresentationControls
                    global={false}
                    cursor={true}
                    snap={true}
                    speed={2}
                    zoom={1.1}
                    rotation={[0, 0, 0]}
                    polar={[-0.2, 0.2]}
                    azimuth={[-0.4, 0.4]}
                  >
                    <Float speed={4} rotationIntensity={0.5} floatIntensity={1} position={[0, 0, 0]}>
                      <DreiImage url={product.image.replace('https://greenhealthagrofoods.in', '')} scale={[3, 3]} transparent />
                    </Float>
                  </PresentationControls>
                )}
                <ContactShadows position={[0, -1.3, 0]} opacity={0.5} scale={6} blur={3} far={2} color="#ffffff" />
              </Suspense>
              {is3D && <OrbitControls enableZoom={false} autoRotate={false} />}
            </Canvas>
          </div>
        ) : (
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.5s ease', 
              transform: isHovered ? 'scale(1.05)' : 'scale(1)' 
            }} 
          />
        )}
      </div>

      {/* CONTENT SECTION */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Row 1: Category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {product.category}
          </span>
        </div>

        {/* Row 2: Title */}
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px', lineHeight: '1.3' }}>
          {product.name}
        </h3>

        {/* Row 3: Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#eab308', marginBottom: '12px' }}>
          <Star size={14} fill="currentColor" />
          <span style={{ color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 700, marginLeft: '2px' }}>{product.rating}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500, marginLeft: '4px' }}>({product.reviews} reviews)</span>
        </div>

        {/* Dashed Divider */}
        <div style={{ borderBottom: '1px dashed var(--border)', margin: '0.5rem 0' }}></div>

        {/* Price Row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '12px 0 16px' }}>
          <span style={{ color: 'var(--text-main)', fontWeight: 800, fontSize: '1.4rem' }}>₹{price}</span>
          {product.discount > 0 && (
            <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>₹{product.originalPrice}</span>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
          
          {/* Add to Cart */}
          <button 
            style={{ 
              width: '100%',
              padding: "12px", 
              fontSize: "0.95rem", 
              background: 'var(--primary)', 
              color: '#000000', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: 600,
              letterSpacing: '0.5px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.4s ease',
              boxShadow: 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(0.98)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
            onClick={() => addToCart({
              id: product.id,
              name: product.name,
              price: price,
              image: product.image
            })}
          >
            + Add to Cart
          </button>
        </div>

      </div>
    </motion.div>
  );
}
