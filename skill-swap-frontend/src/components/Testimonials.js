import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Testimonials.css'; // Import your CSS file

const testimonials = [
  {
    name: 'Sarah Jones',
    profession: 'Marketing Manager',
    url: "/assets/SkillSwapLogo.png",
    quote:
      'Skill Swap helped me connect with a talented graphic designer who created stunning visuals for my marketing campaign. It saved me time and money while giving me access to incredible skills.',
  },
  {
    name: 'David Lee',
    profession: 'Software Developer',
    url: "/assets/SkillSwapLogo.png",
    quote:
      'I was looking to learn Python for a personal project. Through Skill Swap, I found a patient tutor who guided me through the process. Now, I\'m building my own web applications!',
  },
  {
    name: 'Maria Rodriguez',
    profession: 'Music Teacher',
    url: "/assets/SkillSwapLogo.png",
    quote:
      'Skill Swap has been a fantastic platform for sharing my passion for music. I teach guitar lessons in exchange for learning new languages from other members. It\'s a win-win situation!',
  },
  {
    name: 'Michael Thompson',
    profession: 'Entrepreneur',
    url: "/assets/SkillSwapLogo.png",
    quote:
      'Skill Swap helped me find a skilled accountant to manage my business finances. The platform\'s barter system allowed me to access valuable services without upfront costs, which was crucial for my startup.',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What People Say About Skill Swap</h2>
      <div className="testimonial-container">
        {testimonials.map((testimonial) => (
          <figure className="testimonial-item" key={testimonial.name}>
            <img
              src={testimonial.url} // Replace with actual profile pictures
              alt={testimonial.name}
              className="profile-pic"
            />
            <figcaption>
              <p className="quote">{testimonial.quote}</p>
              <p className="name">{testimonial.name}, {testimonial.profession}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      profession: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      quote: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Testimonials;
