import React, { useContext, useState, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import SocietyContext from '../context/Society/SocietyContext';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const SocietyItem = (props) => {
  const { editSociety } = useContext(SocietyContext);
  const { _id, SocietyName, date, Address, Contact } = props.Society;
  const refCloseUpdate = useRef(null);

  const [updatedSociety, setUpdatedSociety] = useState({
    SocietyName,
    Address,
    Contact
  });

  useEffect(() => {
    // Update updatedSociety state whenever props change
    setUpdatedSociety({
      SocietyName,
      Address,
      Contact
    });
  }, [SocietyName, Address, Contact]);

  const handleNameChange = (e) => {
    setUpdatedSociety({ ...updatedSociety, SocietyName: e.target.value });
  };

  const handleAddressChange = (e) => {
    setUpdatedSociety({ ...updatedSociety, Address: e.target.value });
  };

  const handleContactChange = (e) => {
    setUpdatedSociety({ ...updatedSociety, Contact: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editSociety(_id, updatedSociety.SocietyName, updatedSociety.Address, updatedSociety.Contact);
    refCloseUpdate.current.click();
  };

  return (
    <tr>
      <td>{SocietyName}</td>
      <td>{formatDate(date)}</td>
      <td>{Address}</td>
      <td>{Contact}</td>
      <td>
      {/* <Link className='btn btn-primary my-2 mx-2' to={{ pathname: '/AdminDetails', state: { test: 'test' } }}>
  Admin info
</Link> */}
<Link className='btn btn-info my-2 mx-2' to={{ pathname : "/AdminDetails" }} state={_id}> Admin info</Link>

        <button type="button" className="btn btn-warning my-2" data-bs-toggle="modal" data-bs-target={`#exampleModal${_id}`}>
          Update
        </button>

        <div className="modal fade" id={`exampleModal${_id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${_id}`} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={`exampleModalLabel${_id}`}>Update Society</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor={`SocietyName${_id}`} className="col-form-label">Society Name:</label>
                    <input type="text" className="form-control" id={`SocietyName${_id}`} name={`SocietyName${_id}`} value={updatedSociety.SocietyName} onChange={handleNameChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor={`Address${_id}`} className="col-form-label">Address:</label>
                    <textarea className="form-control" id={`Address${_id}`} name={`Address${_id}`} value={updatedSociety.Address} onChange={handleAddressChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor={`Contact${_id}`} className="col-form-label">Contact:</label>
                    <input type="number" className="form-control" id={`Contact${_id}`} name={`Contact${_id}`} value={updatedSociety.Contact} onChange={handleContactChange} />
                  </div>
                  <div className="modal-footer">
                    <button ref={refCloseUpdate} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Save changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </td>
    </tr>
  );
};

export default SocietyItem;
