import React,{useState} from 'react'

const AdminDetails = () => {

  const [Name, setName] = useState('');
  const [email, setemail] =useState('');
  const [phone, setphone] = useState('');
  const [Address, setAddress] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [password,setPassword] = useState("password123")

   // Add other event handlers for each input field
   const handleNameChange = (e) => setName(e.target.value);
   const handleAddressChange = (e) => setAddress(e.target.value);
   const handlePhoneChange = (e) => setphone(e.target.value);
   const handleRoomNoChange = (e) => setRoomNo(e.target.value);
   const hadleEmailchange =(e)=> setemail(e.target.value);
   const handlePasswordChange = (e) => setPassword(e.target.value);
  return (
    <div className='container'>
        <div className='container'>
        <button type="button" className="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add
        </button>

        {/* modal */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Society</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="col-form-label">Name:</label>
                    <input type="text" className="form-control" id="title" name="title" value={Name} onChange={handleNameChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="col-form-label">Email:</label>
                    <input type='email' className="form-control" id="description" name="description" value={email} onChange={hadleEmailchange}></input>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact" className="col-form-label">password:</label>
                    <input type="text" className="form-control" id="contact" name="contact" value={password} onChange={handlePasswordChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Phone" className="col-form-label">Phone:</label>
                    <input type="number" className="form-control" id="Phone" name="Phone" value={phone} onChange={handlePhoneChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Address" className="col-form-label">Address:</label>
                    <textarea className="form-control" id="Address" name="Address" value={Address} onChange={handleAddressChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="roomNo" className="col-form-label">roomNo:</label>
                    <input type="text" className="form-control" id="roomNo" name="roomNo" value={roomNo} onChange={handleRoomNoChange} />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default AdminDetails