import React, { useContext, useEffect, useRef, useState } from "react";
import userRoleContext from "../context/Roles/userRoleContext";
import MemberContext from "../context/Members/MemberContext";
import Notification from "../Components/Notification";
import "./UpdateUserData.css"

const UpdateUserData = () => {
  const { userId } = useContext(userRoleContext);
  const { getMember, Member, updateMembers, updatePassword } = useContext(MemberContext);
  const updateCloseRef = useRef(null);
  const resetPasswordCloseRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    Address: "",
    roomNo: "",
  });

  const [changepassword, setChangePassword] = useState({
    currentPassword: "",
    newpassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (userId) {
      getMember(userId);
    }
  }, [getMember, userId]);

  useEffect(() => {
    if (Member) {
      setFormData({
        name: Member.name,
        Address: Member.Address,
        roomNo: Member.roomNo,
      });
    }
  }, [Member]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangePass = (e) => {
    setChangePassword({ ...changepassword, [e.target.name]: e.target.value });
  };

  const  [errors,setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
  
    // Validation for Name
    if (formData.name.trim() === '') {
      errors.name = 'Please enter a name.';
    }
  
    // Validation for Address
    if (formData.Address.trim() === '') {
      errors.Address = 'Please enter an address.';
    }
  
    // Validation for Room No
    if (formData.roomNo.trim() === '') {
      errors.roomNo = 'Please enter a room number.';
    }
  
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return; // Prevent form submission if there are errors
    }
  
    // If all validations pass, proceed to update member details
    updateMembers(userId, formData.name, formData.Address, formData.roomNo);
    updateCloseRef.current.click();
  };
  

  
  const handleSubmitPass = async (e) => {
    e.preventDefault();
  
    // Initialize errors object
    const errors = {};
  
    // Check if any fields are empty
    if (!changepassword.currentPassword || !changepassword.newpassword || !changepassword.confirmPassword) {
      errors.password = "Please fill in all fields";
    }
  
    // Check if new password matches confirm password
    if (changepassword.newpassword !== changepassword.confirmPassword) {
      errors.newpassword = "Passwords don't match";
    }
  
    // If there are errors, setErrors and return to prevent further execution
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    // Proceed with password update if there are no errors
      const ans = await updatePassword(userId, changepassword.currentPassword, changepassword.newpassword);
      if(ans === false){
        setAlert(true);
      }else if(ans === true){
        setalertSucces(true);
      }

      resetPasswordCloseRef.current.click();
  };
  
  
  const [alert, setAlert] = useState(false); // Use useState hook for alert
  const [alertSucces ,setalertSucces] = useState(false);

  const handleCloseNotification = () => {
    setAlert(false);
    setalertSucces(false);
  };


  return (
    <div className="container-userdata">
      {Member && (
        <div className="container">
          <h2>Member Details</h2>
          {alert && <Notification type="danger" msg=" Current password is Wrong try agin" onClose={handleCloseNotification} />}
          {alertSucces && <Notification type="success" msg=" Current password is Wrong try agin" onClose={handleCloseNotification} />}
          <div className="container">
            <p className="my-2 px-2"><strong>Name:</strong> {Member.name}</p>
            <p className="my-2 px-2"><strong>Email:</strong> {Member.email}</p>
            <p className="my-2 px-2"><strong>Phone:</strong> {Member.phone}</p>
            <p className="my-2 px-2"><strong>Address:</strong> {Member.Address}</p>
            <p className="my-2 px-2"><strong>Room No:</strong> {Member.roomNo}</p>
            <button type="button" className="btn btn-warning my-2" data-bs-toggle="modal" data-bs-target="#updateModal">
              Update
            </button>
            <button type="button" className="btn btn-warning mx-2" data-bs-toggle="modal" data-bs-target="#ResePasstModal">
              Reset password
            </button>
          </div>
        </div>
      )}

      <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateModalLabel">Update Details</h1>
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
                    <label htmlFor="Address" className="col-form-label">Address:</label>
                    <textarea className={`form-control ${errors.Address ? 'is-invalid' : ''}`} id="Address" name="Address" value={formData.Address} onChange={handleChange} />
                    {errors.Address && <div className="invalid-feedback">{errors.Address}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="roomNo">Room No:</label>
                  <input type="text" className={`form-control ${errors.roomNo ? 'is-invalid' : ''}`} id="roomNo" name="roomNo" value={formData.roomNo} onChange={handleChange} />
                  {errors.roomNo && <div className="invalid-feedback">{errors.roomNo}</div>}
                </div>
                <button ref={updateCloseRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary my-2 mx-2">Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="ResePasstModal" tabIndex="-1" aria-labelledby="ResePasstModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="ResePasstModalLabel">Reset Password</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitPass}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="currentPassword" name="currentPassword" value={changepassword.currentPassword} onChange={handleChangePass} />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="newpassword">New Password:</label>
                  <input type="password" className="form-control" id="newpassword" name="newpassword" value={changepassword.newpassword} onChange={handleChangePass} />
                  {errors.newpassword && <div className="invalid-feedback">{errors.newpassword}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm password:</label>
                  <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="confirmPassword" name="confirmPassword" value={changepassword.confirmPassword} onChange={handleChangePass} />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                
                <button ref={resetPasswordCloseRef} type="button" className="btn btn-secondary " data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary my-2 mx-2">Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserData;
