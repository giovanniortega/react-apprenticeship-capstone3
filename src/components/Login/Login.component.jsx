import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import useInput from '../../utils/hooks/useInput';

function Login() {
  const [apiError, setApiError] = useState(null);

  const {
    value: emailInput,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    blurInputHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes('@'));

  const {
    value: passwordInput,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordInputChangeHandler,
    blurInputHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim().length >= 6);

  let formIsValid = false;

  if (emailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const navigate = useNavigate();

  const loginSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const email = emailInput;
      const password = passwordInput;
      await signInWithEmailAndPassword(auth, email, password);

      resetEmailInput();
      resetPasswordInput();
      navigate('/');
    } catch (error) {
      setApiError(error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={loginSubmit} className="form">
        <fieldset>
          <div className={`form-control ${emailInputHasError && 'invalid'}`}>
            <label htmlFor="login-email-input">Email</label>
            <input
              type="input"
              name="login-email-input"
              id="login-email-input"
              value={emailInput}
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
            />
            {emailInputHasError && (
              <p className="error-text">Please insert a valid email!</p>
            )}
          </div>
          <div className={`form-control ${passwordInputHasError && 'invalid'}`}>
            <label htmlFor="login-password-input">Password</label>
            <input
              type="password"
              name="login-password-input"
              id="login-password-input"
              value={passwordInput}
              onChange={passwordInputChangeHandler}
              onBlur={passwordInputBlurHandler}
            />
            {passwordInputHasError && (
              <p className="error-text">
                Password must have at least 6 characters!
              </p>
            )}
          </div>
          <button type="submit" disabled={!formIsValid}>
            Login
          </button>
        </fieldset>
      </form>
      {apiError && (
        <p className="error-text">Something went wrong: {apiError}</p>
      )}
      <p className="form-footnote">
        Don&apos;t have an account? Register <Link to="/register">here</Link>
      </p>
    </div>
  );
}

export default Login;
