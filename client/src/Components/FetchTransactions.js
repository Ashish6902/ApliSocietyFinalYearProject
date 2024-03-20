import React from 'react';

//fetchDate
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so we add 1
    const year = date.getFullYear();
  
    // Pad day and month with leading zeros if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}-${formattedMonth}-${year}`;
};

const FetchTransactions = ({Transaction}) => {
  return (
    <div className="container my-4" >
        <ul className="list-group" style={{border: '2px solid', borderColor: Transaction.amount < 0 ? 'red' : 'green' }}>
          <li className="list-group-item" style={{ backgroundColor: Transaction.amount < 0 ? 'red' : 'green' }}></li>
          <li className="list-group-item">Date:- {formatDate(Transaction.date)}</li>
          <li className="list-group-item">Amount:-  ({Transaction.amount})Rs.</li>
          <li className="list-group-item">Description:- {Transaction.information}</li>
        </ul>
    </div>
  );
};


export default FetchTransactions;
