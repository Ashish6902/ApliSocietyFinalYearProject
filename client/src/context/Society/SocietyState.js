import React, { useState, useEffect, useCallback } from 'react';
import SocietyContext from './SocietyContext';

const MemberState = (props) => {
  const host = 'http://localhost:5000';
  const authToken = localStorage.getItem('authToken');
  const [Society, setSociety] = useState([]);

// Fetch Society
const getAllSoticies = useCallback(async () => {
  try {
    const response = await fetch(`${host}/api/superAdmin/SocietyList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
    });
    const json = await response.json();
    setSociety(json);
  } catch (error) {
    console.error('Error fetching Members:', error);
  }
}, [authToken, host]); 

useEffect(() => {
  if (authToken) {
    getAllSoticies();
  }
}, [authToken, getAllSoticies]);

//Add society
 const addSociety = async (SocietyName, Address, Contact) => {
  // Api call
  const response = await fetch(`${host}/api/superAdmin/AddSociety`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
      },
      body: JSON.stringify({ SocietyName, Address, Contact })
  });
  const society = await response.json();
  setSociety([...Society, society]);
}

  return (
    <SocietyContext.Provider value={{Society,getAllSoticies,addSociety}}>
      {props.children}
    </SocietyContext.Provider>
  );
};

export default MemberState;
