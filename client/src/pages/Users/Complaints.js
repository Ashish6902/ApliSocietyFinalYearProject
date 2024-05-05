import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../../Components/Notification'; // Update the path as per your project structure

const Complaints = () => {
  const [complaint, setComplaint] = useState('');
  const [notification, setNotification] = useState(null); // State for notification

  const handleChange = (e) => {
    setComplaint(e.target.value);
  };

  const authToken = localStorage.getItem('authToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/addcomplaints',
        { Complaint: complaint },
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
          },
        }
      );
      console.log(response.data);
      // Display success notification
      setNotification({ type: 'success', msg: 'Complaint submitted successfully!' });
      // Assuming you want to clear the input after successful submission
      setComplaint('');
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleNotificationClose = () => {
    // Clear the notification when closed
    setNotification(null);
  };

  return (
    <div>
      {notification && (
        <Notification
          type={notification.type}
          msg={notification.msg}
          onClose={handleNotificationClose}
        />
      )}
      <h2>Complaints</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={complaint}
          onChange={handleChange}
          placeholder="Enter your complaint"
          rows={4}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Complaints;
