"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sprout, ShieldCheck, Award, Users, Globe2 } from 'lucide-react';

export default function AboutPage() {
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
          Rooted in Nature
        </h1>
        <p style={{ fontSize: '1.15rem', opacity: 0.8, fontWeight: 300, letterSpacing: '0.5px', maxWidth: '650px', margin: '0 auto', position: 'relative', zIndex: 1, lineHeight: '1.6' }}>
          We are on a mission to reconnect humanity with the healing power of the earth through sustainably sourced, organic superfoods.
        </p>
      </div>

      {/* Main Content Grid */}
      <div style={{ maxWidth: '1200px', margin: '-4rem auto 0', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
        
        {/* Top Feature Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          
          {/* Mission */}
          <motion.div
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
            transition={{ duration: 0.5, delay: 0 }}
            whileHover={{ y: -8, boxShadow: 'var(--shadow-xl)', borderColor: 'var(--primary)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: 'none' }}>
                <Heart size={28} strokeWidth={2} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>Our Mission</h3>
            </div>
            <div style={{ width: '40px', height: '3px', background: 'var(--primary)', borderRadius: '2px', marginBottom: '1.25rem' }}></div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>
              At Green Health Agro Foods, we believe that true health comes directly from the earth. Our mission is to provide the highest quality organic superfoods, ensuring that every product is sustainably sourced, nutrient-dense, and completely free from harmful chemicals. We aim to bridge the gap between ancient natural wisdom and modern daily nutrition.
            </p>
          </motion.div>

          {/* Process */}
          <motion.div
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
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8, boxShadow: 'var(--shadow-xl)', borderColor: 'var(--primary)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: 'none' }}>
                <Sprout size={28} strokeWidth={2} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>The Process</h3>
            </div>
            <div style={{ width: '40px', height: '3px', background: 'var(--primary)', borderRadius: '2px', marginBottom: '1.25rem' }}></div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>
              We partner exclusively with local farmers who share our unwavering commitment to regenerative organic agriculture. Every single batch is rigorously tested for absolute purity and potency before it reaches your table. It's not just about what you eat; it's about respecting and nurturing the ecosystem that provides for us.
            </p>
          </motion.div>

          {/* Promise */}
          <motion.div
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
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -8, boxShadow: 'var(--shadow-xl)', borderColor: 'var(--primary)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: 'none' }}>
                <ShieldCheck size={28} strokeWidth={2} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>Our Promise</h3>
            </div>
            <div style={{ width: '40px', height: '3px', background: 'var(--primary)', borderRadius: '2px', marginBottom: '1.25rem' }}></div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>
              We guarantee 100% transparency from seed to shelf. You will never find artificial preservatives, synthetic fillers, or hidden chemicals in our ingredient lists. We make zero compromises on quality, delivering just pure, unadulterated nature in every scoop to support your vibrant lifestyle.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {[
            { icon: Award, stat: "100%", label: "Organic Certified" },
            { icon: Users, stat: "50+", label: "Partner Farms" },
            { icon: Globe2, stat: "Zero", label: "Carbon Footprint" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              style={{ 
                background: 'var(--surface)', 
                padding: '2rem', 
                borderRadius: '20px', 
                border: '1px solid var(--border)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-md)'
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1) }}
            >
              <item.icon size={32} color="var(--primary)" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem', letterSpacing: '-1px' }}>
                {item.stat}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
