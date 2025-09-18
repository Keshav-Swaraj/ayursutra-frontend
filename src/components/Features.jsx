import React from 'react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      title: "Comprehensive Health Tracking",
      description: "Monitor your dosha balance, track symptoms, and maintain detailed health records with our intuitive dashboard."
    },
    {
      title: "Personalized Treatment Plans",
      description: "Receive customized Ayurvedic treatment recommendations based on your unique constitution and current health status."
    },
    {
      title: "Expert Practitioner Network",
      description: "Connect with certified Ayurvedic practitioners and wellness experts for personalized consultations and guidance."
    },
    {
      title: "Digital Panchakarma Records",
      description: "Securely store and manage your Panchakarma treatment history, progress notes, and therapeutic outcomes."
    },
    {
      title: "Wellness Analytics",
      description: "Gain insights into your health trends, treatment effectiveness, and wellness patterns through detailed analytics."
    },
    {
      title: "Mobile Accessibility",
      description: "Access your health information and treatment plans anywhere, anytime with our responsive mobile platform."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose AyurSutra?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the perfect fusion of ancient Ayurvedic wisdom and modern technology 
            to transform your wellness journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
