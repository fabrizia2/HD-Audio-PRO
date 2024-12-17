import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
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
        {/* Always render the header and footer */}
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/product-detail/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/receipt" element={<Receipt />} />
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path="/activation" element={<Activation />} />
            
            {/* Nested routes under AdminDashboard */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="users" element={<UsersPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="categories" element={<Categories />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
