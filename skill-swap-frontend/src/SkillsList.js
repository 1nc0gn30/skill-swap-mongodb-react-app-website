import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './styles/SkillsList.css';

const SkillsList = () => {
    const [skills, setSkills] = useState([]);
    const [filteredSkills, setFilteredSkills] = useState([]); // Added for search filtering
    const [searchTerm, setSearchTerm] = useState(''); // State to hold search term
    const navigate = useNavigate();  // Initialize useNavigate

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get('https://skill---swap-a5a408e78c16.herokuapp.com/api/skills');
                setSkills(response.data);
                setFilteredSkills(response.data); // Initialize filtered skills
            } catch (error) {
                console.error('Error fetching skills', error);
            }
        };

        fetchSkills();
    }, []);

    useEffect(() => {
        const results = skills.filter(skill =>
            skill.skillOffered.toLowerCase().includes(searchTerm.toLowerCase()) ||
            skill.skillWanted.toLowerCase().includes(searchTerm.toLowerCase()) ||
            skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSkills(results);
    }, [searchTerm, skills]);

    const handlePostNewSkill = () => {
        navigate('/post-skills');  // Navigate to the Post Skills page
    };

    return (
        <div className="skills-container">
            <div className="title-search">
            <h1 className="tracking-in-contract">Available Skills</h1>
            <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            </div>
            <ul className="skills-list">
                {filteredSkills.map(skill => (
                    <li key={skill._id}>
                        <strong className="skill-detail">Offered:</strong> {skill.skillOffered} <br />
                        <strong className="skill-detail">Wanted:</strong> {skill.skillWanted} <br />
                        <strong className="skill-detail">Name:</strong> {skill.name} <br />
                        <strong className="skill-detail">Contact:</strong> {skill.contact} <br />
                        <strong className="skill-detail">Description:</strong> {skill.description} <br />
                        <strong className="skill-detail">Location:</strong> {skill.location} <br />
                        <strong className="skill-detail">Posted:</strong> {new Date(skill.dateTimePosted).toLocaleString()}
                    </li>
                ))}
            </ul>
            <button onClick={handlePostNewSkill} className="button-post-new">Post New Skill</button>
        </div>
    );
};

export default SkillsList;
