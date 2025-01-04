import React from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className='video-container'>
          <iframe
            width="900"
            height={450}
            className="hero-video"
            src="https://www.youtube.com/embed/Vi4D_o7fIVE?autoplay=1&loop=1&playlist=Vi4D_o7fIVE&mute=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
        <div className="hero-content">
          <h1>“THE FUTURE SOUND”</h1>
          <Link to="/about">
            <button className="shop-now">ABOUT HD AUDIO</button>
          </Link>
        </div>
      </div>


      <div className="about-container">
        <p>
          HD AUDIO is a New Range of Acoustically Designed Professional Audio Gear made with Sound Engineers in Mind ,especially for the ever evolving Sound technology requirements.

          We are the industry leaders in the design, and distribution of premium sound reinforcement technologies & Audio Visual accesories 
          <br></br><br></br>
          MICROPHONES •AMPLIFIERS • SPEAKERS • MIXERS •AUDIO VISUAL ACCESORIES
        </p>
      </div>

      <section>
        <h2>Our Clients</h2> 
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

      
    </div>
  );
}

export default Home;
