// NoticeState.js
import React, { useState, useEffect, useCallback } from 'react';
import NoticeContext from './NoticeContext';

const NoticeState = (props) => {
  const host = 'http://localhost:5000';
  const [Notice, setNotice] = useState([]);
  const authToken = localStorage.getItem('authToken');

  const getAllNotices = useCallback(async () => {
    try {
      const response = await fetch(`${host}/api/secretary/fetchnotices`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });
      const json = await response.json();
      setNotice(json);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  }, [authToken, host]);

  useEffect(() => {
    if (authToken) {
      getAllNotices();
    }
  }, [authToken, getAllNotices]);

  // Add Note 
  const addNotice = async (title, description, date) => {
    // Api call
    const response = await fetch(`${host}/api/secretary/addnotice`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken
        },
        body: JSON.stringify({ title, description, date })
    });
    const notice = await response.json();
    setNotice([...Notice, notice]);
}

//editNotice
const editNotice = async (id, title, description, date) => {
  // Api call
  await fetch(`${host}/api/secretary/updatenotice/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
      },
      body: JSON.stringify({ title, description, date })
  });
  setNotice(Notice.map(note => note._id === id ? { ...note, title, description, date } : note));
}

// Delete Notice
const deleteNotice = async (id) => {
  // Api call
  await fetch(`${host}/api/secretary/deletenotice/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
      },
  });
  setNotice(Notice.filter(note => note._id !== id));
}

  return (
    <NoticeContext.Provider value={{ Notice,setNotice, getAllNotices, addNotice ,editNotice,deleteNotice}}>
      {props.children}
    </NoticeContext.Provider>
  );
};

export default NoticeState;
