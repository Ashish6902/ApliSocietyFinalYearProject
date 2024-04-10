import React, { useState, useContext, useEffect,useRef } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, phone, Address, roomNo,societyId } = formData;
    addAdmins(name, email, password, phone, Address, roomNo,societyId);
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
  };

  return (
    <div className='container-md'>
      <div className='container-md'>
        <button type="button" className="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add
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
                    <input type="text" className="form-control" id="title" name="name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="col-form-label">Email:</label>
                    <input type='email' className="form-control" id="description" name="email" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact" className="col-form-label">Password:</label>
                    <input type="text" className="form-control" id="contact" name="password" value={formData.password} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Phone" className="col-form-label">Phone:</label>
                    <input type="number" className="form-control" id="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Address" className="col-form-label">Address:</label>
                    <textarea className="form-control" id="Address" name="Address" value={formData.Address} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="roomNo" className="col-form-label">Room No:</label>
                    <input type="text" className="form-control" id="roomNo" name="roomNo" value={formData.roomNo} onChange={handleChange} />
                  </div>
                  <div className="modal-footer">
                    <button ref={refAdd} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Save changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <div className="table-responsive">
          <table className='table table-bordered'>
            <thead>
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
