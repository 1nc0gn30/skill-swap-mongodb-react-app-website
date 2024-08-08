import './styles/LoginForm.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://skill---swap-a5a408e78c16.herokuapp.com/api/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token); // Store token
      onLogin(response.data.token);  // Optional: if you manage the login state higher up
      navigate('/about');  // Redirect to home after successful login
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      // Handle errors, show user feedback
    }
  };
  

  

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
     
    </form>
  );
}

export default Login;
