import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './LoginValidation';
import { AuthContext } from './AuthContext';

function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { handleLogin } = useContext(AuthContext); // Access login function from context
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);

    // Proceed if no validation errors
    if (!err.email && !err.password) {
      axios.post('http://localhost:8081/login', values)
        .then((res) => {
          if (res.data.errors) {
            setBackendError(res.data.errors); // Show backend errors
          } else {
            setBackendError([]);
            if (res.data === 'Success') {
              handleLogin(values.email); // Update context with login state
              navigate('/home'); // Redirect to home page on success
            } else {
              alert('No record existed');
            }
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-In</h2>
        {backendError.length > 0 && backendError.map((e) => (
          <p className='text-danger' key={e.msg}>{e.msg}</p>
        ))}
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter Email'
              onChange={handleInput}
              className='form-control rounded-0'
              autoComplete='email'
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <div className='input-group'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id='password'
                name='password'
                placeholder='Enter Password'
                onChange={handleInput}
                className='form-control rounded-0'
                autoComplete='current-password'
              />
              <span className='input-group-text'>
                <input
                  type='checkbox'
                  id='togglePassword'
                  checked={passwordVisible}
                  onChange={togglePasswordVisibility}
                />
                <label htmlFor='togglePassword'>
                  {passwordVisible ? 'Hide' : 'Show'}
                </label>
              </span>
            </div>
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
          <p>You agree to our terms and policies</p>
          <Link to='/register' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
