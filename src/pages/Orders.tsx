"use client";
import React, { useEffect, useState } from 'react';
import { useApp, OrderStatus, Order } from '@/context/AppContext';
import { Package, Truck, CheckCircle, Clock, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserOrdersPage() {
  const { orders, user, isLoggedIn } = useApp();
  const [myOrders, setMyOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (isLoggedIn && user) {
      // Filter orders belonging to the logged in user
      const filtered = orders.filter(
        o => o.customer.email === user.email || o.customer.name === user.name
      );
      setMyOrders(filtered);
    } else {
      setMyOrders([]);
    }
  }, [orders, user, isLoggedIn]);

  const getStatusDisplay = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': 
        return <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#eab308', background: 'rgba(234, 179, 8, 0.1)', padding: '6px 12px', borderRadius: '999px', fontWeight: 600 }}><Clock size={16} /> Pending Approval</div>;
      case 'Packaging': 
        return <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', padding: '6px 12px', borderRadius: '999px', fontWeight: 600 }}><Package size={16} /> Packaging</div>;
      case 'Shipped': 
        return <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a855f7', background: 'rgba(168, 85, 247, 0.1)', padding: '6px 12px', borderRadius: '999px', fontWeight: 600 }}><Truck size={16} /> Shipped</div>;
      case 'Delivered': 
        return <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: '6px 12px', borderRadius: '999px', fontWeight: 600 }}><CheckCircle size={16} /> Delivered</div>;
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ width: '100%', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <ShoppingBag size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>Please Log In</h2>
          <p style={{ color: 'var(--text-muted)' }}>You must be logged in to view your order history.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '8rem 5% 4rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>My Orders</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Track your recent purchases and shipments</p>

        {myOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)' }}>
            <ShoppingBag size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>No Orders Yet</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You haven't placed any orders yet. Start exploring our premium collection!</p>
            <Link href="/products" className="btn-primary" style={{ display: 'inline-block' }}>
              Shop Now
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {myOrders.map((order) => (
              <div key={order.id} style={{ background: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                
                {/* Order Header */}
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', background: 'var(--surface-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>Order Placed</div>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{new Date(order.date).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>Total Amount</div>
                      <div style={{ fontWeight: 800, color: 'var(--primary)' }}>₹{order.total}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>Order ID</div>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{order.id}</div>
                    </div>
                  </div>
                </div>

                {/* Order Body */}
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                    
                    {/* Items List */}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem' }}>Items in your order</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {order.items.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'var(--surface-light)', overflow: 'hidden' }}>
                              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.name}</div>
                              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Quantity: {item.quantity}</div>
                              <div style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{item.price * item.quantity}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Tracker */}
                    <div style={{ background: 'var(--surface-light)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', minWidth: '250px' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem' }}>Delivery Status</h4>
                      {getStatusDisplay(order.status)}
                      
                      <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>Shipping Address</div>
                        <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                          {order.customer.name}<br/>
                          {order.customer.address}<br/>
                          {order.customer.phone}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
