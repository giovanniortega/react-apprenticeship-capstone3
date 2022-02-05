import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreContext';
import Register from '../../components/Register/Register.component';

function RegisterPage() {
  const { store } = useContext(StoreContext);
  const { authState } = store;
  return (
    <>
      <h1>RegisterPage</h1>
      {!authState && <Register />}
    </>
  );
}

export default RegisterPage;
