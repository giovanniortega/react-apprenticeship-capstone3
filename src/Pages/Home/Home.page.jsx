import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../store/StoreContext';
import CreateNote from '../../components/CreateNote/CreateNote.component';
import NoteList from '../../components/NoteList/NoteList.component';
import Aside from '../../UI/Aside/Aside';

function HomePage() {
  const { store, dispatch } = useContext(StoreContext);
  const { noteList: dataNoteList } = store;

  useEffect(() => {
    dispatch({ type: 'setLocation', payload: window.location.pathname });
  }, [dispatch]);

  return (
    <>
      <Aside />
      <div className="content-container">
        <CreateNote />
        <h1 className="centered">
          {dataNoteList.length == 0
            ? 'No notes!'
            : `You have ${dataNoteList.length} note${
                dataNoteList.length > 1 ? 's' : ''
              }`}
        </h1>
        {dataNoteList.length > 0 && <NoteList listData={{ dataNoteList }} />}
      </div>
    </>
  );
}

export default HomePage;
