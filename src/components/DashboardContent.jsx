import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import api from '../api';

const DashboardContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patientProfile, setPatientProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [progressEntries, setProgressEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [profileResponse, appointmentsResponse, progressResponse] = await Promise.allSettled([
        api.get('/patients/me'),
        api.get('/appointments/patient'),
        api.get('/progress/me') // We'll need to create this endpoint for patient's own progress
      ]);

      // Handle profile data
      if (profileResponse.status === 'fulfilled') {
        setPatientProfile(profileResponse.value.data);
      } else {
        console.warn('Failed to fetch profile:', profileResponse.reason);
      }

      // Handle appointments data
      if (appointmentsResponse.status === 'fulfilled') {
        setAppointments(appointmentsResponse.value.data);
      } else {
        console.warn('Failed to fetch appointments:', appointmentsResponse.reason);
      }

      // Handle progress data (we'll create a patient-specific endpoint)
      if (progressResponse.status === 'fulfilled') {
        setProgressEntries(progressResponse.value.data);
      } else {
        console.warn('Failed to fetch progress:', progressResponse.reason);
        // Don't set error for progress as it's optional
      }

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Get upcoming appointment (next appointment)
  const upcomingAppointment = appointments
    .filter(apt => new Date(apt.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  // Get recent progress entries (last 5)
  const recentProgress = progressEntries.slice(0, 5);

  // Get recent activity from progress entries
  const recentActivity = recentProgress.map(entry => ({
    text: `Completed daily wellness check`,
    date: new Date(entry.logDate).toLocaleDateString(),
    time: new Date(entry.logDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }));

  // Handler functions for action buttons
  const handleBookAppointment = () => {
    navigate('/patient-appointment');
  };

  const handleLogDailyEntry = () => {
    navigate('/patient-progress');
  };

  const handleViewProtocols = () => {
    // For now, navigate to appointments where protocols are shown
    navigate('/patient-appointment');
  };

  const handleContactDoctor = () => {
    // For now, show a simple alert - could be enhanced with a contact modal
    const contactInfo = `
      Contact Your Doctor:
      
      📞 Phone: +1 (555) 123-4567
      📧 Email: clinic@ayursutra.com
      🏥 Address: 123 Wellness Street, Health City
      
      For urgent matters, please call directly.
      For non-urgent questions, you can also use the appointments page.
    `;
    alert(contactInfo);
  };

  const handleViewAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  const handleRescheduleAppointment = (appointment) => {
    // For now, navigate to appointments page - could be enhanced with a reschedule modal
    navigate('/patient-appointment');
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ayur-green"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Dashboard</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hello, {patientProfile?.firstName || user?.name || 'Patient'}!
        </h1>
        <p className="text-gray-600">Welcome back to your wellness journey</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button 
          onClick={handleBookAppointment}
          className="flex items-center justify-center space-x-2 p-4 bg-ayur-green text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
            <span className="text-xs">📅</span>
          </div>
          <span>Book New Appointment</span>
        </button>
        
        <button 
          onClick={handleLogDailyEntry}
          className="flex items-center justify-center space-x-2 p-4 bg-ayur-green text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
            <span className="text-xs">📝</span>
          </div>
          <span>Log Daily Entry</span>
        </button>
        
        <button 
          onClick={handleViewProtocols}
          className="flex items-center justify-center space-x-2 p-4 bg-ayur-green text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
            <span className="text-xs">📋</span>
          </div>
          <span>View Protocols</span>
        </button>
        
        <button 
          onClick={handleContactDoctor}
          className="flex items-center justify-center space-x-2 p-4 bg-ayur-green text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
            <span className="text-xs">📞</span>
          </div>
          <span>Contact Doctor</span>
        </button>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointment Card */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointment</h3>
          {upcomingAppointment ? (
            <div className="space-y-2 mb-4">
              <p className="text-gray-700">
                <strong>Date:</strong> {new Date(upcomingAppointment.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong>Time:</strong> {new Date(upcomingAppointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-gray-700">
                <strong>Doctor:</strong> {upcomingAppointment.doctor?.name || 'Dr. Rajesh Kumar'}
              </p>
              {upcomingAppointment.protocol?.name && (
                <p className="text-gray-700">
                  <strong>Protocol:</strong> {upcomingAppointment.protocol.name}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-2 mb-4">
              <p className="text-gray-500 italic">No upcoming appointments</p>
              <p className="text-xs text-gray-400">Click "Book New Appointment" to schedule one</p>
            </div>
          )}
          <div className="flex space-x-2">
            <button 
              onClick={() => handleViewAppointmentDetails(upcomingAppointment)}
              className="px-4 py-2 bg-ayur-green text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
            >
              View Details
            </button>
            <button 
              onClick={() => handleRescheduleAppointment(upcomingAppointment)}
              className="px-4 py-2 border border-ayur-green text-ayur-green rounded-lg text-sm hover:bg-green-50 transition-colors"
            >
              Reschedule
            </button>
          </div>
        </div>

        {/* Progress Overview Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Overview</h3>
          {progressEntries.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Total entries: <span className="font-semibold">{progressEntries.length}</span>
              </p>
              <p className="text-sm text-gray-600">
                Latest entry: <span className="font-semibold">
                  {new Date(progressEntries[0]?.logDate).toLocaleDateString()}
                </span>
              </p>
              {progressEntries[0]?.symptomScore && (
                <p className="text-sm text-gray-600">
                  Latest symptom score: <span className="font-semibold">
                    {progressEntries[0].symptomScore}/10
                  </span>
                </p>
              )}
            </div>
          ) : (
            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <span className="text-gray-500">No progress entries yet</span>
            </div>
          )}
        </div>

        {/* Notifications Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-3">
            {upcomingAppointment && (
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-700">Upcoming appointment reminder</p>
                  <p className="text-xs text-gray-500">
                    {new Date(upcomingAppointment.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-700">Welcome to AyurSutra</p>
                <p className="text-xs text-gray-500">Start your wellness journey</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-700">Daily entry reminder</p>
                <p className="text-xs text-gray-500">Log your progress today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-sm text-gray-700">{activity.text}</p>
                  <span className="text-xs text-gray-500">{activity.date}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">No recent activity</p>
                <p className="text-xs text-gray-400">Start logging your progress</p>
              </div>
            )}
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

      {/* Appointment Details Modal */}
      {showAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Appointment Details</h3>
              <button 
                onClick={() => setShowAppointmentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Date:</span>
                <p className="text-gray-900">{new Date(selectedAppointment.date).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Time:</span>
                <p className="text-gray-900">{new Date(selectedAppointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Doctor:</span>
                <p className="text-gray-900">{selectedAppointment.doctor?.name || 'Dr. Rajesh Kumar'}</p>
              </div>
              {selectedAppointment.protocol?.name && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Protocol:</span>
                  <p className="text-gray-900">{selectedAppointment.protocol.name}</p>
                </div>
              )}
              {selectedAppointment.notes && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Notes:</span>
                  <p className="text-gray-900">{selectedAppointment.notes}</p>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  selectedAppointment.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  selectedAppointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => handleRescheduleAppointment(selectedAppointment)}
                className="flex-1 px-4 py-2 border border-ayur-green text-ayur-green rounded-lg hover:bg-green-50 transition-colors"
              >
                Reschedule
              </button>
              <button 
                onClick={() => setShowAppointmentModal(false)}
                className="flex-1 px-4 py-2 bg-ayur-green text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
