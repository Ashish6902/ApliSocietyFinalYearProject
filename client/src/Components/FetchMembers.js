import React, { useRef, useContext } from 'react';
import MemberContext from '../context/Members/MemberContext';
import './FetchMembers.css';

const FetchMembers = ({ members }) => {
  const refCloseDelete = useRef(null);
  const { deleteMembers } = useContext(MemberContext);

  const handleDelete = (id) => {
    deleteMembers(id);
    refCloseDelete.current.click();
  };

  return (
    <div className="members-table-container">
      <table className="members-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Room No</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.Address}</td>
              <td>{member.roomNo}</td>
              <td>
                <button type="button" className="delete-button" data-bs-toggle="modal" data-bs-target={`#deleteModal${member._id}`}>
                  Delete <i className="fa-solid fa-trash"></i>
                </button>
                <div className="modal fade" id={`deleteModal${member._id}`} tabIndex="-1" aria-labelledby={`deleteModalLabel${member._id}`} aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id={`deleteModalLabel${member._id}`}>Do you want to delete this Member?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-footer">
                        <button ref={refCloseDelete} type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="button" className="btn btn-primary" onClick={() => handleDelete(member._id)}>Yes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchMembers;
