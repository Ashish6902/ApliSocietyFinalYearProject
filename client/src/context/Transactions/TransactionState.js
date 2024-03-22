import React, { useState, useEffect, useCallback } from 'react';
import TransactionsContext from './TransactionsContext';

const MemberState = (props) => {
  const host = 'http://localhost:5000';
  const [Transaction, setTransaction] = useState([]);
  const [totalFunds, setTotalFunds] = useState(0); 
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

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      // Api call
      await fetch(`${host}/api/secretary/deleteFunds/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': authToken
          },
      });
      
      // Update state after deletion
      setTransaction(transactions => transactions.filter(transaction => transaction._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  }
  // Add Transactions
const addTransaction = async (information, date, amount) => {
  try {
    // Api call
    const response = await fetch(`${host}/api/secretary/AddFunds`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken
        },
        body: JSON.stringify({ information, date, amount})
    });
    const transaction = await response.json();
    setTransaction([...Transaction, transaction]);
  } catch (error) {
    console.error('Error adding transaction:', error);
  }
}


  return (
    <TransactionsContext.Provider value={{ Transaction, setTransaction, getAllTransactions, totalFunds,getTotalFunds,addTransaction, deleteTransaction }}>
      {props.children}
    </TransactionsContext.Provider>
  );
};

export default MemberState;
