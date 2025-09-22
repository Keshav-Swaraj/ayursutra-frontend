import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const DoctorSidebar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/doctor-dashboard';

  const navItem = (to, label, isActive) => (
    <NavLink
      to={to}
      className={`flex items-center space-x-3 p-3 rounded-lg font-medium ${
        isActive ? 'bg-ayur-green/10 text-ayur-green' : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <div className="w-5 h-5 bg-gray-400 rounded" />
      <span>{label}</span>
    </NavLink>
  );

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold text-ayur-green">AyurSutra</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-gray-400 rounded"></div>
          <h2 className="text-lg font-semibold text-gray-700">Doctor Panel</h2>
        </div>
      </div>

      <nav className="flex-1 space-y-4">
        {navItem('/doctor-dashboard', 'Dashboard', isDashboard)}
        {navItem('/doctor-patients', 'Patients', location.pathname === '/doctor-patients')}
        {navItem('/doctor-schedule', 'Schedule', location.pathname === '/doctor-schedule')}
        {navItem('/doctor-protocols', 'Protocols', location.pathname === '/doctor-protocols')}
      </nav>
    </div>
  );
};

export default DoctorSidebar;


