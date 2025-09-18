import React from 'react';
import Header from './Header';
import Footer from './Footer';
import PricingCard from './PricingCard';

const plans = {
  basic: {
    title: 'Basic',
    price: '$19/mo',
    features: [
      { label: 'Patient Management', included: true },
      { label: 'Appointment Scheduling', included: true },
      { label: 'Email Reminders', included: true },
      { label: 'Analytics Dashboard', included: false },
      { label: 'Advanced Protocols', included: false },
    ],
    buttonText: 'Choose Basic',
  },
  pro: {
    title: 'Pro',
    price: '$49/mo',
    features: [
      { label: 'Patient Management', included: true },
      { label: 'Appointment Scheduling', included: true },
      { label: 'Email & SMS Reminders', included: true },
      { label: 'Analytics Dashboard', included: true },
      { label: 'Custom Protocols', included: true },
    ],
    buttonText: 'Start Pro Trial',
    isHighlighted: true,
  },
  enterprise: {
    title: 'Enterprise',
    price: 'Contact Us',
    features: [
      { label: 'All Pro features', included: true },
      { label: 'Dedicated Support', included: true },
      { label: 'Custom Integrations', included: true },
      { label: 'On-prem Deployment', included: false },
      { label: 'SLA & Compliance', included: true },
    ],
    buttonText: 'Contact Sales',
    isOutlineButton: true,
  },
};

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900">Our Flexible Plans</h1>
              <p className="text-lg text-gray-600 mt-2">Choose the perfect plan to streamline your Panchakarma practice and patient management.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PricingCard {...plans.basic} />
              <PricingCard {...plans.pro} isHighlighted={true} />
              <PricingCard {...plans.enterprise} isOutlineButton={true} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;


