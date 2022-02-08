import React, { useState } from 'react';
import useNoteAction from '../../utils/hooks/useNoteAction';
import classes from './CreateNote.module.css';

function CreateNote() {
  const { noteAction } = useNoteAction();
  const [isAddNote, setIsAddNote] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [noteColor, setNoteColor] = useState('#437bdf');

  const createNote = async (evt) => {
    evt.preventDefault();

    const noteInputHtml = noteInput.replace(/\n\r?/g, '<br />');

    const note = {
      title: titleInput,
      note: noteInputHtml,
      color: noteColor,
    };

    if (titleInput !== '' || noteInput !== '') {
      noteAction('createNote', note);
      setTitleInput('');
      setNoteInput('');
      setNoteColor('#437bdf');
    }

    setIsAddNote(false);
  };

  const createNoteHandler = () => {
    setIsAddNote(true);
  };

  const inputBlur = (evt) => {
    if (!evt.relatedTarget) {
      setIsAddNote(false);
      createNote(evt);
    }
  };

  return (
    <>
      <form
        onSubmit={createNote}
        className={classes['createnote-form']}
        style={{ borderColor: noteColor }}
      >
        {isAddNote && (
          <>
            <input
              type="input"
              name="titleText"
              id="title-text"
              placeholder="Title"
              value={titleInput}
              className={classes['title-input']}
              onChange={(evt) => setTitleInput(evt.target.value)}
              onBlur={(evt) => {
                inputBlur(evt);
              }}
              style={{ backgroundColor: noteColor }}
            />
            <div className={classes['color-input']}>
              <label htmlFor="color-input">Color</label>
              <input
                type="color"
                name="color-input"
                id="color-input"
                value={noteColor}
                onChange={(evt) => setNoteColor(evt.target.value)}
              />
            </div>
          </>
        )}
        <textarea
          type="textbox"
          name="titleText"
          id="note-text"
          placeholder="Take a note..."
          value={noteInput}
          className={classes['textarea-input']}
          onChange={(evt) => setNoteInput(evt.target.value)}
          onFocus={createNoteHandler}
          onBlur={(evt) => {
            inputBlur(evt);
          }}
        />
        {isAddNote && (
          <>
            <button type="submit" style={{ backgroundColor: noteColor }}>
              Close
            </button>
          </>
        )}
      </form>
    </>
  );
}

export default CreateNote;
