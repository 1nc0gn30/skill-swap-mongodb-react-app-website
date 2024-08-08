import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLinkedin, FaGlobe } from 'react-icons/fa'; // Importing icons
import '../styles/UsersList.css'; // Import CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            };
            try {
                const response = await axios.get('https://skill---swap-a5a408e78c16.herokuapp.com/api/users/allUsers', config);
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!users.length) return <p>No users found.</p>;

    return (
        <div className="user-list">
            <h1>Skill Swap Members</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>User Skills:</strong> {user.userskills}</p>
                        <p><strong>LinkedIn:</strong> {user.linkedinUrl ? <a href={user.linkedinUrl}><FaLinkedin />{user.linkedinUrl}</a> : 'N/A'}</p>
                        <p><strong>X:</strong> {user.xUrl ? <a href={user.xUrl}><FontAwesomeIcon icon={faSquareXTwitter} />{user.xUrl}</a> : 'N/A'}</p>
                        <p><strong>Website:</strong> {user.personalWebsiteUrl ? <a href={user.personalWebsiteUrl}><FaGlobe />{user.personalWebsiteUrl}</a> : 'N/A'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
