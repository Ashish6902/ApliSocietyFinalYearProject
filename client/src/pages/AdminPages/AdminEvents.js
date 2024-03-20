import React, { useContext, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import NoticeContext from '../../context/Notice/NoticeContext';
import { Modal } from 'react-bootstrap';
import "./AdminPage.css"

const AdminEvents = () => {
    const { fetchAllNotices } = useContext(NoticeContext);
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const notices = await fetchAllNotices();
                const eventsData = notices.map(notice => ({
                    title: notice.title,
                    date: notice.date,
                    description: notice.description
                }));
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };

        fetchEvents();
    }, [fetchAllNotices]);

    const handleClose = () => setShowModal(false);

    const rederModal = (eventInfo) => {
        setSelectedNote(eventInfo.event);
        setShowModal(true);
    };

    return (
        <div className='container adminpage'>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventContent={renderEventContent}
                eventClick={rederModal}
            />
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedNote ? selectedNote.title : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{selectedNote ? selectedNote.extendedProps.description : ''}</Modal.Body>
                <Modal.Footer>
                    <button type="button" class="btn btn-secondary" onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const renderEventContent = (eventInfo) => {
    return (
        <div style={{ backgroundColor: 'blue', color: 'white', padding: '5px', borderRadius: '5px' }}>
            {eventInfo.event.title}
        </div>
    );
};

export default AdminEvents;