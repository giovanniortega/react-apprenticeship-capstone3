import React, { useContext } from 'react';
import CreateNote from '../../components/CreateNote/CreateNote.component';
import NoteList from '../../components/NoteList/NoteList.component';
import { StoreContext } from '../../store/StoreContext';

function HomePage() {
  const { store } = useContext(StoreContext);
  const { noteList: dataNoteList, authState } = store;

  return (
    <>
      <h1>HomePage</h1>
      <CreateNote />
      {authState && dataNoteList.length > 0 && (
        <NoteList listData={{ dataNoteList }} />
      )}
    </>
  );
}

export default HomePage;
