import React, { useContext, useEffect } from 'react';
import CreateNote from '../../components/CreateNote/CreateNote.component';
import NoteList from '../../components/NoteList/NoteList.component';
import Aside from '../../UI/Aside/Aside';
import { StoreContext } from '../../store/StoreContext';

function HomePage() {
  const { store, dispatch } = useContext(StoreContext);
  const { noteList: dataNoteList, authState } = store;

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
            ? 'There are no notes!'
            : `You have ${dataNoteList.length} note${
                dataNoteList.length > 1 ? 's' : ''
              }`}
        </h1>
        {authState && dataNoteList.length > 0 && (
          <NoteList listData={{ dataNoteList }} />
        )}
      </div>
    </>
  );
}

export default HomePage;
