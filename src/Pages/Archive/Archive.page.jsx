import React, { useContext } from 'react';
import NoteList from '../../components/NoteList/NoteList.component';
import { StoreContext } from '../../store/StoreContext';

function ArchivePage() {
  const { store } = useContext(StoreContext);
  const { archiveNoteList: dataNoteList, authState } = store;
  const isArchive = true;

  return (
    <>
      <h1>ArchivePage</h1>
      {authState && dataNoteList.length > 0 && (
        <NoteList listData={{ dataNoteList, isArchive }} />
      )}
    </>
  );
}

export default ArchivePage;
