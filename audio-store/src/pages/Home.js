import React from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <Carousel 
          autoPlay 
          infiniteLoop 
          showThumbs={false} 
          showStatus={false}
        >
          <div>
            <img src="/assets/images/Designer (2).jpeg" alt="Hero 1" />
          </div>
          <div>
            <img src="/assets/images/Designer (1).jpeg" alt="Hero 2" />
          </div>
          <div>
            <img src="/assets/images/Designer.jpeg" alt="Hero 3" />
          </div>
        </Carousel>
        <div className="hero-content">
          <h1>Welcome to <span>hd audio pro</span> Store</h1>
          <p>Your one-stop shop for all audio equipment and accessories.</p>
        </div>
      </div>
      <div className="categories">
        <div className="category">
          <img src="/assets/images/Designer.jpeg" alt="Speakers" />
          <h2>Speakers</h2>
          <p>High-quality speakers for your audio needs.</p>
        </div>
        <div className="category">
          <img src="/assets/images/Designer.jpeg" alt="Amplifiers" />
          <h2>Amplifiers</h2>
          <p>Powerful amplifiers to boost your sound.</p>
        </div>
        <div className="category">
          <img src="/assets/images/Designer.jpeg" alt="Microphones" />
          <h2>Microphones</h2>
          <p>Professional microphones for clear audio.</p>
        </div>
      </div>
      <div className="view-more">
        <Link to="/products">
          <button className="view-more-button">View More</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
