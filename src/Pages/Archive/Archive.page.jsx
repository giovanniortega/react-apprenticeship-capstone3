import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../store/StoreContext';
import NoteList from '../../components/NoteList/NoteList.component';
import Aside from '../../UI/Aside/Aside';

function ArchivePage() {
  const { store, dispatch } = useContext(StoreContext);
  const { archiveNoteList: dataNoteList } = store;
  const isArchive = true;

  useEffect(() => {
    dispatch({ type: 'setLocation', payload: window.location.pathname });
  }, [dispatch]);

  return (
    <>
      <Aside />
      <div className="content-container">
        <h1 className="centered">
          {dataNoteList.length == 0
            ? 'Archive empty!'
            : `You have ${dataNoteList.length} archived note${
                dataNoteList.length > 1 ? 's' : ''
              }`}
        </h1>
        {dataNoteList.length > 0 && (
          <NoteList listData={{ dataNoteList, isArchive }} />
        )}
      </div>
    </>
  );
}

export default ArchivePage;
