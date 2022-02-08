import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { StoreContext } from '../../store/StoreContext';
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
            <button type="button" onClick={logout} className="secondary-btn">
              Sign Out
            </button>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
