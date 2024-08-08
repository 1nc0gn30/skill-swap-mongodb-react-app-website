import React from 'react';

import '../styles/Landing.css';
import logo from '../assets/SkillSwapLogo.png';


function NotFound() {


  return (
    <div className="app-landing">
        <img className="slide-in-blurred-top" src={logo} alt="Skill Swap Logo" />
      <h1>Not Found 404</h1>
      
    </div>
  );
}

export default NotFound;
