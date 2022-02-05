import React, { useContext, useEffect, useState } from 'react';
import Header from './components/Header/Header.component';
import Router from './components/Router/Router.component';
import { StoreContext } from './store/StoreContext';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase/firebaseConfig';
import useGetNotes from './utils/hooks/useGetNotes';
import { useParams } from 'react-router-dom';

function App() {
  const { store, dispatch } = useContext(StoreContext);
  const { authState } = store;
  const { getNotes } = useGetNotes();
  const [printApp, setPrintApp] = useState(false);
  const params = useParams();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch({ type: 'setAuthState', payload: currentUser });
    });
    console.log('params', params);
  }, [authState]);

  useEffect(() => {
    if (authState) {
      const fromNotes = 'userNotes';
      const fromArchive = 'userArchiveNotes';
      onSnapshot(collection(db, 'notes', authState.uid, fromNotes), () => {
        console.log('cambio mi pezz fromNotes');
        getNotes(authState.uid, fromNotes);
      });
      onSnapshot(collection(db, 'notes', authState.uid, fromArchive), () => {
        console.log('cambio mi pezz fromArchive');
        getNotes(authState.uid, fromArchive);
      });
    }
  }, [authState]);

  useEffect(() => {
    setTimeout(() => {
      setPrintApp(true);
      console.log('tomalo');
    }, 500);
  }, []);

  return (
    <div className="App">
      {printApp ? (
        <div>
          <h1>Keep Notes Firebase</h1>
          <Header />
          <Router />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
