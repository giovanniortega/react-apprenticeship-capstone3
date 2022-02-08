import { useState } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, seteEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (evt) => {
    seteEnteredValue(evt.target.value);
  };

  const blurInputHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    seteEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    blurInputHandler,
    reset,
  };
};

export default useInput;
