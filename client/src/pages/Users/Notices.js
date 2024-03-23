import React, {  useContext, useEffect } from 'react';
import NoticeContext from '../../context/Notice/NoticeContext';
import NoteItem from '../../Components/NoticeItem';

const Notices = () => {
  const { Notice, getAllNotices,editNotice ,deleteNotice} = useContext(NoticeContext);

  useEffect(() => {
    getAllNotices();
    // eslint-disable-next-line 
  }, []);


  return (
    <>
      <div className="container">
        <h1>Notices</h1>
        {!Array.isArray(Notice) || Notice.length === 0 ? 'No notes to display' : (
          Notice.map((notice) => (
            <NoteItem key={notice._id} Notice={notice} editNotice={editNotice} deleteNotice={deleteNotice}/>
          ))
        )}
      </div>
    </>
  );
};

export default Notices;