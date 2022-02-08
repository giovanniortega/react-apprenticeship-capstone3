import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { StoreContext } from '../../store/StoreContext';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';

function Header() {
  const { store, dispatch } = useContext(StoreContext);
  const { authState, location, userInfo } = store;

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
          {location == '/' && (
            <Link to="/archive" className={classes.link}>
              Archive
            </Link>
          )}
          {location == '/archive' && (
            <Link to="/" className={classes.link}>
              My notes
            </Link>
          )}

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
