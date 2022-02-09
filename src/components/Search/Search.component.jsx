import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/StoreContext';
import classes from './Search.module.css';

let cloneNoteList = true;
let cloneArchiveNoteList = true;
let noteListCloned = [];
let archiveNoteListCloned = [];

function Search() {
  const [inputValue, setInputValue] = useState('');
  const { store, dispatch } = useContext(StoreContext);
  const { noteList, archiveNoteList, location } = store;
  const setNotesAction =
    location === '/' ? 'setNoteList' : 'setArchiveNoteList';
  const arrayToFilter =
    location === '/' ? noteListCloned : archiveNoteListCloned;

  if (cloneNoteList) {
    noteListCloned = noteList;
    noteListCloned.length > 0 && (cloneNoteList = false);
  }

  if (cloneArchiveNoteList) {
    archiveNoteListCloned = archiveNoteList;
    archiveNoteListCloned.length > 0 && (cloneArchiveNoteList = false);
  }

  const searchNote = (evt) => {
    setInputValue(evt.target.value.toLowerCase());
    const filteredNotes = arrayToFilter.filter((item) => {
      const byTitle = item.title.toLowerCase().indexOf(inputValue) > -1;
      const byNoteText = item.note.toLowerCase().indexOf(inputValue) > -1;
      if (byTitle || byNoteText) {
        return item;
      }
    });

    if (evt.target.value.trim() !== '') {
      dispatch({ type: setNotesAction, payload: filteredNotes });
    } else {
      dispatch({ type: setNotesAction, payload: arrayToFilter });
    }
  };

  const formClear = (evt) => {
    evt && evt.preventDefault();
    setInputValue('');
    dispatch({ type: setNotesAction, payload: arrayToFilter });
  };

  useEffect(() => {
    cloneNoteList = true;
    cloneArchiveNoteList = true;
  }, [location]);

  return (
    <form onSubmit={formClear} className={classes['search-form']}>
      <input
        type="text"
        placeholder="Search"
        onChange={searchNote}
        value={inputValue}
      />
      <button type="submit">Clear</button>
    </form>
  );
}

export default Search;
