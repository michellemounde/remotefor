import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import { useModal } from '../../context/Modal';

import './SignupForm.css';

const SignupFormModal = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const payload = {
        firstName,
        lastName,
        username,
        email,
        password,
      };

      return dispatch(sessionActions.signup(payload))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    return setErrors({
      confirmPassword: 'Confirm Password field must be the same as the password field',
    });
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>

        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          First Name
          <input
            type='text'
            placeholder='Enter first name'
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Last Name
          <input
            type='text'
            placeholder='Enter last name'
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        {errors.username && <p>{errors.username}</p>}
        <label>
          Username
          <input
            type='text'
            placeholder='Enter username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        {errors.email && <p>{errors.email}</p>}
        <label>
          Email
          <input
            type='text'
            placeholder='Enter email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {errors.password && <p>{errors.password}</p>}
        <label>
          Password
          <input
            type='text'
            placeholder='Enter password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <label>
          Confirm Password
          <input
            type='text'
            placeholder='Re-enter password'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <button type='submit'>Sign Up</button>
      </form>
    </>
  );
};

export default SignupFormModal;
