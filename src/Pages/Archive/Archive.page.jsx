import React, { useContext, useEffect } from 'react';
import NoteList from '../../components/NoteList/NoteList.component';
import { StoreContext } from '../../store/StoreContext';

function ArchivePage() {
  const { store, dispatch } = useContext(StoreContext);
  const { archiveNoteList: dataNoteList, authState } = store;
  const isArchive = true;

  useEffect(() => {
    dispatch({ type: 'setLocation', payload: window.location.pathname });
  }, [dispatch]);

  return (
    <>
      <h1 className="centered">
        {dataNoteList.length == 0
          ? 'Archive empty!'
          : `You have ${dataNoteList.length} archived note${
              dataNoteList.length > 1 ? 's' : ''
            }`}
      </h1>
      {authState && dataNoteList.length > 0 && (
        <NoteList listData={{ dataNoteList, isArchive }} />
      )}
    </>
  );
}

export default ArchivePage;
