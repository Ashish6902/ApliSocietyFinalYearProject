import React, {  useState, useContext, useEffect } from 'react';
import NoticeContext from '../../context/Notice/NoticeContext';
import NoteItem from '../../Components/NoticeItem';

const Notices = () => {
  const { Notice, getAllNoticesuser} = useContext(NoticeContext);

  useEffect(() => {
    getAllNoticesuser();
    // eslint-disable-next-line 
  }, []);


  return (
    <>
      <div className="container">
        <h1>Notices</h1>
        {!Array.isArray(Notice) || Notice.length === 0 ? 'No notes to display' : (
          Notice.map((notice) => (
            <NoteItem key={notice._id} Notice={notice}/>
          ))
        )}
      </div>
    </>
  )
}

export default Notices