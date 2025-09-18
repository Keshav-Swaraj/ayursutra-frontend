import React from 'react';

const Hero = () => {
  return (
    <section className="bg-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Modern Panchakarma 
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Transform your wellness journey with our comprehensive Ayurvedic management platform. 
              Experience the perfect blend of ancient wisdom and modern technology to achieve optimal health and balance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-ayur-green text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Get Started
              </button>
              <button className="px-8 py-3 border border-ayur-green text-ayur-green rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column - Image Placeholder */}
          <div className="flex justify-center">
            <div className="w-full max-w-md h-80 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-lg">Image Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
