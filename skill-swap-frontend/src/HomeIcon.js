import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function HomeIcon() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div className="home-icon" onClick={goToHome}>
      <FontAwesomeIcon icon={faHome} />
    </div>
  );
}

export default HomeIcon;
