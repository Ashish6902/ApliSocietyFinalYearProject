import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../../Components/Notification';

const EmailBroadcast = () => {
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [notification, setNotification] = useState(null); // State for notification

  const authToken = localStorage.getItem('authToken');

  const handleSubjectChange = (e) => {
    setEmailSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setEmailMessage(e.target.value);
  };

  const handleSendEmail = async () => {
    // Check if email subject or message is empty
    if (!emailSubject.trim() || !emailMessage.trim()) {
      setNotification({ type: 'danger', msg: 'Email subject and message are required.' });
      return; // Stop further execution
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/secretary/Mail',
        { title: emailSubject, msg: emailMessage },
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
          },
        }
      );
      console.log(response.data); // Logging the response from the server
      // Display success notification
      setNotification({ type: 'success', msg: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      // Display error notification
      setNotification({ type: 'danger', msg: 'Failed to send email. Please try again.' });
    }
  };

  const handleNotificationClose = () => {
    // Clear the notification when closed
    setNotification(null);
  };

  return (
    <div className='container'>
      {notification && (
        <Notification
          type={notification.type}
          msg={notification.msg}
          onClose={handleNotificationClose}
        />
      )}
      <center>
        <h1>Email Broadcast</h1>
        <div>
          <label htmlFor="subject">Subject</label><br/>
          <input
            type="text"
            id="subject"
            value={emailSubject}
            onChange={handleSubjectChange}
            placeholder="Enter email subject"
          />
        </div>
        <br/>
        <div>
          <label htmlFor="message">Message</label><br/>
          <textarea
            id="message"
            value={emailMessage}
            onChange={handleMessageChange}
            placeholder="Type your message here"
            rows={5}
            cols={50}
          />
        </div>
        <br />
        <button className="btn btn-success" onClick={handleSendEmail}>Send Email</button>
      </center>
    </div>
  );
};

export default EmailBroadcast;
