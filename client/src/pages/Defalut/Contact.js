import React from 'react';

const Contact = () => {
  return (
    <div>
      <header>
        <img className="logo" src="aplilogo.png" alt="Apli Society Logo" />
        <h1>Apli Society</h1>
      </header>
      <div className="container">
        <section className="section">
          <h2>About Us</h2>
          <p>Apli Society is a revolutionary social networking platform that aims to connect people based on their interests, passions, and professional expertise. Our mission is to create meaningful connections and foster collaboration among individuals from diverse backgrounds.</p>
        </section>
        <section className="section">
          <h2>Our Vision</h2>
          <p>Our vision is to build a global community where individuals can discover like-minded peers, share knowledge, and engage in meaningful discussions. We believe in the power of networking and collaboration to drive innovation and positive change in the world.</p>
        </section>
        <section className="section">
          <h2>Our Team</h2>
          <p>At Apli Society, we have a dedicated team of passionate professionals who are committed to realizing our vision. From software engineers to designers to community managers, each member of our team brings unique skills and experiences to the table.</p>
        </section>
        <section className="section">
          <h2>Contact Us</h2>
          <p>If you have any questions, feedback, or partnership inquiries, please don't hesitate to reach out to us. You can contact us via email at <a href="mailto:contact@aplisociety.com">contact@aplisociety.com</a> or through our social media channels.</p>
        </section>
      </div>
    </div>
  );
};

export default Contact;
