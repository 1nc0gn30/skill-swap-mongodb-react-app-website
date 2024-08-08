import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const UserProfileDetails = ({ user }) => {
    return (
        <div className="user-details">
            <h2>{user.username}'s Details</h2>
            <p><strong>Name:</strong> {user.name}</p>
            
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Your Skills:</strong> {user.userskills}</p>
            <p><strong>LinkedIn:</strong> {user.linkedinUrl ? <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a> : 'Not provided'}</p>
            <p><strong>X (formerly Twitter):</strong> {user.xUrl ? <a href={user.xUrl} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faSquareXTwitter} /></a> : 'Not provided'}</p>
            <p><strong>Website:</strong> {user.personalWebsiteUrl ? <a href={user.personalWebsiteUrl} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGlobe} /></a> : 'Not provided'}</p>
        </div>
    );
};

export default UserProfileDetails;
