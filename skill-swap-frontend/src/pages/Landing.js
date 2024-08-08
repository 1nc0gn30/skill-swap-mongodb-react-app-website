import React, { useState } from 'react';
import { Paper, MobileStepper, Button } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import '../styles/Landing.css';
import logo from '../assets/SkillSwapLogo.png';
import Login from '../Login';
import Register from '../Register';

function Landing() {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 2;

  const handleLogin = token => {
    console.log(token);  // Just for debugging
    // Here you might want to save the token to localStorage or context/state
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="app-landing">
      <img className="slide-in-blurred-top" src={logo} alt="Skill Swap Logo" />
      <h1>Welcome to Skill Swap</h1>
      <h2>"Connect, collaborate, and exchange skills with others."</h2>
      <Paper square elevation={0} className="paper-container" >
        <p>Please use the next/back buttons below to choose from our login/register forms.</p>
        {activeStep === 0 ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Register />
        )}
      </Paper>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
}

export default Landing;
