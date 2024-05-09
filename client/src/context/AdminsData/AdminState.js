import React, { useState, useEffect, useCallback } from 'react';
import AdminsDataContext from './AdminsDataContext';

const AdminState = (props) => {
  const host = 'http://localhost:5000';
  const authToken = localStorage.getItem('authToken');
  const [Adminsdata, setAdminData] = useState([]);

// Fetch Society
const getAllAdmins = useCallback(async (id) => {
  try {
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

const addAdmins = async (name, email, password, phone, Address, roomNo,societyId) => {
  // Api call
  const response = await fetch(`${host}/api/superAdmin/Addadmin`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
      },
      body: JSON.stringify({ name, email, password, phone, Address, roomNo,societyId})
  });
  const admin = await response.json();
  setAdminData([...Adminsdata,admin]);
}
// Delete Admin
const deleteAdmin = async (id) => {
  // Api call
  await fetch(`${host}/api/superAdmin/deleteAdmin/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
      },
  });
  setAdminData(Adminsdata.filter(admin => admin._id !== id));
}

  return (
    <AdminsDataContext.Provider value={{Adminsdata,getAllAdmins,addAdmins,deleteAdmin}}>
      {props.children}
    </AdminsDataContext.Provider>
  );
};

export default AdminState;
