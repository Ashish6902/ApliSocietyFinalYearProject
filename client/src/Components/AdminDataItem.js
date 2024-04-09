import React from 'react';

const AdminDataItem = ({ admin }) => {
  const { name, email, phone, Address, roomNo } = admin;

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{Address}</td>
      <td>{roomNo}</td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  );
};

export default AdminDataItem;
