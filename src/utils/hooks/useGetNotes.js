import { useContext, useCallback } from 'react';
import { doc, collection, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { StoreContext } from '../../store/StoreContext';

function useGetNotes() {
  const { dispatch } = useContext(StoreContext);

  const getNotes = useCallback(async (userId, collectionLocation) => {
    const data = await getDocs(
      collection(db, 'notes', userId, collectionLocation)
    );
    const notesArray = [];
    data.forEach((item) => {
      const note = item.data();
      notesArray.push(note);
    });
    collectionLocation == 'userNotes' &&
      dispatch({ type: 'setNoteList', payload: notesArray.reverse() });
    collectionLocation == 'userArchiveNotes' &&
      dispatch({ type: 'setArchiveNoteList', payload: notesArray.reverse() });
  }, []);

  const getUserInfo = useCallback(async (userId) => {
    const user = await getDoc(doc(db, 'notes', userId, 'userData', 'info'));

    if (user.exists()) {
      dispatch({ type: 'setUserInfo', payload: user.data() });
    }
  }, []);

  return { getNotes, getUserInfo };
}

export default useGetNotes;
