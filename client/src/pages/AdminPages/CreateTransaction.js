import React, { useState, useContext, useEffect } from 'react';
import TransactionsContext from '../../context/Transactions/TransactionsContext';
import FetchTransactions from '../../Components/FetchTransactions';

const CreateTransaction = () => {

  const formatDate = (date) => {
    // Format date as YYYY-MM-DD (required for input type="date")
    return date.toISOString().split('T')[0];
  };

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const { Transaction, getAllTransactions, getTotalFunds, totalFunds } = useContext(TransactionsContext);
  const [startDate, setStartDate] = useState(formatDate(firstDayOfMonth));
  const [endDate, setEndDate] = useState(formatDate(today));

  useEffect(() => {
    getAllTransactions();
    getTotalFunds();
    // eslint-disable-next-line 
  }, []);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filterAndSortTransactions = () => {
    const filteredTransactions = Transaction.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return transactionDate >= start && transactionDate <= end;
    });
    const sortedTransactions = filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedTransactions;
  };

  const sortedFilteredTransactions = filterAndSortTransactions();

  return (
    <div className='container'>
     <h3>Total Amount: {totalFunds}</h3> {/* Display the total amount */}
     <div>
       <label htmlFor="startDate">Start Date: </label>
       <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
     </div>
     <div>
       <label htmlFor="endDate">End Date: </label>
       <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
     </div>
      {!Array.isArray(sortedFilteredTransactions) || sortedFilteredTransactions.length === 0 ? 'No transactions to display' : (
        sortedFilteredTransactions.map((transaction) => (
            <FetchTransactions key={transaction._id} Transaction={transaction}/>
          ))
        )}
    </div>
  );
};

export default CreateTransaction;
