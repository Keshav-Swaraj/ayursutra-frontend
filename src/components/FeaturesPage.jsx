import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Features from './Features';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;


