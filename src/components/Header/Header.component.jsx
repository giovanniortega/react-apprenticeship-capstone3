import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { StoreContext } from '../../store/StoreContext';
import { Link } from 'react-router-dom';

function Header() {
  const { store, dispatch } = useContext(StoreContext);
  const { authState } = store;
  // const navigate = Navigate();

  // console.log(navigate);

  const logout = async (evt) => {
    evt.preventDefault();
    await signOut(auth);
    dispatch({ type: 'setNoteList', payload: [] });
  };

  return (
    <header>
      {authState && (
        <div>
          <Link to="/">Home</Link>
          <Link to="/archive">Archive</Link>
          <h4>
            User logged In:
            {authState && authState.email}
          </h4>
          <button type="button" onClick={logout}>
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
