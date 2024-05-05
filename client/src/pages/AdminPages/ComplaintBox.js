import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComplaintBox = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch complaints when the component mounts
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/api/secretary/fetchcomplaints', {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });
      // Reverse the complaints array before setting state
      setComplaints(response.data.reverse());
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };
  const deletComplaint = ()=>{
    
  }

  const handleResolveComplaint = async (id) => {
    try {
      const authToken = localStorage.getItem('authToken');
      await axios.put(
        `http://localhost:5000/api/secretary/Resolvedcomplaint/${id}`,
        {}, // empty object for the request body
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
          },
        }
      );
      // If the complaint is resolved, update the complaints state
      setComplaints(prevComplaints =>
        prevComplaints.map(complaint =>
          complaint._id === id ? { ...complaint, isActive: !complaint.isActive } : complaint
        )
      );
    } catch (error) {
      console.error('Error resolving complaint:', error);
    }
  };

  return (
    <div>
      <h2>Complaints</h2>
      <table>
        <thead>
          <tr>
            <th>Complaint</th>
            <th>Resolve</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map(complaint => (
            <tr key={complaint._id}>
              <td style={{ textDecoration: complaint.isActive ? 'none' : 'line-through' }}>{complaint.Complaint}</td>
              <td>
                  <button onClick={() => handleResolveComplaint(complaint._id)}>Resolve</button>
              </td>
              <td>
              <button onClick={() => deletComplaint(complaint._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintBox;
