import React from 'react'

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

const BalanceSheetTable = (props) => {
    const { information, date, amount } = props.Transaction;
  return (
    <tr>
        <td>{formatDate(date)}</td>
        <td>{information}</td>
        <td>{amount>0 ? amount:""}</td>
        <td>{amount<0 ? amount:""}</td>
    </tr>
  )
}

export default BalanceSheetTable