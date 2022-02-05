import React, { useRef, Fragment } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Register() {
  const registerEmailInputRef = useRef();
  const registerPasswordInputRef = useRef();
  const navigate = useNavigate();

  const registerSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const email = registerEmailInputRef.current.value;
      const password = registerPasswordInputRef.current.value;
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      registerEmailInputRef.current.value = '';
      registerPasswordInputRef.current.value = '';
      console.log(createdUser.user.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={registerSubmit}>
        <fieldset>
          <legend>Register</legend>
          <div>
            <label htmlFor="register-email-input">Email</label>
            <input
              type="input"
              name="register-email-input"
              id="register-email-input"
              ref={registerEmailInputRef}
            />
          </div>
          <div>
            <label htmlFor="register-password-input">Password</label>
            <input
              type="input"
              name="register-password-input"
              id="register-password-input"
              ref={registerPasswordInputRef}
            />
          </div>
          <button type="submit">Send</button>
        </fieldset>
      </form>
      <button type="button" onClick={() => navigate('/login')}>
        Login
      </button>
    </>
  );
}

export default Register;
