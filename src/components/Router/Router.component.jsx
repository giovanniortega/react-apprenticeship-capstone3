import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../../Pages/Home/Home.page';
import LoginPage from '../../Pages/Login/Login.page';
import RegisterPage from '../../Pages/Register/Register.page';
import ArchivePage from '../../Pages/Archive/Archive.page';
import { StoreContext } from '../../store/StoreContext';

function Router() {
  const { store } = useContext(StoreContext);
  const { authState } = store;

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={!authState ? <Navigate replace to="/login" /> : <HomePage />}
      />
      <Route
        path="/login"
        element={!authState ? <LoginPage /> : <Navigate replace to="/" />}
      />
      <Route
        path="/register"
        element={!authState ? <RegisterPage /> : <Navigate replace to="/" />}
      />
      <Route
        path="/archive"
        element={
          !authState ? <Navigate replace to="/login" /> : <ArchivePage />
        }
      />
      <Route
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <p>404: There&apos;s nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
}

export default Router;
