import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage hamburger menu
  const [isTransparent, setIsTransparent] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu open/close state
  };

  const closeMenu = () => {
    setIsOpen(false);
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
    document.addEventListener('click', (e) => {
      if (isOpen && !e.target.closest('nav') && !e.target.closest('.hamburger')) {
        closeMenu();
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', closeMenu);
    };
  }, [isOpen]);

  return (
    <header className={isTransparent ? 'transparent' : ''}>
      <div className='slogan'>
        <Link to="/" className="logo">
          <img src="https://res.cloudinary.com/dubzg5mqz/image/upload/v1736023164/hddd-removebg-preview_sbuwez.png" alt="HD Audio Pro" />
        </Link>
      </div>
      <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav>
        <ul className={isOpen ? 'active' : ''}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/categories" onClick={closeMenu}>Products</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
