import React from 'react';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';

const PatientDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Column - Fixed Sidebar */}
      <div className="w-64 bg-white">
        <Sidebar />
      </div>
      
      {/* Right Column - Main Content */}
      <div className="flex-1 bg-gray-100">
        <DashboardContent />
      </div>
    </div>
  );
};

export default PatientDashboard;
