import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { FaPowerOff } from 'react-icons/fa';
import classes from './Header.module.css';

function Header() {
  const { store, dispatch } = useContext(StoreContext);
  const { authState, userInfo } = store;

  const logout = async (evt) => {
    evt.preventDefault();
    await signOut(auth);
    dispatch({ type: 'setNoteList', payload: [] });
  };

  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        Notes<span>Keeper</span>
      </h1>
      {authState && (
        <>
          <div className={classes.utilities}>
            <p className={classes.greeting}>
              Hi: {userInfo && userInfo.userName}
            </p>
            <button type="button" onClick={logout}>
              <FaPowerOff />
              <span>Sign Out</span>
            </button>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
