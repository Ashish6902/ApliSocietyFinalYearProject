import React, { useContext, useEffect, useRef, useState } from 'react';
import MemberContext from '../../context/Members/MemberContext';
import FetchMembers from '../../Components/FetchMembers';

const CreateMembers = () => {
    const { Members, getAllMembers, addMembers } = useContext(MemberContext);

    useEffect(() => {
        getAllMembers();
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

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        Address: '',
        roomNo: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user starts typing
    };

    const handleSubmit = () => {
      let isValid = true;
      const { name, email, phone, Address, roomNo } = formData;
  
      // Basic validation: check if fields are not empty
      if (!name.trim()) {
          setErrors(prevErrors => ({ ...prevErrors, name: 'Please enter name.' }));
          isValid = false;
      }
      if (!email.trim()) {
          setErrors(prevErrors => ({ ...prevErrors, email: 'Please enter email.' }));
          isValid = false;
      }
      if (!phone.trim()) {
          setErrors(prevErrors => ({ ...prevErrors, phone: 'Please enter phone number.' }));
          isValid = false;
      }
      if(phone.length !== 10){
        setErrors(prevErrors => ({ ...prevErrors, phone: 'Please enter 10 digit phone number.' }));
        isValid =false;
      }
      if (!Address.trim()) {
          setErrors(prevErrors => ({ ...prevErrors, Address: 'Please enter address.' }));
          isValid = false;
      }
      if (!roomNo.trim()) {
          setErrors(prevErrors => ({ ...prevErrors, roomNo: 'Please enter room number.' }));
          isValid = false;
      }
  
      if (isValid) {
          addMembers(name, email, 'password123', phone, Address, roomNo);
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
          closeModal(); // Close modal only if form submission is successful
      }
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
                    <button type="button" className="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                            <input type="text" className={`form-control ${errors.name && 'is-invalid'}`} id="name" name="name" onChange={handleChange} value={formData.name} autoComplete="off" />
                                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="col-form-label">Email:</label>
                                            <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} id="email" name="email" onChange={handleChange} value={formData.email} autoComplete="off" />
                                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="col-form-label">Password:</label>
                                            <input type="text" className="form-control" id="password" name="password" value="password123" disabled />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="col-form-label">Phone:</label>
                                            <input type="Number" className={`form-control ${errors.phone && 'is-invalid'}`} id="phone" name="phone" onChange={handleChange} value={formData.phone} autoComplete="off" />
                                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="Address" className="col-form-label">Address:</label>
                                            <input type="text" className={`form-control ${errors.Address && 'is-invalid'}`} id="Address" name="Address" onChange={handleChange} value={formData.Address} autoComplete="off" />
                                            {errors.Address && <div className="invalid-feedback">{errors.Address}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="roomNo" className="col-form-label">Room No:</label>
                                            <input type="text" className={`form-control ${errors.roomNo && 'is-invalid'}`} id="roomNo" name="roomNo" onChange={handleChange} value={formData.roomNo} autoComplete="off" />
                                            {errors.roomNo && <div className="invalid-feedback">{errors.roomNo}</div>}
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={() => { handleSubmit(); }}>Save changes</button>
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
