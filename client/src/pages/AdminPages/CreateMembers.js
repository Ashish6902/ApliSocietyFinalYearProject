import React, { useContext, useEffect, useRef, useState } from 'react';
import MemberContext from '../../context/Members/MemberContext';
import FetchMembers from '../../Components/FetchMembers';

const CreateMembers = () => {
  const { Members, getAllMembers, addMembers } = useContext(MemberContext);

  useEffect(() => {
    getAllMembers()
      // eslint-disable-next-line 
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: 'password123',
    phone: '',
    Address: '',
    roomNo: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { name, email, password, phone, Address, roomNo } = formData;
    addMembers(name, email, password, phone, Address, roomNo);
    // Clear form after submission
    setFormData({
      name: '',
      email: '',
      password: 'password123',
      phone: '',
      Address: '',
      roomNo: '',
    });
    getAllMembers();
  };

  const refClose = useRef(null);

  const closeModal = () => {
    refClose.current.click();
  };

  return (
    <>
      <div className="container">
        <h1>Members</h1>

        <div>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add <i class="fa-regular fa-square-plus"></i>
          </button>

          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Add Member</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="col-form-label">Name:</label>
                      <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={formData.name} autoComplete="off" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="col-form-label">Email:</label>
                      <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={formData.email} autoComplete="off" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="col-form-label">Password:</label>
                      <input type="text" className="form-control" id="password" name="password" onChange={handleChange} value={formData.password} autoComplete="off" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="col-form-label">Phone:</label>
                      <input type="text" className="form-control" id="phone" name="phone" onChange={handleChange} value={formData.phone} autoComplete="off" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Address" className="col-form-label">Address:</label>
                      <input type="text" className="form-control" id="Address" name="Address" onChange={handleChange} value={formData.Address} autoComplete="off" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="roomNo" className="col-form-label">Room No:</label>
                      <input type="text" className="form-control" id="roomNo" name="roomNo" onChange={handleChange} value={formData.roomNo} autoComplete="off" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={() => { handleSubmit(); closeModal(); }}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!Array.isArray(Members) || Members.length === 0 ? (
          'No members to display'
        ) : (
          <FetchMembers members={Members} />
        )}

      </div>
    </>
  );
};

export default CreateMembers;
