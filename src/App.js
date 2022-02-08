import React, { useContext, useEffect, useState } from 'react';
import Header from './components/Header/Header.component';
import Router from './components/Router/Router.component';
import { StoreContext } from './store/StoreContext';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase/firebaseConfig';
import useGetNotes from './utils/hooks/useGetNotes';

function App() {
  const { store, dispatch } = useContext(StoreContext);
  const { authState } = store;
  const { getNotes, getUserInfo } = useGetNotes();
  const [printApp, setPrintApp] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch({ type: 'setAuthState', payload: currentUser });
    });
  }, [dispatch, authState]);

  useEffect(() => {
    if (authState) {
      const fromNotes = 'userNotes';
      const fromArchive = 'userArchiveNotes';
      const fromUserData = 'userData';
      onSnapshot(collection(db, 'notes', authState.uid, fromNotes), () => {
        getNotes(authState.uid, fromNotes);
      });
      onSnapshot(collection(db, 'notes', authState.uid, fromArchive), () => {
        getNotes(authState.uid, fromArchive);
      });
      onSnapshot(collection(db, 'notes', authState.uid, fromUserData), () => {
        getUserInfo(authState.uid);
      });
    }
  }, [getNotes, getUserInfo, authState]);

  useEffect(() => {
    setTimeout(() => {
      setPrintApp(true);
    }, 500);
  }, [setPrintApp]);

  return (
    <div className="app">
      {printApp ? (
        <>
          <Header />
          <Router />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
