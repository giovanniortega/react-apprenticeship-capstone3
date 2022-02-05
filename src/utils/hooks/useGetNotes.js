import { useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { StoreContext } from '../../store/StoreContext';

function useGetNotes() {
  const { dispatch } = useContext(StoreContext);

  const getNotes = async (userId, collectionLocation) => {
    const data = await getDocs(
      collection(db, 'notes', userId, collectionLocation)
    );
    const notesArray = [];
    data.forEach((item) => {
      const note = item.data();
      notesArray.push(note);
    });
    collectionLocation == 'userNotes' &&
      dispatch({ type: 'setNoteList', payload: notesArray });
    collectionLocation == 'userArchiveNotes' &&
      dispatch({ type: 'setArchiveNoteList', payload: notesArray });
  };

  return { getNotes };
}

export default useGetNotes;
