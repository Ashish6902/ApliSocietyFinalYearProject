import React, { useContext, useEffect, useState } from 'react';
import TransactionsContext from '../../context/Transactions/TransactionsContext';
import FundsTable from '../../Components/FundsTable';
import Addtransactions from '../../Components/Addtransactions';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { Transaction, addTransaction, getAllTransactions, deleteTransaction } = useContext(TransactionsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTransactions()
      .then(() => setLoading(false))
      .catch(error => {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className='dashboard-container'>
      <h1>Dashboard</h1>
      <Link className='balance-sheet-link' to='/BalanceSheet'>
        Balance Sheet
      </Link>

      <Addtransactions addTransaction={addTransaction} />
      
      <table className='funds-table'>
        <thead className='table-header'>
          <tr>
            <th>Description</th>
            <th>Date</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan='4'>Loading...</td>
            </tr>
          ) : Transaction && Transaction.length > 0 ? (
            Transaction.slice().reverse().map((funds) => (
              <FundsTable key={funds._id} funds={funds} deleteTransaction={deleteTransaction} />
            ))
          ) : (
            <tr>
              <td colSpan='4'>No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
