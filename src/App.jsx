import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContent';
import Appointments from './components/Appointments';
import Progress from './components/Progress';
import Profile from './components/Profile';
import DoctorSidebar from './components/DoctorSidebar';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorPatients from './components/DoctorPatients';
import DoctorSchedule from './components/DoctorSchedule';
import DoctorAnalytics from './components/DoctorAnalytics';
import DoctorProtocols from './components/DoctorProtocols';
import PatientLogin from './components/PatientLogin'; 
import PatientRegistration from './components/PatientRegistration';
import FeaturesPage from './components/FeaturesPage';
import Pricing from './components/Pricing';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import './App.css';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-white">
        <Sidebar />
      </div>
      <div className="flex-1 bg-gray-100">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patient-dashboard" element={<Layout><DashboardContent /></Layout>} />
        <Route path="/patient-appointment" element={<Layout><Appointments /></Layout>} />
        <Route path="/patient-progress" element={<Layout><Progress /></Layout>} />
        <Route path="/patient-profile" element={<Layout><Profile /></Layout>} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-registration" element={<PatientRegistration />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/doctor-dashboard" element={
          <div className="min-h-screen bg-gray-100 flex">
            <div className="w-64 bg-white">
              <DoctorSidebar />
            </div>
            <div className="flex-1 bg-gray-100">
              <DoctorDashboard />
            </div>
          </div>
        } />
        <Route path="/doctor-patients" element={
          <div className="min-h-screen bg-gray-100 flex">
            <div className="w-64 bg-white">
              <DoctorSidebar />
            </div>
            <div className="flex-1 bg-gray-100">
              <DoctorPatients />
            </div>
          </div>
        } />
        <Route path="/doctor-schedule" element={
          <div className="min-h-screen bg-gray-100 flex">
            <div className="w-64 bg-white">
              <DoctorSidebar />
            </div>
            <div className="flex-1 bg-gray-100">
              <DoctorSchedule />
            </div>
          </div>
        } />
        <Route path="/doctor-analytics" element={
          <div className="min-h-screen bg-gray-100 flex">
            <div className="w-64 bg-white">
              <DoctorSidebar />
            </div>
            <div className="flex-1 bg-gray-100">
              <DoctorAnalytics />
            </div>
          </div>
        } />
        <Route path="/doctor-protocols" element={
          <div className="min-h-screen bg-gray-100 flex">
            <div className="w-64 bg-white">
              <DoctorSidebar />
            </div>
            <div className="flex-1 bg-gray-100">
              <DoctorProtocols />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App
