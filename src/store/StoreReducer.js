const initialStore = {
  authState: null,
  noteList: [],
  archiveNoteList: [],
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case 'setAuthState':
      return {
        ...state,
        authState: action.payload,
      };
    case 'setNoteList':
      return {
        ...state,
        noteList: action.payload,
      };
    case 'setArchiveNoteList':
      return {
        ...state,
        archiveNoteList: action.payload,
      };
    default:
      return state;
  }
};

export { initialStore };
export default storeReducer;
