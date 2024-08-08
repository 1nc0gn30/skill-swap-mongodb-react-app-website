import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';  // Make sure to create and link this CSS file for styling
import { Typography } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-and-conditions">Terms & Conditions</Link>
        <p>© {currentYear} All rights reserved Skill Swap</p>
      </div>
      <Typography variant="body2" sx={{ mt: { xs: 2, md: 0 } }}>
        Website built by{' '}
        <a
          href="https://nealfrazier.tech"
          className="nft-link"
          target="_blank"
          rel="noopener noreferrer"
          style={{textDecoration: 'underline' }}
        >
          Neal Frazier Tech
        </a>
      </Typography>
    </footer>
  );
};

export default Footer;
