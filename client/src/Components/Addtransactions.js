import React, { useState, useRef } from 'react';

const Addtransactions = ({ addTransaction }) => {
    const refClose = useRef(null);

    const [formData, setFormData] = useState({
        Information: '',
        date: '',
        amount: ''
    });

    const [errors, setErrors] = useState({
        Information: '',
        date: '',
        amount: ''
    });

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user starts typing
    };

    const onSave = () => {
        const { Information, date, amount } = formData;
        let isValid = true;

        // Basic validation: check if fields are not empty
        if (!Information.trim()) {
            setErrors(prevErrors => ({ ...prevErrors, Information: 'Please enter information.' }));
            isValid = false;
        }
        if (!date) {
            setErrors(prevErrors => ({ ...prevErrors, date: 'Please select a date.' }));
            isValid = false;
        }
        if (!amount.trim()) {
            setErrors(prevErrors => ({ ...prevErrors, amount: 'Please enter amount.' }));
            isValid = false;
        }

        if (isValid) {
            addTransaction(Information, date, amount);
            setFormData({
                Information: '',
                date: '',
                amount: ''
            });
            refClose.current.click();
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add Transaction <i className="fa-regular fa-square-plus"></i>
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Transaction</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="col-form-label">Information:</label>
                                    <textarea className="form-control" id="title" name="Information" onChange={onChange} value={formData.Information} />
                                    {errors.Information && <div className="text-danger">{errors.Information}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date" className="col-form-label">Date:</label>
                                    <input type="date" className="form-control" id="date" name="date" onChange={onChange} value={formData.date} />
                                    {errors.date && <div className="text-danger">{errors.date}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="col-form-label">Amount:</label>
                                    <input type="number" className="form-control" id="description" name="amount" onChange={onChange} value={formData.amount}></input>
                                    {errors.amount && <div className="text-danger">{errors.amount}</div>}
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onSave}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addtransactions;
