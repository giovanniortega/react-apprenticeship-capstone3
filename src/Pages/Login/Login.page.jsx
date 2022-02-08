import React, { useContext } from 'react';
import Login from '../../components/Login/Login.component';
import { StoreContext } from '../../store/StoreContext';

function LoginPage() {
  const { store } = useContext(StoreContext);
  const { authState } = store;

  return (
    <>
      <h1 className="centered">Login</h1>
      {!authState && <Login />}
    </>
  );
}

export default LoginPage;
