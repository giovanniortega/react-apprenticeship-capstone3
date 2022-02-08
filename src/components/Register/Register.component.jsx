import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import useInput from '../../utils/hooks/useInput';

function Register() {
  const [apiError, setApiError] = useState(null);

  const {
    value: userNameInput,
    isValid: enteredUserNameIsValid,
    hasError: userNameInputHasError,
    valueChangeHandler: userNameInputChangeHandler,
    blurInputHandler: userNameInputBlurHandler,
    reset: resetUserNameInput,
  } = useInput((value) => value.trim() !== '');

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

  if (enteredUserNameIsValid && emailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const registerSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const userName = userNameInput;
      const email = emailInput;
      const password = passwordInput;

      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, 'notes', createdUser.user.uid, 'userData', 'info'), {
        userId: createdUser.user.uid,
        userName: userName,
        email: email,
      });
    } catch (error) {
      setApiError(error.message);
    }

    resetUserNameInput();
    resetEmailInput();
    resetPasswordInput();
  };

  return (
    <div className="form-container">
      <form onSubmit={registerSubmit} className="form">
        <fieldset>
          <div className={`form-control ${userNameInputHasError && 'invalid'}`}>
            <label htmlFor="register-username-input">User name</label>
            <input
              type="input"
              name="register-username-input"
              id="register-username-input"
              value={userNameInput}
              onChange={userNameInputChangeHandler}
              onBlur={userNameInputBlurHandler}
            />
            {userNameInputHasError && (
              <p className="error-text">User name must not be empty!</p>
            )}
          </div>
          <div className={`form-control ${emailInputHasError && 'invalid'}`}>
            <label htmlFor="register-email-input">Email</label>
            <input
              type="input"
              name="register-email-input"
              id="register-email-input"
              value={emailInput}
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
            />
            {emailInputHasError && (
              <p className="error-text">Please insert a valid email!</p>
            )}
          </div>
          <div className={`form-control ${passwordInputHasError && 'invalid'}`}>
            <label htmlFor="register-password-input">Password</label>
            <input
              type="password"
              name="register-password-input"
              id="register-password-input"
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
            Register
          </button>
        </fieldset>
      </form>
      {apiError && (
        <p className="error-text">Something went wrong: {apiError}</p>
      )}
      <p className="form-footnote">
        Are you already registered? Login <Link to="/login">here</Link>
      </p>
    </div>
  );
}

export default Register;
