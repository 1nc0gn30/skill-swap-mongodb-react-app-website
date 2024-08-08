import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PostSkills.css'; // Import the CSS file here
import SkillSwapExamples from '../components/SkillSwapExamples';

const PostSkill = () => {
  const [user, setUser] = useState({ name: '' }); // Store user data
  const [location, setLocation] = useState('');
  const [skillOffered, setSkillOffered] = useState('');
  const [skillWanted, setSkillWanted] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const BestPractices = () => (
    <div className="best-practices">
      <h2>Best Practices for Posting a Skill</h2>
      <ol>
        <li>Be honest about your skills and abilities.</li>
        <li>Only post skills you are sure you can complete a job with.</li>
        <li>Post your real name and contact information.</li>
        <li>In the description, be as detailed as possible about what you are expecting and what you are offering.</li>
        <li>Any reports of fraud will be reported to proper authorities, and your IP address will be blacklisted with further investigation.</li>
      </ol>
    </div>
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://skill---swap-a5a408e78c16.herokuapp.com/api/users/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUser({ name: response.data.name }); // Assume the name field exists in user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://skill---swap-a5a408e78c16.herokuapp.com/api/skills', {
        name: user.name, // Use name from fetched user data
        location,
        contact,
        description,
        skillOffered,
        skillWanted
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Skill posted successfully!');
      setIsSubmitted(true);
      setLocation('');
      setSkillOffered('');
      setSkillWanted('');
      setContact('');
      setDescription('');
    } catch (error) {
      console.error('Error posting skill:', error);
      alert('Failed to post skill. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="tracking-in-contract">Post A Skill</h1>
      <BestPractices />
      <h2>Here are some examples of Skill Swapping below!</h2>
      <SkillSwapExamples />
      <div className="form-field">
        <label className="label-text">Location:</label>
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="input-text" />
      </div>
      <div className="form-field">
        <label className="label-text">Name:</label>
        <input type="text" value={user.name} readOnly className="input-text" />
      </div>
      <div className="form-field">
        <label className="label-text">Contact Info:</label>
        <input type="text" value={contact} onChange={e => setContact(e.target.value)} required className="input-text" placeholder="Please enter valid contact info." />
      </div>
      <div className="form-field">
        <label className="label-text">Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} required className="textarea-input" placeholder="Please enter a valid description of the skill swap you want to post." />
      </div>
      <div className="form-field">
        <label className="label-text">Skill Offered:</label>
        <input type="text" value={skillOffered} onChange={e => setSkillOffered(e.target.value)} required className="input-text" placeholder="Please enter only one skill." />
      </div>
      <div className="form-field">
        <label className="label-text">Skill Wanted:</label>
        <input type="text" value={skillWanted} onChange={e => setSkillWanted(e.target.value)} required className="input-text" placeholder="Please enter reasonable skills your are looking for."/>
      </div>
      
      <button type="submit" className="button-main">Post Skill</button>
      {isSubmitted && (
        <button type="button" onClick={() => navigate('/skills-list')} className="button-secondary">
          Go to Skills List
        </button>
      )}
    </form>
  );
};

export default PostSkill;
