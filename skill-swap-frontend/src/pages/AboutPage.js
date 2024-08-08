import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AboutPage.css'; // Ensure to create a CSS file for styling
import skills from './assets/skills.gif';
import growth from './assets/growth.gif';
import goal from './assets/goal.gif';
import globalconnections from './assets/global-connection.gif';
import logo from '../assets/SkillSwapLogo.png';
import Testimonials from '../components/Testimonials';

const AboutPage = () => {
  return (
    <div className="about-page">
       <img className="slide-in-blurred-top" src={logo} alt="Skill Swap Logo" />
      <section className="hero-section">
        <h1>Welcome to Skill Swap</h1>
        <p>
          Skill Swap is a vibrant community where individuals with diverse talents
          come together to exchange knowledge and expertise. It's a platform that
          goes beyond traditional learning, fostering meaningful connections and
          mutual growth through skill bartering.
        </p>
      </section>

      <section className="benefits">
        <h2>Why Join Skill Swap?</h2>
        <div className="benefit-item">
          <img className="gif-logos" src={skills} alt="Skill Swap Build Lifetime Connections" />
          <h3>Build Lasting Connections</h3>
          <p>
            Forget transactional learning. Skill Swap is about building genuine
            connections with like-minded individuals who share your passion for
            learning and teaching. Each exchange has the potential to blossom
            into long-lasting friendships, collaborations, or even mentorship
            opportunities.
          </p>
        </div>
        <div className="benefit-item">
          <img className="gif-logos" src={growth} alt="Skill Swap Advance Your Career" />
          <h3>Advance Your Career Prospects</h3>
          <p>
            Skill Swap unlocks a world of possibilities beyond the limitations
            of traditional education or employment settings. Gain access to
            valuable skills and knowledge that can directly translate into
            freelance gigs, career advancement, or even full-time job opportunities.
          </p>
        </div>
        <div className="benefit-item">
          <img className="gif-logos" src={goal} alt="Skill Swap Personall Growth" />
          <h3>Embrace Personal Growth</h3>
          <p>
            Step outside your comfort zone and embark on a journey of continuous
            learning. Skill Swap empowers you to challenge yourself with new
            skills while simultaneously sharing your own expertise with others,
            enriching both your personal and professional development.
          </p>
        </div>
        <div className="benefit-item">
          <img className="gif-logos" src={globalconnections} alt="Skill Swap Global Connections" />
          <h3>Strengthen Your Global Community</h3>
          <p>
            Transcend geographical boundaries and connect with a diverse network
            of individuals from all corners of the world. Skill Swap fosters a
            supportive and self-sustaining community where everyone benefits from
            the collective pool of knowledge and skills, building a stronger and
            more connected global society.
          </p>
        </div>
        <Testimonials />
      </section>

      <section className="call-to-action">
        <h2>Ready to Swap Skills and Start Growing?</h2>
        
        <Link to="/post-skills" className="signup-link">Post Your Skills</Link>
        <Link to="/swap" className="signup-link">Browse the Skill Swap List</Link>
      </section>
      
    </div>
  );
};

export default AboutPage;
