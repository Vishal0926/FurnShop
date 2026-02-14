import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductForm from './pages/admin/ProductForm';

function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/product/new" element={<ProductForm />} />
                <Route path="/admin/product/:id/edit" element={<ProductForm />} />
              </Routes>
            </main>
            <footer className="bg-primary text-white py-8 text-center mt-auto">
              <div className="container mx-auto px-4">
                <p>&copy; 2024 FurnitureCo. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
