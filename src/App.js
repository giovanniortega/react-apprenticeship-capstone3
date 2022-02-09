import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from './store/StoreContext';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase/firebaseConfig';
import Header from './UI/Header/Header';
import Router from './components/Router/Router.component';
import useGetNotes from './utils/hooks/useGetNotes';

function App() {
  const { store, dispatch } = useContext(StoreContext);
  const { authState, location } = store;
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
  }, [getNotes, getUserInfo, authState, location]);

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
          <main>
            <Router />
          </main>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
