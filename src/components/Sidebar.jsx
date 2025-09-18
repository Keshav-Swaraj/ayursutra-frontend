import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/patient-dashboard';
  const isAppointments = location.pathname === '/patient-appointment';
  const isProgress = location.pathname === '/patient-progress';
  const isProfile = location.pathname === '/patient-profile';
  return (
    <div className="h-full flex flex-col p-6">
      {/* Top Section - Logo and Dashboard Heading */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold text-ayur-green">AyurSutra</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-gray-400 rounded"></div>
          <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 space-y-4">
        <NavLink
          to="/patient-dashboard"
          className={`flex items-center space-x-3 p-3 rounded-lg font-medium ${
            isDashboard ? 'bg-ayur-green/10 text-ayur-green' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="w-5 h-5 bg-gray-400 rounded"></div>
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink
          to="/patient-appointment"
          className={`flex items-center space-x-3 p-3 rounded-lg font-medium ${
            isAppointments ? 'bg-ayur-green/10 text-ayur-green' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="w-5 h-5 bg-gray-400 rounded"></div>
          <span>Appointments</span>
        </NavLink>
        
        <NavLink
          to="/patient-progress"
          className={`flex items-center space-x-3 p-3 rounded-lg font-medium ${
            isProgress ? 'bg-ayur-green/10 text-ayur-green' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="w-5 h-5 bg-gray-400 rounded"></div>
          <span>Progress</span>
        </NavLink>
        
        <NavLink
          to="/patient-profile"
          className={`flex items-center space-x-3 p-3 rounded-lg font-medium ${
            isProfile ? 'bg-ayur-green/10 text-ayur-green' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="w-5 h-5 bg-gray-400 rounded"></div>
          <span>Profile</span>
        </NavLink>
      </nav>

      {/* Bottom Section - Settings and Help */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <a 
          href="#" 
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <div className="w-5 h-5 bg-gray-400 rounded"></div>
          <span>Settings</span>
        </a>
        
        <a 
          href="#" 
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <div className="w-5 h-5 bg-gray-400 rounded"></div>
          <span>Help & Support</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
