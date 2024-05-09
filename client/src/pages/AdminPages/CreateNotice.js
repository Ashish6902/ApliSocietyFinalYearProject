import React, { useState, useContext, useEffect, useRef } from 'react';
import NoticeContext from '../../context/Notice/NoticeContext';
import NoteItem from '../../Components/NoticeItem';

const CreateNotice = () => {
  const { Notice, getAllNotices, addNotice, editNotice, deleteNotice } = useContext(NoticeContext);

  useEffect(() => {
    getAllNotices();
    // eslint-disable-next-line 
  }, []);

  const [notice, setNotice] = useState({ title: "", description: "", date: "" });
  const [errors, setErrors] = useState({ title: "", description: "", date: "" });
  const refClose = useRef(null); // Create a ref for the close button

  const handleChange = (event) => {
    setNotice({ ...notice, [event.target.name]: event.target.value });
    // Clear previous error message when user starts typing
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const handleSubmit = () => {
    // Perform validation before submitting
    if (!notice.title.trim()) {
      setErrors({ ...errors, title: "Title is required" });
      return;
    }
    if (!notice.description.trim()) {
      setErrors({ ...errors, description: "Description is required" });
      return;
    }
    if (!notice.date) {
      setErrors({ ...errors, date: "Date is required" });
      return;
    }

    // All validations passed, proceed with submission
    addNotice(notice.title, notice.description, notice.date);
    setNotice({ title: "", description: "", date: "" });
    refClose.current.click(); // Programmatically close the modal after submitting
  };

  // Create a copy of Notice array and then reverse it
  const reversedNotices = [...Notice].reverse();

  return (
    <>
      <div className="container">
        <h1>Notices</h1>

        <div>
          {/* Button to open modal */}
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add <i className="fa-regular fa-square-plus"></i>
          </button>

          {/* Modal */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Add Notice</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="title" className="col-form-label">Title:</label>
                      <input type="text" className={`form-control ${errors.title && 'is-invalid'}`} id="title" name="title" onChange={handleChange} value={notice.title} />
                      {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="col-form-label">Description:</label>
                      <textarea className={`form-control ${errors.description && 'is-invalid'}`} id="description" name="description" onChange={handleChange} value={notice.description}></textarea>
                      {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="date" className="col-form-label">Date:</label>
                      <input type="date" className={`form-control ${errors.date && 'is-invalid'}`} id="date" name="date" onChange={handleChange} value={notice.date} />
                      {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!Array.isArray(reversedNotices) || reversedNotices.length === 0 ? 'No notes to display' : (
          reversedNotices.map((notice) => (
            <NoteItem key={notice._id} Notice={notice} editNotice={editNotice} deleteNotice={deleteNotice} />
          ))
        )}
      </div>
    </>
  );
};

export default CreateNotice;
