"use client";
import React from 'react';
import { useApp, OrderStatus } from '@/context/AppContext';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

export default function AdminPage() {
  const { orders, updateOrderStatus } = useApp();

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return <Clock size={16} color="#eab308" />;
      case 'Packaging': return <Package size={16} color="#3b82f6" />;
      case 'Shipped': return <Truck size={16} color="#a855f7" />;
      case 'Delivered': return <CheckCircle size={16} color="#22c55e" />;
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '8rem 5% 4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage and track all customer orders</p>
          </div>
          <div style={{ background: 'var(--surface-light)', padding: '1rem 2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Orders</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{orders.length}</div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)' }}>
            <Package size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>No Orders Yet</h3>
            <p style={{ color: 'var(--text-muted)' }}>When customers place orders, they will appear here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map((order) => (
              <div key={order.id} style={{ background: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                {/* Header */}
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', background: 'var(--surface-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>Order ID</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>{order.id}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>Date</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{new Date(order.date).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>Total</div>
                    <div style={{ fontWeight: 800, color: 'var(--primary)' }}>₹{order.total}</div>
                  </div>
                  
                  {/* Status Dropdown */}
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>Status</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface)', padding: '0.25rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                      <div style={{ padding: '0 0.5rem' }}>{getStatusIcon(order.status)}</div>
                      <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontWeight: 600, padding: '0.5rem', outline: 'none', cursor: 'pointer' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Packaging">Packaging</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                  
                  {/* Customer Info */}
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Customer Details
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                      <div><strong style={{ color: 'var(--text-main)' }}>Name:</strong> {order.customer.name}</div>
                      <div><strong style={{ color: 'var(--text-main)' }}>Phone:</strong> {order.customer.phone}</div>
                      {order.customer.email && <div><strong style={{ color: 'var(--text-main)' }}>Email:</strong> {order.customer.email}</div>}
                      <div><strong style={{ color: 'var(--text-main)' }}>Address:</strong> {order.customer.address}</div>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
                      Ordered Items
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>{item.name}</div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                            </div>
                          </div>
                          <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>₹{item.price * item.quantity}</div>
                        </div>
                      ))}
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
