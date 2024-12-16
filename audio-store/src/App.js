// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Receipt from './pages/Receipt';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Activation from './pages/Activation';
import { CartProvider } from './context/CartContext';
import Products from './pages/Products';
import AdminDashboard from './components/AdminDashboard/Admin';
import UsersPage from './components/AdminDashboard/UsersPage';
import ProductsPage from './components/AdminDashboard/ProductsPage';
import OrdersPage from './components/AdminDashboard/OrdersPage';
import Categories from './components/AdminDashboard/Categories';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<><Header /><Home /><Footer /></>} />
          <Route path="/about" element={<><Header /><About /><Footer /></>} />
          <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
          <Route path="/products" element={<><Header /><Products /><Footer /></>} />
          <Route path="/products/:category" element={<><Header /><ProductList /><Footer /></>} />
          <Route path="/product/:id" element={<><Header /><ProductDetails /><Footer /></>} />
          <Route path="/product-detail/:id" element={<><Header /><ProductDetails /><Footer /></>} />
          <Route path="/cart" element={<><Header /><Cart /><Footer /></>} />
          <Route path="/receipt" element={<><Header /><Receipt /><Footer /></>} />
          <Route path="/login" element={<><Header /><Login /><Footer /></>} />
          <Route path='/signup' element={<><Header /><Signup /><Footer /></>} />
          <Route path="/activation" element={<><Header /><Activation /><Footer /></>} />
          
          {/* Nested routes under AdminDashboard */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="users" element={<UsersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
