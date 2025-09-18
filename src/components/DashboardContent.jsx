import React from 'react';

const DashboardContent = () => {
  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hello, Divya Sharma!</h1>
        <p className="text-gray-600">Welcome back to your wellness journey</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button className="flex items-center justify-center space-x-2 p-4 bg-ayur-green text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
          <div className="w-5 h-5 bg-white rounded"></div>
          <span>Book New Appointment</span>
        </button>
        
        <button className="flex items-center justify-center space-x-2 p-4 bg-ayur-green text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
          <div className="w-5 h-5 bg-white rounded"></div>
          <span>Log Daily Entry</span>
        </button>
        
        <button className="flex items-center justify-center space-x-2 p-4 bg-ayur-green text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
          <div className="w-5 h-5 bg-white rounded"></div>
          <span>View Protocols</span>
        </button>
        
        <button className="flex items-center justify-center space-x-2 p-4 bg-ayur-green text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
          <div className="w-5 h-5 bg-white rounded"></div>
          <span>Contact Doctor</span>
        </button>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointment Card */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointment</h3>
          <div className="space-y-2 mb-4">
            <p className="text-gray-700"><strong>Date:</strong> March 15, 2024</p>
            <p className="text-gray-700"><strong>Time:</strong> 10:00 AM</p>
            <p className="text-gray-700"><strong>Doctor:</strong> Dr. Rajesh Kumar</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-ayur-green text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
              View Details
            </button>
            <button className="px-4 py-2 border border-ayur-green text-ayur-green rounded-lg text-sm hover:bg-green-50 transition-colors">
              Reschedule
            </button>
          </div>
        </div>

        {/* Progress Overview Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Overview</h3>
          <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <span className="text-gray-500">Progress Chart Placeholder</span>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-700">New treatment protocol available</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-700">Appointment reminder</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-700">Daily entry reminder</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Completed daily wellness check</p>
              <span className="text-xs text-gray-500">Today</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Updated medication log</p>
              <span className="text-xs text-gray-500">Yesterday</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Scheduled follow-up appointment</p>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Reviewed treatment progress</p>
              <span className="text-xs text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>

        {/* Daily Wellness Tip Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Wellness Tip</h3>
          <p className="text-gray-700 leading-relaxed">
            Start your day with a glass of warm water with lemon to help balance your digestive fire (agni) 
            and promote healthy metabolism. This simple Ayurvedic practice can help cleanse your system 
            and prepare your body for the day ahead.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
