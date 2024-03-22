import React, { useRef } from 'react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const FundsTable = (props) => {
  const { information, date, amount } = props.funds;
  const refCloseDelete = useRef(null);

  const handleDelete = () => {
    // Call deleteTransaction with the transaction ID
    props.deleteTransaction(props.funds._id);
    // Close the modal
    refCloseDelete.current.click();
  };

  return (
    <tr>
      <td>{information}</td>
      <td>{formatDate(date)}</td>
      <td>{amount}</td>
      <td>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#deleteModal${props.funds._id}`}>
          Delete
        </button>
        <div className="modal fade" id={`deleteModal${props.funds._id}`} tabIndex="-1" aria-labelledby={`deleteModalLabel${props.funds._id}`} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={`deleteModalLabel${props.funds._id}`}>Do you want to delete this Member?</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-footer">
                <button ref={refCloseDelete} type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                <button type="button" className="btn btn-primary" onClick={handleDelete}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default FundsTable;
