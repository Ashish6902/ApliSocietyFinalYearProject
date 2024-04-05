import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const SocietyItem = (props) => {
  const { SocietyName, date, Address, Contact } = props.Society;
  return (
    <tr>
      <td>{SocietyName}</td>
      <td>{formatDate(date)}</td>
      <td>{Address}</td>
      <td>{Contact}</td>
      <td>
        <Link className='btn btn-primary my-2 mx-2' to='/AdminDetails'>
          Admin info
        </Link>
        <button className='btn btn-primary my-2 mx-2'>Update</button>
        <button className='btn btn-primary my-2 mx-2'>Delete</button>
      </td>

    </tr>
  );
}

export default SocietyItem;
