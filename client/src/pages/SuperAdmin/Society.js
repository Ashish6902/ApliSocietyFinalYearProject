import React, { useState, useContext } from 'react';
import SocietyContext from '../../context/Society/SocietyContext';
import SocietyItem from '../../Components/SocietyItem';

const Society = () => {
  const { Society, addSociety } = useContext(SocietyContext);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [SocietyName, setSocietyName] = useState('');
  const [Address, setAddress] = useState('');
  const [Contact, setContact] = useState('');
  const [nameError, setNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [contactError, setContactError] = useState('');

  const handleNameChange = (e) => {
    setSocietyName(e.target.value);
    setNameError('');
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setAddressError('');
  };

  const handleContactChange = (e) => {
    const contactValue = e.target.value;
    if (/^\d{0,10}$/.test(contactValue)) {
      setContact(contactValue);
      setContactError('');
    } else {
      setContactError('Contact number should have at most 10 digits.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (SocietyName.trim() === '') {
      setNameError('Please enter a name for the society.');
      return;
    }

    if (Address.trim() === '') {
      setAddressError('Please enter an address for the society.');
      return;
    }

    if (Contact.trim() === '' || Contact.length !== 10) {
      setContactError('Please enter a valid 10-digit contact number for the society.');
      return;
    }

    addSociety(SocietyName, Address, Contact);
    setSocietyName('');
    setAddress('');
    setContact('');
    setShowModal(false); // Close the modal after successful submission
  };

  return (
    <>
      <div className='container-md'>

        {/* modal */}
        {showModal && (
          <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Add Society</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="col-form-label">Name:</label>
                      <input type="text" className={`form-control ${nameError ? 'is-invalid' : ''}`} id="title" name="title" value={SocietyName} onChange={handleNameChange} />
                      {nameError && <div className="invalid-feedback">{nameError}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="col-form-label">Address:</label>
                      <textarea className={`form-control ${addressError ? 'is-invalid' : ''}`} id="description" name="description" value={Address} onChange={handleAddressChange}></textarea>
                      {addressError && <div className="invalid-feedback">{addressError}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="contact" className="col-form-label">Contact:</label>
                      <input type="number" className={`form-control ${contactError ? 'is-invalid' : ''}`} id="contact" name="contact" value={Contact} onChange={handleContactChange} />
                      {contactError && <div className="invalid-feedback">{contactError}</div>}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
                      <button type="submit" className="btn btn-success">Save changes</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='container-md'>
        <h1>Societies</h1>
        <button type="button" className="btn btn-primary my-2" onClick={() => setShowModal(true)}>
          Add <i class="fa-regular fa-square-plus"></i>
        </button>
        
        <div className="table-responsive">
          <table className='table table-bordered table-hover'>
            <thead className='table-dark'>
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
