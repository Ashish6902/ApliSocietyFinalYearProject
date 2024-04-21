import React, { useState, useContext, useEffect } from 'react';
import TransactionsContext from '../../context/Transactions/TransactionsContext';
import BalanceSheetTable from '../../Components/BalanceSheetTable';

const AdminBalanceSheet = () => {
  const formatDate = (date) => {
    // Format date as YYYY-MM-DD (required for input type="date")
    return date.toISOString().split('T')[0];
  };

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const { Transaction, getAllTransactions, getTotalFunds, totalFunds } = useContext(TransactionsContext);
  const [startDate, setStartDate] = useState(formatDate(firstDayOfMonth));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [debit, setDebit] = useState(0);
  const [credit, setCredit] = useState(0);
  const [sortedFilteredTransactions, setSortedFilteredTransactions] = useState([]);

  useEffect(() => {
    getAllTransactions();
    getTotalFunds();
    // eslint-disable-next-line 
  }, []);

  useEffect(() => {
    const filterAndSortTransactions = () => {
      const filteredTransactions = Transaction.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return transactionDate >= start && transactionDate <= end;
      });
      const sortedTransactions = filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      setSortedFilteredTransactions(sortedTransactions);
    };

    filterAndSortTransactions();
  }, [Transaction, startDate, endDate]);

  useEffect(() => {
    let debitTotal = 0;
    let creditTotal = 0;
    sortedFilteredTransactions.forEach(transaction => {
      if (transaction.amount >= 0) {
        debitTotal += transaction.amount;
      } else {
        creditTotal -= transaction.amount; // Negate the negative amount to make it positive
      }
    });
    setDebit(debitTotal);
    setCredit(creditTotal);
  }, [sortedFilteredTransactions]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div className='container'>
     <h3 className='my-3'>Total Amount: {totalFunds}</h3> {/* Display the total amount */}
     <div className='my-4 d-inline '>
       <label htmlFor="startDate ">Start Date:</label>
       <input className="mx-2" type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
       <p className='d-inline mx-2 my-2'>to</p>
     </div>
     <div className='my-4 d-inline'>
       <label htmlFor="endDate">End Date: </label>
       <input className="mx-2 my-2"  type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
     </div>
     <table className="table table-bordered table-hover my-5" >
        <thead className='table-dark'>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Debit</th>
            <th scope="col">Credit</th>
          </tr>
        </thead>
        <tbody>
      {sortedFilteredTransactions.length === 0 ? (
        <tr>
          <td colSpan="4">No transactions to display</td>
        </tr>
      ) : (
        sortedFilteredTransactions.map((transaction) => (
            <BalanceSheetTable key={transaction._id} Transaction={transaction}/>
          ))
        )}
       <tr>
         <td></td>
         <td></td>
         <td>Total Debit: {debit}</td>
         <td>Total Credit: {credit}</td>
       </tr>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={() => window.print()}>Print Balance Sheet</button>
    </div>
  );
};

export default AdminBalanceSheet;
