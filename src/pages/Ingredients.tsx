"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sparkles, Droplets, Flame, Brain, Sprout } from 'lucide-react';

const ingredients = [
  { 
    name: "Ashwagandha", 
    type: "Adaptogen",
    icon: Brain,
    desc: "An ancient medicinal herb classified as a powerful adaptogen. It is renowned for its remarkable ability to help the body manage stress, lower blood sugar levels, and reduce cortisol. Sourced directly from the rich soils of the Indian subcontinent, our Ashwagandha is carefully shade-dried to preserve its maximum potency and therapeutic benefits." 
  },
  { 
    name: "Moringa", 
    type: "Superfood",
    icon: Leaf,
    desc: "Often called the 'miracle tree', Moringa is a nutrient-dense powerhouse. Our organic moringa leaves are packed with over 90 bioactive compounds, including all 9 essential amino acids. It serves as a perfect natural energy booster, inflammation reducer, and daily immunity defender for your holistic lifestyle." 
  },
  { 
    name: "Spirulina", 
    type: "Algae",
    icon: Droplets,
    desc: "A vibrant blue-green algae that ranks among the most nutrient-dense foods on the planet. It is an extraordinary source of plant-based protein, antioxidants, and vital B-vitamins. We sustainably harvest our Spirulina from pristine, controlled mineral pools to ensure absolute purity and zero heavy metal contamination." 
  },
  { 
    name: "Turmeric", 
    type: "Root Extract",
    icon: Flame,
    desc: "The golden spice of life. Turmeric contains curcumin, a substance with scientifically proven anti-inflammatory and antioxidant properties. Our premium turmeric is specially blended with a hint of organic black pepper extract to increase your body's absorption rate by up to 2000%, ensuring you get the maximum holistic benefits." 
  },
  { 
    name: "Mushroom Extract", 
    type: "Fungi Blend",
    icon: Sparkles,
    desc: "A synergistic blend of the world's most powerful functional mushrooms: Reishi, Chaga, and Lion's Mane. This potent extract is meticulously dual-extracted to isolate both water-soluble and fat-soluble compounds, providing unparalleled support for cognitive function, mental clarity, and long-term immune resilience." 
  },
  { 
    name: "Chia Seeds", 
    type: "Ancient Seed",
    icon: Sprout,
    desc: "These tiny ancient seeds are a nutritional powerhouse, originally revered by the Aztecs and Mayans for their endurance properties. They are loaded with heart-healthy Omega-3 fatty acids, high-quality plant protein, and soluble fiber. When soaked, they provide long-lasting hydration and sustainable energy throughout your entire day." 
  }
];

export default function IngredientsPage() {
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* Premium Header */}
      <div style={{ 
        background: 'var(--surface-light)', 
        padding: '6rem 2rem 8rem', 
        textAlign: 'center',
        color: 'var(--text-main)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-1px', position: 'relative', zIndex: 1 }}>
          Our Pure Ingredients
        </h1>
        <p style={{ fontSize: '1.15rem', opacity: 0.8, fontWeight: 300, letterSpacing: '0.5px', maxWidth: '650px', margin: '0 auto', position: 'relative', zIndex: 1, lineHeight: '1.6' }}>
          Transparency is our core promise. Explore the powerful, scientifically-backed organic ingredients we meticulously source to craft our premium superfoods.
        </p>
      </div>

      {/* Grid Container */}
      <div style={{ maxWidth: '1200px', margin: '-4rem auto 0', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {ingredients.map((ing, idx) => (
            <motion.div
              key={idx}
              style={{ 
                background: 'var(--surface)', 
                padding: '2.5rem', 
                borderRadius: '20px', 
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-md)',
                position: 'relative', 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                y: -8, 
                boxShadow: 'var(--shadow-xl)',
                borderColor: 'var(--primary)'
              }}
            >
              
              {/* Header: Icon & Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '16px', 
                  background: 'var(--primary-glow)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  boxShadow: 'none'
                }}>
                  <ing.icon size={28} strokeWidth={2} />
                </div>
                
                <span style={{ 
                  background: 'var(--surface-light)', 
                  color: 'var(--text-muted)', 
                  padding: '6px 14px', 
                  borderRadius: '999px', 
                  fontSize: '0.75rem', 
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  {ing.type}
                </span>
              </div>

              {/* Content */}
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
                {ing.name}
              </h3>
              
              <div style={{ width: '40px', height: '3px', background: 'var(--primary)', borderRadius: '2px', marginBottom: '1.25rem' }}></div>
              
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem', flex: 1 }}>
                {ing.desc}
              </p>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
