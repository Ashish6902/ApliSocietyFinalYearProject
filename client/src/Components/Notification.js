import React from 'react';

const Notification = (props) => {
  const handleClose = () => {
    props.onClose(); // Call the onClose function passed as props
  };

  return (
    <div>
      <div className={`alert alert-${props.type}`} role="alert" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{props.msg}</span>
        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
      </div>
    </div>
  );
};

export default Notification;
