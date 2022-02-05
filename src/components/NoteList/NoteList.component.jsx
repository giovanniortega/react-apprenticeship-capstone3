import React, { useState } from 'react';
import useNoteAction from '../../utils/hooks/useNoteAction';

const NoteList = ({ listData }) => {
  const { dataNoteList, isArchive } = listData;
  const [isEditForm, setIsEditForm] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editNote, setEditNote] = useState('');
  const [editNoteId, setEditNoteId] = useState('');

  const { noteAction } = useNoteAction();

  const saveEditedNote = async (e) => {
    e.preventDefault();

    const note = {
      id: editNoteId,
      title: editTitle,
      note: editNote,
    };

    noteAction('updateNote', note);

    setIsEditForm(false);
  };

  const editUserNote = (note) => {
    setIsEditForm(true);
    setEditTitle(note.title);
    setEditNote(note.note);
    setEditNoteId(note.id);
  };

  return (
    <>
      <h1>Note List</h1>
      {isEditForm && (
        <form onSubmit={saveEditedNote}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
            }}
          />
          <textarea
            type="text"
            value={editNote}
            onChange={(e) => {
              setEditNote(e.target.value);
            }}
          />
          <button type="submit">Save</button>
        </form>
      )}
      <ul>
        {dataNoteList &&
          dataNoteList.length > 0 &&
          dataNoteList.map((note) => (
            <li key={note.id}>
              <div onClick={() => editUserNote(note)}>
                <h3>{note.title}</h3>
                <p>{note.note}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  !isArchive
                    ? noteAction('archiveNote', note)
                    : noteAction('deleteNote', note);
                }}
              >
                {!isArchive ? 'Archive Note' : 'Delete Note'}
              </button>
              {isArchive && (
                <button
                  type="button"
                  onClick={() => noteAction('restoreNote', note)}
                >
                  Restore Note
                </button>
              )}
            </li>
          ))}
      </ul>
    </>
  );
};

export default NoteList;
