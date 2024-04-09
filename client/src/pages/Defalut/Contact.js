import React from 'react';

const Contact = () => {
  return (
    <div>
      <header>
        <h1>Contact Us</h1>
    </header>
      <div className="container">
          <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>If you have any questions, feedback, or partnership inquiries, please don't hesitate to reach out to us.</p>
              <ul>
                  <li>Email: <a href="mailto:contact@aplisociety.com">contact@aplisociety.com</a></li>
                  <li>Phone: +1234567890</li>
                  <li>Address: 123 Apli Society Street, City, Country</li>
              </ul>
          </div>
          <form className="contact-form" action="#" method="POST">
              <h2>Send Us a Message</h2>
              <input type="text" name="name" placeholder="Your Name" required/>
              <input type="email" name="email" placeholder="Your Email" required/>
              <textarea name="message" placeholder="Your Message" required></textarea>
              <button type="submit">Send Message</button>
          </form>
      </div>
    </div>
  );
};

export default Contact;
