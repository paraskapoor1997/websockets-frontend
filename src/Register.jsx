import React, { useState } from 'react';
import './register.css'; // create this file
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler =async () => {
    console.log('Registration Data:', form);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
          method:'POST',
          headers: {'content-type': 'application/json'},
          body:JSON.stringify(form)
        })
    if(response.ok){
      const jsonresponse = await response.json();
      console.log('jsonresponse', jsonresponse)
      if(jsonresponse?.user){
        navigate('/login')
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="register-input"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="register-input"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="register-input"
          onChange={handleChange}
        />

        <button onClick={registerHandler} className="register-button">
          Register
        </button>

        <p className="register-footer">
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
