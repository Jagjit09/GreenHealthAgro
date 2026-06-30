"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { X, Mail, Lock } from 'lucide-react';

export default function LoginModal() {
  const { isLoginOpen, setIsLoginOpen, login } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userName = isSignUp ? name : email.split('@')[0];
    login({ name: userName || 'User', email });
  };

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={() => setIsLoginOpen(false)}
          />
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 50, scale: 0.9 }} 
            className="glass-panel"
            style={{ position: 'relative', width: '100%', maxWidth: '400px', padding: '2.5rem', borderRadius: '24px', zIndex: 1001, background: 'var(--surface)' }}
          >
            <button 
              onClick={() => setIsLoginOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--surface-light)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
            
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', textAlign: 'center', color: 'var(--text-main)' }}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>
              {isSignUp ? 'Sign up for fresh, organic superfoods.' : 'Login to access your cart and orders.'}
            </p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {isSignUp && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Full Name</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" style={{ padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface-light)', fontFamily: 'var(--font-sans)', outline: 'none' }} />
                </div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface-light)', fontFamily: 'var(--font-sans)', outline: 'none' }} />
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="password" required placeholder="••••••••" style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface-light)', fontFamily: 'var(--font-sans)', outline: 'none' }} />
                </div>
              </div>
              
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                {isSignUp ? 'Sign Up' : 'Log In'}
              </button>
            </form>
            
            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button onClick={() => setIsSignUp(!isSignUp)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                {isSignUp ? 'Log In' : 'Sign Up'}
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
