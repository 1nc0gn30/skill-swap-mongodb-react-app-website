import React from 'react';
import '../styles/UserGuidelines.css'; // Ensure CSS file is linked

const UserGuidelines = ({ username }) => { // Accept username as a prop
    return (
        <div className="guidelines-container">
            <h2>User Guidelines</h2>
            <p>Welcome to Skill Swap {username}! Here are some guidelines to help you make the most of your experience:</p>
            <ul>
                <li><strong>Honesty:</strong> Always provide accurate and honest information in your profiles and skill descriptions.</li>
                <li><strong>Respect:</strong> Treat all members with respect, regardless of their skill level or background.</li>
                <li><strong>No Typos:</strong> Strive for clear communication. Avoid typos and use slang judiciously to ensure understanding unless it’s relevant for branding or describing a specific skill.</li>
                <li><strong>Reporting Issues:</strong> Help us maintain a safe community by reporting any false claims or inappropriate behavior immediately.</li>
            </ul>
        </div>
    );
};

export default UserGuidelines;
