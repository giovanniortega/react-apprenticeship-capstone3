import React, { useState } from 'react';
import Modal from '../../UI/Modal/Modal';
import useNoteAction from '../../utils/hooks/useNoteAction';
import { FaSave } from 'react-icons/fa';
import classes from './EditNote.module.css';

const EditNote = ({ noteData, onClose }) => {
  const [editTitle, setEditTitle] = useState(noteData.title);
  const [editNote, setEditNote] = useState(
    noteData.note.replace(/<br\s*[\/]?>/gi, '\n') // eslint-disable-line
  );
  const [editColor, setEditColor] = useState(noteData.color);

  const { noteAction } = useNoteAction();

  const saveEditedNote = async (evt) => {
    evt.preventDefault();

    const note = {
      id: noteData.id,
      title: editTitle,
      note: editNote.replace(/\n\r?/g, '<br />'),
      color: editColor,
    };

    noteAction('updateNote', note);
    onClose();
  };

  const inputBlur = (evt) => {
    if (!evt.relatedTarget) {
      saveEditedNote(evt);
    }
  };

  return (
    <>
      <Modal onClose={onClose}>
        <form
          onSubmit={saveEditedNote}
          className={classes['edit-form']}
          style={{ borderColor: editColor }}
        >
          <input
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
            }}
            className={classes['edit-title-input']}
            placeholder={!editTitle ? 'Add a title' : ''}
            onBlur={(evt) => {
              inputBlur(evt);
            }}
            style={{ backgroundColor: editColor }}
          />
          <div className={classes['color-input']}>
            <label htmlFor="color-input">Color</label>
            <input
              type="color"
              name="color-input"
              id="color-input"
              value={editColor}
              onChange={(evt) => setEditColor(evt.target.value)}
              onBlur={(evt) => {
                inputBlur(evt);
              }}
            />
          </div>
          <textarea
            type="text"
            value={editNote}
            onChange={(e) => {
              setEditNote(e.target.value);
            }}
            className={classes['edit-note-input']}
            placeholder={!editNote ? 'Add some notes' : ''}
            onBlur={(evt) => {
              inputBlur(evt);
            }}
          />
          <button type="submit" style={{ backgroundColor: editColor }}>
            <FaSave />
            <span>Save</span>
          </button>
        </form>
      </Modal>
    </>
  );
};

export default EditNote;
