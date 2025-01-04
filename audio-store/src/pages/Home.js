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
            <img src="https://res.cloudinary.com/dubzg5mqz/image/upload/v1734430595/amp4_ddtx4j.png" alt="Hero 1" />
          </div>
          <div>
            <img src="https://res.cloudinary.com/dubzg5mqz/image/upload/v1734430168/micro2_tqfstc.jpg" alt="Hero 2" />
          </div>
          <div>
            <img src="https://res.cloudinary.com/dubzg5mqz/image/upload/v1734429419/mic1_y1oslv.jpg" alt="Hero 3" />
          </div>
        </Carousel>
        
      </div>

      <div className="about-container">
        <h2>About Us</h2>
        <p>
          HD AUDIO is a New Range of Acoustically Designed Professional Audio Gear made with Sound Engineers in Mind ,especially for the ever evolving Sound technology requirements.

          We are the industry leaders in the design, and distribution of premium sound reinforcement technologies & Audio Visual accesories 
          <br></br><br></br>
          MICROPHONES •AMPLIFIERS • SPEAKERS • MIXERS •AUDIO VISUAL ACCESORIES
        </p>
      </div>

      {/* Categories Section */}
      <div className="categories">
        <div className="category">
          <img src="https://res.cloudinary.com/dubzg5mqz/image/upload/v1734430168/micro2_tqfstc.jpg" alt="Speakers" />
          <h2>Microphone cases</h2>
          <p>High-quality cases for your audio needs.</p>
        </div>
        <div className="category">
          <img src="https://res.cloudinary.com/dubzg5mqz/image/upload/v1734430590/amp3_nsyrhn.png" alt="Amplifiers" />
          <h2>Amplifiers</h2>
          <p>Powerful amplifiers to boost your sound.</p>
        </div>
        <div className="category">
          <img src="/assets/images/mic1.jpg" alt="Microphones" />
          <h2>Microphones</h2>
          <p>Professional microphones for clear audio.</p>
        </div>
        {/* View More Button */}
        <div className="view-more">
          <Link to="/products">
            <button className="view-more-button">View More</button>
          </Link>
        </div>
      </div>

      {/* Testimonials Section */}
      <section>
          
        <div className="logos">
            <div className="logoi">
              <a href="/"> <img src="https://res.cloudinary.com/dubzg5mqz/image/upload/v1735884358/jaz_hjlsxk.jpg" alt="Microphones" /> </a>
            </div>

            <div className="logoi">
              <a href="/"> <img src="https://res.cloudinary.com/dubzg5mqz/image/upload/v1735884492/572cOi2Uu1jIdAAiRobSdRb2bFepjD0DZGx1ikVpxWNl4kc63uf8O-KfNLp5SBWxYBP5apgVxHw_s900-c-k-c0x00ffffff-no-rj_fjx5jc.jpg" alt="Microphones" /> </a>
            </div>

            <div className="logoi">
              <a href="/"> <img src="https://res.cloudinary.com/dubzg5mqz/image/upload/v1735884681/Skyward_20Express_20Logo300x150-01_z2zptq.png" alt="Microphones" /> </a>
            </div>

            <div className="logoi">
              <a href="/"> <img src="https://res.cloudinary.com/dubzg5mqz/image/upload/v1735884844/1630518832688_rkgzsl.jpg" alt="Microphones" /> </a>
            </div>

            <div className="logoi">
              <a href="/"> <img src="https://res.cloudinary.com/dubzg5mqz/image/upload/v1735884961/Britam-Holdings-fb_mrt8v1.png" alt="Microphones" /> </a>
            </div>

            <div className="logoi">
              <a href="/"> <img src="https://res.cloudinary.com/dubzg5mqz/image/upload/v1735885098/jw-icon-unplated_kda8xs.png" alt="Microphones" /> </a>
            </div>

        </div>
      </section>

      
    </div>
  );
}

export default Home;
