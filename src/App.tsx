import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AppProvider } from '@/context/AppContext';
import CartDrawer from '@/components/CartDrawer';
import LoginModal from '@/components/LoginModal';
import CheckoutModal from '@/components/CheckoutModal';

// We will import these after moving them
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Ingredients from '@/pages/Ingredients';
import About from '@/pages/About';
import Admin from '@/pages/Admin';
import Orders from '@/pages/Orders';

function App() {
  return (
    <div className="page-container">
      <AppProvider>
        <Navbar />
        <CartDrawer />
        <LoginModal />
        <CheckoutModal />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
        <Footer />
      </AppProvider>
    </div>
  );
}

export default App;
