import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Vision from './Vision';
import CTA from './CTA';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Vision />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;
