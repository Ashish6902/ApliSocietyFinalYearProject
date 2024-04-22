import React, { useRef,useContext } from 'react';
import MemberContext from '../context/Members/MemberContext';


const FetchMembers = ({ members }) => {

  const refCloseDelete = useRef(null);
  const { deleteMembers } = useContext(MemberContext);

  const handleDelete = (id) => {
    deleteMembers(id);
    refCloseDelete.current.click();
  }

  return (
    <div>
      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Room No</th>
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
                <div>
                  <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#deleteModal${member._id}`}>
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
