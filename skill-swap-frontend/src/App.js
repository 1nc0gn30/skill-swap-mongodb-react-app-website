import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PostSkills from './pages/PostSkills';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Profile from './pages/Profile';
import SkillsList from './SkillsList';
import UsersList from './components/UsersList';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/index.html" element={<Landing />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/swap" element={<ProtectedRoute component={SkillsList} />} />
          <Route path="/post-skills" element={<ProtectedRoute component={PostSkills} />} />
          <Route path="/members" element={<ProtectedRoute component={UsersList} />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
