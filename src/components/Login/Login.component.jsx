import React, { useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Login() {
  const loginEmailInputRef = useRef();
  const loginPasswordInputRef = useRef();
  const navigate = useNavigate();

  const loginSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const email = loginEmailInputRef.current.value;
      const password = loginPasswordInputRef.current.value;
      await signInWithEmailAndPassword(auth, email, password);
      loginEmailInputRef.current.value = '';
      loginPasswordInputRef.current.value = '';
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={loginSubmit}>
        <fieldset>
          <legend>Login</legend>
          <div>
            <label htmlFor="login-email-input">Email</label>
            <input
              type="input"
              name="login-email-input"
              id="login-email-input"
              ref={loginEmailInputRef}
            />
          </div>
          <div>
            <label htmlFor="login-password-input">Password</label>
            <input
              type="input"
              name="login-password-input"
              id="login-password-input"
              ref={loginPasswordInputRef}
            />
          </div>
          <button type="submit">Login</button>
        </fieldset>
      </form>
      <button
        type="button"
        onClick={() => {
          navigate('/register');
        }}
      >
        Register
      </button>
    </>
  );
}

export default Login;
