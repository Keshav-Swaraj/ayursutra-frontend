import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext';
import HomePage from './components/HomePage';
import Sidebar from './components/Sidebar';
import DoctorSidebar from './components/DoctorSidebar';
import Login from './components/Login'; 
import Signup from './components/Signup';
import PatientRegistration from './components/PatientRegistration';
import FeaturesPage from './components/FeaturesPage';
import Pricing from './components/Pricing';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import DashboardContent from './components/DashboardContent';
import Appointments from './components/Appointments';
import Progress from './components/Progress';
import Profile from './components/Profile';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorPatients from './components/DoctorPatients';
import DoctorSchedule from './components/DoctorSchedule';
import DoctorProtocols from './components/DoctorProtocols';

// Reusable Layout component for both dashboards
const DashboardLayout = ({ children, role }) => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-white">
        {role === 'patient' ? <Sidebar /> : <DoctorSidebar />}
      </div>
      <div className="flex-1 bg-gray-100 relative">
        {/* Top right logout button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium shadow-sm"
          >
            Logout
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const { user, token, role } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/patient-registration" element={<PatientRegistration />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      
      {/* Patient Protected Routes */}
      <Route path="/patient-dashboard" element={
        <DashboardLayout role="patient">
          <DashboardContent />
        </DashboardLayout>
      } />
      <Route path="/patient-appointment" element={
        <DashboardLayout role="patient">
          <Appointments />
        </DashboardLayout>
      } />
      <Route path="/patient-progress" element={
        <DashboardLayout role="patient">
          <Progress />
        </DashboardLayout>
      } />
      <Route path="/patient-profile" element={
        <DashboardLayout role="patient">
          <Profile />
        </DashboardLayout>
      } />
      
      {/* Doctor Protected Routes */}
      <Route path="/doctor-dashboard" element={
        <DashboardLayout role="doctor">
          <DoctorDashboard />
        </DashboardLayout>
      } />
      <Route path="/doctor-patients" element={
        <DashboardLayout role="doctor">
          <DoctorPatients />
        </DashboardLayout>
      } />
      <Route path="/doctor-schedule" element={
        <DashboardLayout role="doctor">
          <DoctorSchedule />
        </DashboardLayout>
      } />
      <Route path="/doctor-protocols" element={
        <DashboardLayout role="doctor">
          <DoctorProtocols />
        </DashboardLayout>
      } />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;