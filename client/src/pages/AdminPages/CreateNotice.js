import React, { useState, useContext, useEffect, useRef } from 'react';
import NoticeContext from '../../context/Notice/NoticeContext';
import NoticeItem from '../../Components/NoticeItem';
import './CreateNotice.css';

const CreateNotice = () => {
  const { Notice, getAllNotices, addNotice, editNotice, deleteNotice } = useContext(NoticeContext);

  useEffect(() => {
    getAllNotices();
    // eslint-disable-next-line
  }, []);

  const [notice, setNotice] = useState({ title: "", description: "", date: "", Noticeimage: "" });
  const [errors, setErrors] = useState({ title: "", description: "", date: "", Noticeimage: "" });
  const refClose = useRef(null); // Create a ref for the close button                               
  const fileInputRef = useRef(null); // Create a ref for the file input field

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "Noticeimage" && files.length > 0) {
      const file = files[0];
      convertToBase64(file);
    } else {
      setNotice({ ...notice, [name]: value });
      // Clear previous error message when user starts typing
      setErrors({ ...errors, [name]: "" });
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNotice(prevState => ({ ...prevState, Noticeimage: reader.result }));
      setErrors(prevState => ({ ...prevState, Noticeimage: "" }));
    };
    reader.onerror = () => {
      setErrors(prevState => ({ ...prevState, Noticeimage: "Failed to upload image" }));
    };
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
    if (!notice.Noticeimage) {
      setErrors({ ...errors, Noticeimage: "Notice image is required" });
      return;
    }

    // All validations passed, proceed with submission
    addNotice(notice.title, notice.description, notice.date, notice.Noticeimage);
    setNotice({ title: "", description: "", date: "", Noticeimage: "" });
    resetFileInput();
    refClose.current.click(); // Programmatically close the modal after submitting
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the value of the file input field to clear the selected file
    }
  };

  // Create a copy of Notice array and then reverse it
  const reversedNotices = [...Notice].reverse();

  return (
    <>
      <div className="container">
        <h1>Notices</h1>

        <div>
          {/* Button to open modal */}
          <button type="button" className="custom-button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setNotice({ title: "", description: "", date: "", Noticeimage: "" })}>
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
                    <div className="mb-3">
                      <label htmlFor="Noticeimage" className="col-form-label">Notice image:</label>
                      <input ref={fileInputRef} type="file" className={`form-control ${errors.Noticeimage && 'is-invalid'}`} id="Noticeimage" name="Noticeimage" onChange={handleChange} />
                      {errors.Noticeimage && <div className="invalid-feedback">{errors.Noticeimage}</div>}
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
            <NoticeItem key={notice._id} Notice={notice} editNotice={editNotice} deleteNotice={deleteNotice} />
          ))
        )}
      </div>
    </>
  );
};

export default CreateNotice;
