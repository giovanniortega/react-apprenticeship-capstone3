import React, { useReducer } from 'react';
import storeReducer, { initialStore } from './StoreReducer';

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore);
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
