import React, { useState, useRef } from 'react';
import './App.css'; 

const FormComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const lettersAndSpacesRegex = /^[A-Za-z\s]+$/;
    
    if (!inputValue.trim()) {
      setErrorMessage('Input cannot be empty');
      setSubmissionStatus('error');
      inputRef.current.focus();
      return;
    }

    if (!lettersAndSpacesRegex.test(inputValue)) {
      setErrorMessage('Only letters and spaces are allowed');
      setSubmissionStatus('error');
      inputRef.current.focus();
      return;
    }

    console.log(inputValue);
    setSubmissionStatus('success');
    setErrorMessage('');
    setInputValue(''); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={isFocused || submissionStatus === 'error' ? 'input-error' : ''}
        />
        <button type="submit">Submit</button>
      </form>
      {submissionStatus === 'success' && <p className="success-message">Form submitted successfully!</p>}
      {submissionStatus === 'error' && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default FormComponent;
