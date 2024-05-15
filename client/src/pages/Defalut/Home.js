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
    <div className="container-md" id="home-section">
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
      <div className='outsideBox' id = 'about-section'>
      <div className="container my-4 box">
        <section className="blog-post">
          <h2>Society happening</h2>
          <p>
            Connect with your neighbors, share ideas, and stay informed about
            events happening in your community.At Apli Society, we believe in
            fostering vibrant and connected communities. Our platform is designed
            to empower you to manage your society effortlessly, ensuring seamless
            communication, collaboration, and organization
          </p>
        </section>

        <section className="blog-post">
          <h2>Funds stuff info</h2>
          <p>
          Effortlessly Manage Housing Society Finances: Bid farewell to manual collection hassles.
          Our automated system streamlines dues collection, ensuring prompt and secure transactions,
          thereby promoting the financial well-being of your society. Seamlessly Handle Event Payments:
          Organizing events becomes a breeze with our platform. From ticket sales to registration fees,
          every aspect is managed efficiently, simplifying event coordination. Enable Convenient Donations:
          Whether it's for a noble cause or a community project, Apli Society offers a hassle-free way for 
          members to contribute and support initiatives important to your community. Transparent Financial Tracking:
          Stay informed about all transactions effortlessly. Our transparent financial tracking feature provides 
          real-time insights into your society's finances, fostering accountability and trust among members.
          </p>
          <p>
            Join Apli Society today and experience the convenience and efficiency
            of our funding and payment solutions. Together, let's build stronger,
            more vibrant communities, one payment at a time.
          </p>
        </section>
      </div>
    </div>
    <div>
      <header>
        <h2>Contact Us</h2>
      </header>
      <div className="contact container" id = "contact-section">
          <div className="contact-info-box">
              <h3>Get in Touch</h3>
              <p>If you have any questions, feedback, or partnership inquiries, please don't hesitate to reach out to us.</p>
              <ul className="contact-info-list">
                  <li className="contact-info-item">Email: <a className="contact-info-link" href="mailto:contact@aplisociety.com">contact@aplisociety.com</a></li>
                  <li className="contact-info-item">Phone: +1234567890</li>
                  <li className="contact-info-item">Address: 123 Apli Society Street, City, Country</li>
              </ul>
          </div>
          <form className="contact-form-box" action="mailto:jadhav.ashish2002@gmail.com" method="POST">
              <h4>Send Us a Message</h4>
              <input className="contact-input" type="text" name="name" placeholder="Your Name" required/>
              <input className="contact-input" type="email" name="email" placeholder="Your Email" required/>
              <textarea className="contact-textarea" name="message" placeholder="Your Message" required></textarea>
              <button className="contact-submit-btn" type="submit">Send Message</button>
          </form>
      </div>
    </div>
    </div>
  );
};

export default Home;
