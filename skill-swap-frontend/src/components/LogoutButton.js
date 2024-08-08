import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate hook from react-router-dom

const LogoutButton = () => {
    const navigate = useNavigate(); // Access navigate function

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from localStorage
        navigate('/'); // Redirect to the homepage or login page
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Log Out
        </button>
    );
};

export default LogoutButton;
