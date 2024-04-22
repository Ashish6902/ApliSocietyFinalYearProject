import React, { useContext, useEffect, useRef, useState } from "react";
import userRoleContext from "../../context/Roles/userRoleContext";
import MemberContext from "../../context/Members/MemberContext";

const Members = () => {
  const { userId } = useContext(userRoleContext);
  const { getMember, Member, updateMembers,updatePassword } = useContext(MemberContext);
  const refcolse = useRef(null)


  const [formData, setFormData] = useState({
    name: "",
    Address: "",
    roomNo: "",
  });

  const [changepassword ,setchangepassword] = useState({
    currentPassword: "",
    newpassword:"",
    confirmPassword: ""
  })
  useEffect(() => {
    // Fetch member data when the component mounts
    if (userId) {
      getMember(userId);
    }
  }, [getMember, userId]);

  useEffect(() => {
    // Set form data when Member data changes
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

  const handleChangePass = (e)=>{
    setchangepassword({ ...changepassword, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call updateMembers with updated data
    updateMembers(userId, formData.name, formData.Address, formData.roomNo);
    refcolse.current.click();
  };

  const handleSubmitPass = (e) =>{
    e.preventDefault();
    if(e.newpassword === e.confirmPassword){
        console.log("password changed")
        console.log(e.newpassword)
        updatePassword(userId,changepassword.currentPassword,changepassword.newpassword);
    }
    refcolse.current.click();
  }

  return (
    <div className="container">
      {Member && (
        <div className="container">
          <h2>Member Details</h2>
          <div className="container" style={{ border: "1px solid black" }}>
            <p className="my-2 px-2" style={{ border: "1px solid black" }}><strong>Name:</strong> {Member.name}</p>
            <p className="my-2 px-2" style={{ border: "1px solid black" }}><strong>Email:</strong> {Member.email}</p>
            <p className="my-2 px-2" style={{ border: "1px solid black" }}><strong>Phone:</strong> {Member.phone}</p>
            <p className="my-2 px-2" style={{ border: "1px solid black" }}><strong>Address:</strong> {Member.Address}</p>
            <p className="my-2 px-2" style={{ border: "1px solid black" }}><strong>Room No:</strong> {Member.roomNo}</p>
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
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="Address">Address:</label>
                  <input type="text" className="form-control" id="Address" name="Address" value={formData.Address} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="roomNo">Room No:</label>
                  <input type="text" className="form-control" id="roomNo" name="roomNo" value={formData.roomNo} onChange={handleChange} />
                </div>
              </div>
            <div className="modal-footer">
              <button ref={refcolse} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
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
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input type="password" className="form-control" id="currentPassword" name="currentPassword" value={changepassword.currentPassword} onChange={handleChangePass} />
              </div>
              <div className="form-group">
                <label htmlFor="newpassword">New Password:</label>
                <input type="password" className="form-control" id="newpassword" name="newpassword" value={changepassword.newpassword} onChange={handleChangePass} />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm password:</label>
                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={changepassword.confirmPassword} onChange={handleChangePass} />
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refcolse} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmitPass}>Save changes</button>
            </div>
          </div>
        </div>
      </div>





     </div> 
  );
};

export default Members;