import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Icon Placeholder */}
      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
        <div className="w-6 h-6 bg-ayur-green rounded"></div>
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
