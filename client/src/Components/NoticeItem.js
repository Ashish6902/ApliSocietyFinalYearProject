import React, { useRef, useState,useContext } from 'react';
import  userRoleContext  from "../context/Roles/userRoleContext"; 

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

const NoteItem = ({ Notice, editNotice, deleteNotice }) => {
  const [note, setNote] = useState({ id: Notice._id, title: Notice.title, description: Notice.description, date: Notice.date });
  const refCloseUpdate = useRef(null);
  const refCloseDelete = useRef(null);

  
  const { role,} = useContext(userRoleContext); 


  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const handleSaveChanges = () => {
    editNotice(note.id, note.title, note.description, note.date);
    refCloseUpdate.current.click();
  };

  const handleDelete = () => {
    deleteNotice(note.id);
    refCloseDelete.current.click();
  };

  return (
    <div className="container my-2">
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{formatDate(Notice.date)} -- ({Notice.title})</li>
          <li className="list-group-item">{Notice.description}</li>
          {role === "Admin" && (
          <li className="list-group-item">
            <div>
              {/* button to open update modal */}
              
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#updateModal${Notice._id}`}>
                Update
              </button>

              {/* modal for update */}
              <div className="modal fade" id={`updateModal${Notice._id}`} tabIndex="-1" aria-labelledby={`updateModalLabel${Notice._id}`} aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id={`updateModalLabel${Notice._id}`}>Update Note</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label htmlFor={`title${Notice._id}`} className="col-form-label">Title:</label>
                          <input type="text" className="form-control" id={`title${Notice._id}`} name="title" onChange={onChange} value={note.title} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor={`description${Notice._id}`} className="col-form-label">Description:</label>
                          <textarea className="form-control" id={`description${Notice._id}`} name="description" onChange={onChange} value={note.description}></textarea>
                        </div>
                        <div className="mb-3">
                          <label htmlFor={`date${Notice._id}`} className="col-form-label">Date:</label>
                          <input type="date" className="form-control" id={`date${Notice._id}`} name="date" onChange={onChange} value={note.date} />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button ref={refCloseUpdate} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* button to open delete modal */}
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#deleteModal${Notice._id}`}>
                Delete
              </button>

              {/* modal for delete */}
              <div className="modal fade" id={`deleteModal${Notice._id}`} tabIndex="-1" aria-labelledby={`deleteModalLabel${Notice._id}`} aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id={`deleteModalLabel${Notice._id}`}>Do you want to delete this Notice ?</h1>
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

            
          </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NoteItem;
