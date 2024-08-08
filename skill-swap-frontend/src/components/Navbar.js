import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';  

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/swap">Swap</Link>
        </li>
        <li>
          <Link to="/post-skills">Post</Link>
        </li>
        <li>
          <Link to="/members">Members</Link>
        </li>
        <li><Link to="/about">About</Link></li>
      </ul>
      
    </nav>
  );
};

export default Navbar;
