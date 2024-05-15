import React from 'react';
import './Contact.css'; // Import the CSS file

const Contact = () => {
  return (
    <div>
      <header>
        <h2>Contact Us</h2>
      </header>
      <div className="contact container contact-section">
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
  );
};

export default Contact;
