import React from 'react';

const Modal = ({ isOpen, onClose, event }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal">
                <h2>{event.title}</h2>
                <p>{event.extendedProps.description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
