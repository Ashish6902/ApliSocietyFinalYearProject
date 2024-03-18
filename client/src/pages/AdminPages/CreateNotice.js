import React, {  useState, useContext, useEffect } from 'react';
import NoticeContext from '../../context/Notice/NoticeContext';
import NoteItem from '../../Components/NoticeItem';
import AddingNotice from '../../Components/AddingNotice';

const CreateNotice = () => {
  const { Notice, getAllNotices, addNotice,editNotice ,deleteNotice} = useContext(NoticeContext);

  useEffect(() => {
    getAllNotices();
    // eslint-disable-next-line 
  }, []);

  const [notice, setNotice] = useState({ title: "", description: "", date: "" });

  const handleChange = (event) => {
    setNotice({ ...notice, [event.target.name]: event.target.value });
  };

  const handleClick = () => {
    addNotice(notice.title, notice.description, notice.date);
    setNotice({ title: "", description: "", date: "" });
  };

  return (
    <>
      <div className="container">
        <h1>Notices</h1>
        <AddingNotice name="Add Notice" onChange={handleChange} onClick={handleClick} />
        {!Array.isArray(Notice) || Notice.length === 0 ? 'No notes to display' : (
          Notice.map((notice) => (
            <NoteItem key={notice._id} Notice={notice} editNotice={editNotice} deleteNotice={deleteNotice}/>
          ))
        )}
      </div>
    </>
  );
};

export default CreateNotice;