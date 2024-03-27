import React, { useState, useEffect, useCallback } from 'react';
import MemberContext from './MemberContext';

const MemberState = (props) => {
  const host = 'http://localhost:5000';
  const [Members, setMembers] = useState([]);
  const authToken = localStorage.getItem('authToken');
  const [Member,setMember] =useState("")


  // Fetch member
const getMember = useCallback(async (_id) => {
  try {
    const response = await fetch(`${host}/api/user/fetchmember`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
      body: JSON.stringify({ _id })
    });
    const json = await response.json();
    setMember(json);
  } catch (error) {
    console.error('Error fetching Member:', error);
  }
}, [authToken, host]);

  

  //fetch members
  const getAllMembers = useCallback(async () => {
    try {
      const response = await fetch(`${host}/api/secretary/fetchmembers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });
      const json = await response.json();
      setMembers(json);
    } catch (error) {
      console.error('Error fetching Members:', error);
    }
  }, [authToken, host]);

  useEffect(() => {
    if (authToken) {
        getAllMembers();
    }
  }, [authToken, getAllMembers]);

// Add Members 
const addMembers = async (name, email, password, phone, Address, roomNo) => {
  // Api call
  const response = await fetch(`${host}/api/secretary/Addmembers`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
      },
      body: JSON.stringify({ name, email, password, phone, Address, roomNo})
  });
  const member = await response.json();
  setMembers([...Members,member]);
}
//update members
const updateMembers = async (id,name , Address,roomNo) => {
  // Api call
  const response = await fetch(`${host}/api/user/updateUser/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
      },
      body: JSON.stringify({ name, Address,roomNo })
  });
  const json = await response.json();
    setMember(json);
}

// Delete members
const deleteMembers = async (id) => {
  // Api call
  await fetch(`${host}/api/secretary/deleteUser/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
      },
  });
  setMembers(Members.filter(member => member._id !== id));
}

//update Password
const updatePassword = async (id,currentPass , newPass) => {
  // Api call
  await fetch(`${host}/api/user/changepassword/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
      },
      body: JSON.stringify({currentPass , newPass})
  });
  console.log(newPass)
}

  return (
    <MemberContext.Provider value={{Members, setMembers,getAllMembers,deleteMembers,addMembers,updateMembers,getMember,Member,updatePassword}}>
      {props.children}
    </MemberContext.Provider>
  );
};

export default MemberState;