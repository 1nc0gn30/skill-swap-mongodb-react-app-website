import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faXing } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import '../styles/Profile.css';
import UserProfileDetails from '../components/UserProfileDetails';
import UserGuidelines from '../components/UserGuidelines';
import avatarlogo from './assets/user.png';

const Profile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        linkedin: '',
        xing: '',
        website: ''
    });
    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        username: '',
        linkedin: '',
        xing: '',
        website: ''
    });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                baseURL: 'https://skill---swap-a5a408e78c16.herokuapp.com'
            };

            try {
                const response = await axios.get('/api/users/me', config);
                setUser(response.data);
                setEditForm({ ...response.data });
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleInputChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post('https://skill---swap-a5a408e78c16.herokuapp.com/api/users/updateProfile', editForm, config);
            setUser({ ...user, ...response.data.user });
            setEditing(false);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile: ' + (error.response?.data?.message || 'Server error'));
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>No user data available. Please log in.</p>;

    return (
        <div className="profile">
            
            <h1 className="tracking-in-contract profile-title">{user.username}'s Profile</h1>
            <img src={avatarlogo} className="gif-logo" alt="Skill Swap Avatar Logo" />
            {!editing && <UserProfileDetails user={user} />}
            {editing ? (
                <form onSubmit={handleSubmit} className="profile-info">
                    <input type="text" name="firstName" value={editForm.firstName} onChange={handleInputChange} required className="input-field" placeholder="First Name" />
                    <input type="text" name="lastName" value={editForm.lastName} onChange={handleInputChange} required className="input-field" placeholder="Last Name" />
                    <input type="text" name="username" value={editForm.username} onChange={handleInputChange} required className="input-field" placeholder="Username" />
                    <input type="text" name="userskills" value={editForm.userskills} onChange={handleInputChange} required className="input-field" placeholder="User Skills. Please Seperate Each Skill By A Comma." />
                    <input type="url" name="linkedinUrl" value={editForm.linkedinUrl} onChange={handleInputChange} className="input-field" placeholder="LinkedIn URL" />
                    <input type="url" name="xUrl" value={editForm.xUrl} onChange={handleInputChange} className="input-field" placeholder="X URL" />
                    <input type="url" name="personalWebsiteUrl" value={editForm.personalWebsiteUrl} onChange={handleInputChange} className="input-field" placeholder="Personal Website URL" />
                        <button type="submit" className="button" disabled={loading}>Save Changes</button>
                        <button onClick={() => setEditing(false)} className="button">Cancel</button>
                </form>
            ) : (
                        <button onClick={() => setEditing(true)} className="button">Edit Profile</button>
            )}
            <div className="social-links">
                {user.linkedin && <a href={user.linkedin} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} className="social-icon" /></a>}
                {user.xing && <a href={user.xing} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faXing} className="social-icon" /></a>}
                {user.website && <a href={user.website} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGlobe} className="social-icon" /></a>}
            </div>
            <UserGuidelines username={user.username} />
            <LogoutButton />
        </div>
    );
};

export default Profile;
