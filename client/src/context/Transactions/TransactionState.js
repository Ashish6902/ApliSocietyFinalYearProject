import React, { useState, useEffect, useCallback } from 'react';
import TransactionsContext from './TransactionsContext';

const MemberState = (props) => {
  const host = 'http://localhost:5000';
  const [Transaction, setTransaction] = useState([]);
  const [totalFunds, setTotalFunds] = useState(0); // State to hold the total funds
  const authToken = localStorage.getItem('authToken');

  // Fetch transactions
  const getAllTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${host}/api/secretary/fetchFunds`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });
      const json = await response.json();
      setTransaction(json);
    } catch (error) {
      console.error('Error fetching Members:', error);
    }
  }, [authToken, host]);

  // Fetch total funds
  const getTotalFunds = useCallback(async () => {
    try {
      const response = await fetch(`${host}/api/secretary/TotalFunds`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });
      const total = await response.json();
      setTotalFunds(total);
    } catch (error) {
      console.error('Error fetching total funds:', error);
    }
  }, [authToken, host]);

  useEffect(() => {
    if (authToken) {
      getAllTransactions();
      getTotalFunds();
    }
  }, [authToken, getAllTransactions, getTotalFunds]);

  return (
    <TransactionsContext.Provider value={{ Transaction, setTransaction, getAllTransactions, totalFunds }}>
      {props.children}
    </TransactionsContext.Provider>
  );
};

export default MemberState;
