import React, { useState, useContext, useEffect } from 'react';
import TransactionsContext from '../context/Transactions/TransactionsContext';
import FetchTransactions from '../Components/FetchTransactions';
import { Link } from 'react-router-dom';

const TransactionData = () => {
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const { Transaction, getAllTransactions, getTotalFunds, totalFunds } = useContext(TransactionsContext);

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [startDate, setStartDate] = useState(formatDate(firstDayOfMonth));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [sortedFilteredTransactions, setSortedFilteredTransactions] = useState([]);

  useEffect(() => {
    getAllTransactions();
    getTotalFunds();
  }, [getAllTransactions, getTotalFunds]);

  useEffect(() => {
    if (Array.isArray(Transaction)) {
      const filteredTransactions = Transaction.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return transactionDate >= start && transactionDate <= end;
      });
      const sortedTransactions = filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      setSortedFilteredTransactions(sortedTransactions);
    }
  }, [Transaction, startDate, endDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div className='container'>
      <h3>Total Amount: {totalFunds}</h3>
      <Link className='btn btn-primary' to='/BalanceSheet'>Balance Sheet</Link>
      <div>
        <label htmlFor="startDate">Start Date: </label>
        <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
      </div>
      <div>
        <label htmlFor="endDate">End Date: </label>
        <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
      </div>
      {sortedFilteredTransactions.length === 0 ? 'No transactions to display' : (
        sortedFilteredTransactions.map((transaction) => (
          <FetchTransactions key={transaction._id} Transaction={transaction} />
        ))
      )}
    </div>
  );
};

export default TransactionData;
