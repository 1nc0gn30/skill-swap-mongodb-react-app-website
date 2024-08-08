import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token'); // Ensure this key matches what you set during login
    return Boolean(token); // Returns true if token is not null
  };

  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
