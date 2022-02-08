import React, { useState } from 'react';
import useNoteAction from '../../utils/hooks/useNoteAction';
import classes from './NoteList.module.css';
import EditNote from '../EditNote/EditNote.component';

const NoteList = ({ listData }) => {
  const { dataNoteList, isArchive } = listData;
  const [isEditForm, setIsEditForm] = useState(false);
  const [editNoteData, setEditNoteData] = useState({});

  const { noteAction } = useNoteAction();

  const onClose = () => {
    setIsEditForm(false);
    setEditNoteData({});
  };

  const editUserNote = (note) => {
    setEditNoteData({
      id: note.id,
      title: note.title,
      note: note.note,
      color: note.color,
    });
    setTimeout(() => {
      setIsEditForm(true);
    }, 300);
  };

  return (
    <>
      {isEditForm && <EditNote onClose={onClose} noteData={editNoteData} />}

      <ul className={classes['note-list']}>
        {dataNoteList &&
          dataNoteList.length > 0 &&
          dataNoteList.map((note) => (
            <li
              key={note.id}
              className={classes.note}
              style={{ borderColor: note.color }}
            >
              <div onClick={() => !isArchive && editUserNote(note)}>
                {note.title && (
                  <h3
                    className={classes['note-title']}
                    style={{ backgroundColor: note.color }}
                  >
                    {note.title}
                  </h3>
                )}
                <p
                  className={classes['note-text']}
                  dangerouslySetInnerHTML={{ __html: note.note }}
                />
              </div>
              <div className={classes['note-actions']}>
                <button
                  type="button"
                  onClick={() => {
                    !isArchive
                      ? noteAction('archiveNote', note)
                      : noteAction('deleteNote', note);
                  }}
                  style={{ backgroundColor: note.color }}
                >
                  {!isArchive ? 'Archive Note' : 'Delete Note'}
                </button>
                {isArchive && (
                  <button
                    type="button"
                    onClick={() => noteAction('restoreNote', note)}
                    style={{ backgroundColor: note.color }}
                  >
                    Restore Note
                  </button>
                )}
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default NoteList;
