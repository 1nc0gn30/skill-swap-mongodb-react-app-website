import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/RegisterForm.css';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      console.log('Sending request with password:', password); // Add this line
      await axios.post('https://yourherokuurl.herokuapp.com/api/auth/register', {
        firstName,
        lastName,
        username,
        email,
        password
      });
      setRegistered(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error registering');
    }
  };
  

  if (registered) {
    return (
      <div className="register-form">
        <h2>Thank You for Registering!</h2>
        <p>Please sign in with your credentials. Thank you for choosing Skill Swap!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleRegister} className="register-form">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <div>
        <label>First Name:</label>
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
