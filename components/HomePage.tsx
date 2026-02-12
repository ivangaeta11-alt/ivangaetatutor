
import React from 'react';
import Hero from './Hero';
import Manifesto from './Manifesto';
import Method from './Method';
import Features from './Features';
import Testimonials from './Testimonials';
import Contact from './Contact';

interface HomePageProps {
  onNavigateRisorse: () => void;
  onNavigateContact: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateRisorse, onNavigateContact }) => {
  return (
    <>
      <Hero 
        onNavigateRisorse={onNavigateRisorse} 
      />
      <Manifesto />
      <Method />
      <Features onNavigate={onNavigateContact} />
      <Testimonials />
      <Contact />
    </>
  );
};

export default HomePage;
