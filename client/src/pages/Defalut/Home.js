import React, { useEffect } from "react";
import Image1 from '../../Images/1.jpeg';
import Image3 from '../../Images/3.jpeg';
import Image4 from '../../Images/4.jpeg';
import './Home.css'

const Home = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      document.querySelector('.carousel-control-next').click();
    }, 4000); // Adjust the duration here, 5000 milliseconds = 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-md">
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Image1} className="d-block w-100 carousel-image" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img src={Image3} className="d-block w-100 carousel-image" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img src={Image4} className="d-block w-100 carousel-image" alt="Third slide" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
