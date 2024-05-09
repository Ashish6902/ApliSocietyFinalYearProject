import React, { useEffect, useState,useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Modal } from 'react-bootstrap';
import "./AdminPage.css";

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [newMeeting, setNewMeeting] = useState({
        title: '',
        description: '',
        date: '',
        time: ''
    });
    const refClose = useRef(null); // Create a ref for the close button

    useEffect(() => {
        fetchMeetings();
    }, []);

    const fetchMeetings = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const response = await fetch("http://localhost:5000/api/secretary/fetchmeetings", {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken,
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch meetings");
            }
            const data = await response.json();
            const formattedEvents = data.map(meeting => ({
                title: meeting.title,
                date: new Date(meeting.date),
                description: meeting.description + meeting.time
            }));
            setEvents(formattedEvents);
        } catch (error) {
            console.error('Error fetching meetings:', error);
        }
    };

    const handleClose = () => setShowModal(false);

    const renderModal = (eventInfo) => {
        setSelectedMeeting(eventInfo.event);
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMeeting(prevMeeting => ({
            ...prevMeeting,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const response = await fetch("http://localhost:5000/api/secretary/addMeeting", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken,
                },
                body: JSON.stringify(newMeeting)
            });
            if (!response.ok) {
                throw new Error("Failed to add meeting");
            }
            await fetchMeetings();
            refClose.current.click(); // Programmatically close the modal after submitting
        } catch (error) {
            console.error('Error adding meeting:', error);
        }
    };

    return (
        <div className='container adminpage'>
            <div>
                {/* Button to open modal */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add <i className="fa-regular fa-square-plus"></i>
                </button>

                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Meeting</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="col-form-label">Title:</label>
                                        <input type="text" className="form-control" id="title" name="title" onChange={handleChange} value={newMeeting.title} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="col-form-label">Description:</label>
                                        <textarea className="form-control" id="description" name="description" onChange={handleChange} value={newMeeting.description}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="date" className="col-form-label">Date:</label>
                                        <input type="date" className="form-control" id="date" name="date" onChange={handleChange} value={newMeeting.date} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="time" className="col-form-label">Time:</label>
                                        <input type="time" className="form-control" id="time" name="time" onChange={handleChange} value={newMeeting.time} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventContent={renderEventContent}
                eventClick={renderModal}
            />
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMeeting ? selectedMeeting.title : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{selectedMeeting ? selectedMeeting.extendedProps.description : ''}</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const renderEventContent = (eventInfo) => {
    return (
        <>
            <div style={{ backgroundColor: 'blue', color: 'white', padding: '5px', borderRadius: '5px' }}>
                {eventInfo.event.title}
            </div>
        </>
    );
};

export default AdminEvents;
