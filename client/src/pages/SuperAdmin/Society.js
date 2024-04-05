import React, { useState, useContext } from 'react';
import SocietyContext from '../../context/Society/SocietyContext';
import SocietyItem from '../../Components/SocietyItem';

const Society = () => {
  const { Society, addSociety } = useContext(SocietyContext);
  const [SocietyName, setSocietyName] = useState('');
  const [Address, setAddress] = useState('');
  const [Contact, setContact] = useState('');

  const handleNameChange = (e) => setSocietyName(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleContactChange = (e) => setContact(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    addSociety(SocietyName,Address,Contact);
    setSocietyName('');
    setAddress('');
    setContact('');
  };

  return (
    <>
      <div className='container-md'>
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
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="col-form-label">Name:</label>
                    <input type="text" className="form-control" id="title" name="title" value={SocietyName} onChange={handleNameChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="col-form-label">Address:</label>
                    <textarea className="form-control" id="description" name="description" value={Address} onChange={handleAddressChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact" className="col-form-label">Contact:</label>
                    <input type="number" className="form-control" id="contact" name="contact" value={Contact} onChange={handleContactChange} />
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

      <div className='container-md'>
        <h1>Societies</h1>
        <div className="table-responsive">
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th scope='col'>Society Name</th>
                <th scope='col'>Date</th>
                <th scope='col'>Address</th>
                <th scope='col'>Contact</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(!Array.isArray(Society) || Society.length === 0) ? (
                <tr>
                  <td colSpan="4">No societies to display</td>
                </tr>
              ) : (
                Society.map((society) => (
                  <SocietyItem key={society._id} Society={society} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Society;
