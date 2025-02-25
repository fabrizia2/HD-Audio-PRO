// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className='slogan'>
          <Link to="/" className="logo">
            <img src="https://res.cloudinary.com/dubzg5mqz/image/upload/v1736023164/hddd-removebg-preview_sbuwez.png" alt="HD Audio Pro" />
            <h2>“THE FUTURE SOUND”</h2>
          </Link>
        </div>
        <ul className="footer-nav">
          <li><a href="/">Home</a></li>
          <li><a href="/categories">Products</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <div className="social-media">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.instagram.com/hdaudio_pro?igsh=MTk1bmlxMTd5aGh4dg==" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} HD Audio PRO. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
