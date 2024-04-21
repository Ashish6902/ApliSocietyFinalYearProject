import React, { useState, useContext, useEffect, useRef } from 'react';
import AdminsDataContext from '../../context/AdminsData/AdminsDataContext';
import { useLocation } from 'react-router-dom';
import AdminDataItem from '../../Components/AdminDataItem';

const AdminDetails = () => {
  const location = useLocation();
  const { Adminsdata, getAllAdmins, addAdmins } = useContext(AdminsDataContext);
  const refAdd = useRef(null);
  useEffect(() => {
    if (location.state) {
      getAllAdmins(location.state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: 'password123',
    phone: '',
    Address: '',
    roomNo: '',
    societyId: location.state
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (formData.name.trim() === '') {
      errors.name = 'Please enter a name.';
    }
    if (formData.email.trim() === '') {
      errors.email = 'Please enter an email.';
    }
    if (formData.phone.trim() === '') {
      errors.phone = 'Please enter a phone number.';
    }
    if (formData.phone.length !== 10) {
      errors.phone = 'Phone number should be 10 digits.';
    }
    if (formData.Address.trim() === '') {
      errors.Address = 'Please enter an address.';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // If no errors, submit form
    addAdmins(formData.name, formData.email, formData.password, formData.phone, formData.Address, formData.roomNo, formData.societyId);
    setFormData({
      name: '',
      email: '',
      password: 'password123',
      phone: '',
      Address: '',
      roomNo: '',
      societyId: location.state
    });
    refAdd.current.click();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear validation error when user types
  };

  return (
    <div className='container-md'>
      <div className='container-md'>
        <button type="button" className="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add <i class="fa-regular fa-square-plus"></i>
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Society</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="col-form-label">Name:</label>
                    <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="title" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="col-form-label">Email:</label>
                    <input type='email' className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="description" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact" className="col-form-label">Password:</label>
                    <input type="text" className="form-control" id="contact" name="password" value={formData.password} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Phone" className="col-form-label">Phone:</label>
                    <input type="number" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} id="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Address" className="col-form-label">Address:</label>
                    <textarea className={`form-control ${errors.Address ? 'is-invalid' : ''}`} id="Address" name="Address" value={formData.Address} onChange={handleChange} />
                    {errors.Address && <div className="invalid-feedback">{errors.Address}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="roomNo" className="col-form-label">Room No:</label>
                    <input type="text" className="form-control" id="roomNo" name="roomNo" value={formData.roomNo} onChange={handleChange} />
                  </div>
                  <div className="modal-footer">
                    <button ref={refAdd} type="button" className="btn btn-warning" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-success">Save changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className='table table-hover table-bordered'>
            <thead className='table-dark'>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Phone</th>
                <th scope='col'>Address</th>
                <th scope='col'>Room No</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>
              {(!Array.isArray(Adminsdata) || Adminsdata.length === 0) ? (
                <tr>
                  <td colSpan="6">No societies to display</td>
                </tr>
              ) : (
                Adminsdata.map((admin) => (
                  <AdminDataItem key={admin._id} admin={admin} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
