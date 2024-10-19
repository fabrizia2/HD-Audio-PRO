import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage hamburger menu
  const [isTransparent, setIsTransparent] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu open/close state
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsTransparent(true);
    } else {
      setIsTransparent(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={isTransparent ? 'transparent' : ''}>
      <h1>HD AUDIO PRO</h1>
      <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav>
        <ul className={isOpen ? 'active' : ''}>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/cart">Cart</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
