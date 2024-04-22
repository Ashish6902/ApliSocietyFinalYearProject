import React,{useRef} from 'react';

const AddingNotes = (props) => {
  const refClose = useRef(null);
  const closeModal = () => {
    refClose.current.click();
};
  return (
    <div>
      {/*button to open modal */}
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add <i className="fa-regular fa-square-plus"></i>
      </button>

      {/*modal  */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{props.name}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="col-form-label">Title:</label>
                  <input type="text" className="form-control" id="title" name="title" onChange={props.onChange} value={props.title} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="col-form-label">Description:</label>
                  <textarea className="form-control" id="description" name="description" onChange={props.onChange} value={props.description}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="col-form-label">Date:</label>
                  <input type="date" className="form-control" id="date" name="date" onChange={props.onChange} value={props.date} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={()=>{props.onClick();closeModal();}}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddingNotes;
