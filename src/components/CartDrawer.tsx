"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { X, Trash2, ShoppingBag, CreditCard, Banknote } from 'lucide-react';

export default function CartDrawer() {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen, setIsCheckoutOpen } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('online');
  
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = cartTotal > 0 && cartTotal < 500 ? 50 : 0;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 900, display: 'flex', justifyContent: 'flex-end' }}>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Drawer Sidebar */}
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ 
              position: 'relative', width: '100%', maxWidth: '420px', height: '100%', 
              background: 'var(--surface)', display: 'flex', flexDirection: 'column', 
              boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', zIndex: 901 
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontSize: '1.2rem' }}>
                <ShoppingBag size={20} className="text-gradient" /> Your Cart
              </h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="btn-icon"
                style={{ width: '32px', height: '32px' }}
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Items List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {cart.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                  <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                  <p style={{ fontWeight: 500 }}>Your basket is empty!</p>
                  <p style={{ fontSize: '0.85rem' }}>Add some fresh superfoods to get started.</p>
                </div>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {cart.map(item => (
                    <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'contain', background: 'var(--surface-light)', borderRadius: '12px', padding: '4px' }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>{item.name}</p>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>₹{item.price} x {item.quantity}</p>
                        <p style={{ margin: '0.2rem 0 0 0', fontWeight: 700, color: 'var(--primary)' }}>₹{item.price * item.quantity}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'var(--surface-light)', border: 'none', color: '#ef4444', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div style={{ padding: '1.5rem', background: 'var(--surface-light)', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span>Items Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? <span style={{color: 'var(--primary)', fontWeight: 600}}>FREE</span> : `₹${deliveryFee}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 800, marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border)' }}>
                    <span>Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Payment Method</p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => setPaymentMethod('online')}
                      style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', border: `2px solid ${paymentMethod === 'online' ? 'var(--primary)' : 'var(--border)'}`, background: paymentMethod === 'online' ? 'var(--primary-glow)' : 'var(--surface)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}
                    >
                      <CreditCard size={18} color={paymentMethod === 'online' ? 'var(--primary)' : 'var(--text-muted)'} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: paymentMethod === 'online' ? 'var(--primary)' : 'var(--text-muted)' }}>Pay Online</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('cod')}
                      style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', border: `2px solid ${paymentMethod === 'cod' ? 'var(--primary)' : 'var(--border)'}`, background: paymentMethod === 'cod' ? 'var(--primary-glow)' : 'var(--surface)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}
                    >
                      <Banknote size={18} color={paymentMethod === 'cod' ? 'var(--primary)' : 'var(--text-muted)'} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: paymentMethod === 'cod' ? 'var(--primary)' : 'var(--text-muted)' }}>Cash on Delivery</span>
                    </button>
                  </div>
                </div>

                <button 
                  className="btn-primary" 
                  style={{ width: '100%', padding: '1rem' }}
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                >
                  Proceed to Checkout (₹{grandTotal})
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
