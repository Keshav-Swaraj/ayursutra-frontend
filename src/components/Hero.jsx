import React from 'react';

const Hero = () => {
  return (
    <section className="bg-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Modern Panchakarma Management
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

          {/* Right Column - Video */}
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-gray-300 rounded-lg overflow-hidden">
              <video 
                className="w-full h-full object-cover" 
                src="/public/AdobeStock_291999871_Video_HD_Preview.mov" // <--- REPLACE THIS WITH YOUR VIDEO PATH
                autoPlay // Starts playing automatically
                loop     // Loops the video
                muted    // Mutes the video by default (good for autoplay)
                playsInline // Important for iOS autoplay
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
