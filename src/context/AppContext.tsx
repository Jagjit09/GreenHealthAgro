"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Notification = {
  id: number;
  message: string;
};

export type OrderStatus = 'Pending' | 'Packaging' | 'Shipped' | 'Delivered';

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    email?: string;
  };
};

type AppContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  login: (userData: { name: string; email: string }) => void;
  logout: () => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (val: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (val: boolean) => void;
  notifications: Notification[];
  addNotification: (msg: string) => void;
  clearNotifications: () => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (val: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
    
    // Load user session
    const savedUser = localStorage.getItem('greenhealth_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Failed to parse user from localStorage');
      }
    }
    
    // Load orders
    const savedOrders = localStorage.getItem('greenhealth_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Failed to parse orders from localStorage');
      }
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      return newTheme;
    });
  };

  const addNotification = (msg: string) => {
    setNotifications(prev => [...prev, { id: Date.now(), message: msg }]);
  };

  const clearNotifications = () => setNotifications([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    addNotification(`Added ${item.name} to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const login = (userData: { name: string; email: string }) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('greenhealth_user', JSON.stringify(userData));
    setIsLoginOpen(false);
    addNotification(`Welcome back, ${userData.name}!`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('greenhealth_user');
    setCart([]);
    addNotification("Logged out successfully");
  };

  const addOrder = (order: Order) => {
    setOrders(prev => {
      const newOrders = [order, ...prev];
      localStorage.setItem('greenhealth_orders', JSON.stringify(newOrders));
      return newOrders;
    });
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => {
      const newOrders = prev.map(o => o.id === id ? { ...o, status } : o);
      localStorage.setItem('greenhealth_orders', JSON.stringify(newOrders));
      return newOrders;
    });
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, clearCart,
      isLoggedIn, user, login, logout,
      isLoginOpen, setIsLoginOpen,
      isCartOpen, setIsCartOpen,
      notifications, addNotification, clearNotifications,
      isCheckoutOpen, setIsCheckoutOpen,
      theme, toggleTheme,
      orders, addOrder, updateOrderStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
