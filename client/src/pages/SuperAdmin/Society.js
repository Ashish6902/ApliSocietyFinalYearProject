import React, { useContext } from 'react';
import SocietyContext from '../../context/Society/SocietyContext';
import SocietyItem from '../../Components/SocietyItem';

const Society = () => {
  const { Society } = useContext(SocietyContext);

  return (
    <>
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
                    <input type="text" className="form-control" id="title" name="title" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="col-form-label">Address:</label>
                    <textarea className="form-control" id="description" name="description"></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact" className="col-form-label">Contact:</label>
                    <input type="number" className="form-control" id="contact" name="contact" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <h1>Societies</h1>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope='col'>Society Name</th>
              <th scope='col'>Date</th>
              <th scope='col'>Address</th>
              <th scope='col'>Contact</th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(Society) || Society.length === 0 ? 'No societies to display' : (
              Society.map((society) => (
                <SocietyItem key={society._id} Society={society} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Society;
