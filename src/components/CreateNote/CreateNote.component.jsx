import React, { useRef, useContext } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { StoreContext } from '../../store/StoreContext';

function CreateNote() {
  const titleInputRef = useRef();
  const noteInputRef = useRef();

  const { store } = useContext(StoreContext);
  const { authState } = store;

  const createNote = async (evt) => {
    evt.preventDefault();
    console.log(authState.uid);
    const noteId = new Date().getTime().toString();
    // try {
    //   await addDoc(collection(db, 'notes', authState.uid, 'userNotes'), {
    //     title: titleInputRef.current.value,
    //     note: noteInputRef.current.value,
    //   });
    //   // console.log('Document written with ID: ', note.id);
    //   titleInputRef.current.value = '';
    //   noteInputRef.current.value = '';
    // } catch (error) {
    //   console.error('Error adding document: ', error);
    // }

    try {
      await setDoc(doc(db, 'notes', authState.uid, 'userNotes', noteId), {
        id: noteId,
        title: titleInputRef.current.value,
        note: noteInputRef.current.value,
      });
      titleInputRef.current.value = '';
      noteInputRef.current.value = '';
    } catch (error) {
      console.error('Error adding document: ', error);
    }

    // try {
    //   await setDoc(doc(db, 'notes', authState.uid, 'usernotes', note.id), {
    //     id: note.id
    //   });
    // } catch (error) {
    //   console.error('Error adding document: ', error);
    // }
  };

  return (
    <>
      <h1>CreateNote</h1>
      <form onSubmit={createNote}>
        <fieldset>
          <div>
            <label htmlFor="title-text">Title</label>
            <input
              type="input"
              name="titleText"
              id="title-text"
              ref={titleInputRef}
            />
          </div>
          <div>
            <label htmlFor="note-text">Note</label>
            <textarea
              type="textbox"
              name="titleText"
              id="note-text"
              ref={noteInputRef}
            />
          </div>
          <button type="submit">Create Note</button>
        </fieldset>
      </form>
    </>
  );
}

export default CreateNote;
