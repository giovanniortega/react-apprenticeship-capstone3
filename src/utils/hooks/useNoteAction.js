import { useContext } from 'react';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { StoreContext } from '../../store/StoreContext';

function useNoteAction() {
  const { store } = useContext(StoreContext);
  const { authState } = store;
  const userId = authState.uid;

  const actionFunction = async (
    note,
    setDocument,
    setInCollection,
    deleteDocument,
    deleteFromCollection,
    updateDocument
  ) => {
    const newNoteId = new Date().getTime().toString();
    try {
      if (setDocument || updateDocument) {
        await setDoc(
          doc(
            db,
            'notes',
            userId,
            setInCollection,
            !updateDocument ? newNoteId : note.id
          ),
          {
            id: !updateDocument ? newNoteId : note.id,
            title: note.title,
            note: note.note,
          }
        );
      }
      if (deleteDocument) {
        await deleteDoc(
          doc(db, 'notes', userId, deleteFromCollection, note.id)
        );
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const noteAction = (action, note) => {
    switch (action) {
      case 'archiveNote':
        actionFunction(
          note,
          true,
          'userArchiveNotes',
          true,
          'userNotes',
          false
        );
        break;
      case 'restoreNote':
        actionFunction(
          note,
          true,
          'userNotes',
          true,
          'userArchiveNotes',
          false
        );
        break;
      case 'deleteNote':
        actionFunction(note, false, '', true, 'userArchiveNotes', false);
        break;
      case 'updateNote':
        actionFunction(note, true, 'userNotes', false, '', true);
    }
  };

  return { noteAction };
}

export default useNoteAction;
