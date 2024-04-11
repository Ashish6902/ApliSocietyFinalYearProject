import React, { useRef, useContext } from 'react';
import AdminsDataContext from '../context/AdminsData/AdminsDataContext';

const AdminDataItem = ({ admin }) => {
  const { _id, name, email, phone, Address, roomNo } = admin;
  const { deleteAdmin } = useContext(AdminsDataContext);
  const refCloseDelete = useRef(null);

  const handleDelete = () => {
    deleteAdmin(_id);
    refCloseDelete.current.click();
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{Address}</td>
      <td>{roomNo}</td>
      <td>
        <div>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#deleteModal${_id}`}>
            Delete
          </button>
          <div className="modal fade" id={`deleteModal${_id}`} tabIndex="-1" aria-labelledby={`deleteModalLabel${_id}`} aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id={`deleteModalLabel${_id}`}>Do you want to delete this Member?</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-footer">
                  <button ref={refCloseDelete} type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                  <button type="button" className="btn btn-primary" onClick={handleDelete}>Yes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default AdminDataItem;
