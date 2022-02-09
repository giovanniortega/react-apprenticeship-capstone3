import React, { useState } from 'react';
import useNoteAction from '../../utils/hooks/useNoteAction';
import EditNote from '../EditNote/EditNote.component';
import { FaArchive, FaFileExcel, FaFileUpload } from 'react-icons/fa';
import classes from './NoteList.module.css';

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
                {isArchive && (
                  <button
                    type="button"
                    onClick={() => noteAction('restoreNote', note)}
                    style={{ backgroundColor: note.color }}
                  >
                    <>
                      <FaFileUpload />
                      <span>Restore</span>
                    </>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    !isArchive
                      ? noteAction('archiveNote', note)
                      : noteAction('deleteNote', note);
                  }}
                  style={{ backgroundColor: note.color }}
                >
                  {!isArchive ? (
                    <>
                      <FaArchive />
                      <span>Archive</span>
                    </>
                  ) : (
                    <>
                      <FaFileExcel />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default NoteList;
