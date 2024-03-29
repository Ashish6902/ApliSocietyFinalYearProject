import React, { useContext, useEffect, useState } from 'react';
import TransactionsContext from '../../context/Transactions/TransactionsContext';
import FundsTable from '../../Components/FundsTable';
import Addtransactions from '../../Components/Addtransactions';
import { Link } from 'react-router-dom';

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
    <div className='container'>
      <h1>Dashboard</h1>
      <Addtransactions addTransaction={addTransaction} />
      <br />
      <Link className='btn btn-primary' to='/BalanceSheet'>
        Balance Sheet
      </Link>
      <br />
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Description</th>
            <th scope='col'>Date</th>
            <th scope='col'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan='3'>Loading...</td>
            </tr>
          ) : Transaction && Transaction.length > 0 ? (
            Transaction.slice().reverse().map((funds) => (
              <FundsTable key={funds._id} funds={funds} deleteTransaction={deleteTransaction} />
            ))
          ) : (
            <tr>
              <td colSpan='3'>No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
