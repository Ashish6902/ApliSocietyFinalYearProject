import React, { useState, useEffect, useCallback } from 'react';
import AdminsDataContext from './AdminsDataContext';

const MemberState = (props) => {
  const host = 'http://localhost:5000';
  const authToken = localStorage.getItem('authToken');
  const [Adminsdata, setAdminData] = useState([]);

// Fetch Society
const getAllAdmins = useCallback(async (id) => {
  try {
    console.log("id is" ,id)
    const response = await fetch(`${host}/api/superAdmin/GetAllAdmins`, {
      method: 'POST', // Change the method to POST
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
      body: JSON.stringify({ societyId: id }), // Pass societyId in the request body
    });
    const json = await response.json();
    setAdminData(json);
  } catch (error) {
    console.error('Error fetching Members:', error);
  }
}, [authToken, host]);


useEffect(() => {
  if (authToken) {
    getAllAdmins();
  }
}, [authToken, getAllAdmins]);



  return (
    <AdminsDataContext.Provider value={{Adminsdata,getAllAdmins}}>
      {props.children}
    </AdminsDataContext.Provider>
  );
};

export default MemberState;
