import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import api from '../api';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid = ({ appointments, currentMonth, onMonthChange }) => {
  const today = new Date();
  const currentDate = today.getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  // Create array of dates for the calendar
  const dates = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    dates.push(null);
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(i);
  }
  
  // Get appointment dates for highlighting
  const appointmentDates = appointments.map(apt => new Date(apt.date).getDate());

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      {/* Calendar header */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => onMonthChange(-1)}
          className="p-2 rounded hover:bg-gray-100" 
          aria-label="Previous month"
        >
          ◀
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <button 
          onClick={() => onMonthChange(1)}
          className="p-2 rounded hover:bg-gray-100" 
          aria-label="Next month"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-2">
        {dayNames.map((d) => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {dates.map((d, index) => {
          const isToday = d === currentDate && currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();
          const hasAppt = d !== null && appointmentDates.includes(d);
          return (
            <div key={index} className="aspect-square flex items-center justify-center">
              <div className={`relative w-8 h-8 flex items-center justify-center rounded-full ${
                isToday ? 'bg-ayur-green/10 text-ayur-green font-semibold' : 'text-gray-700'
              }`}>
                {d}
                {hasAppt && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-ayur-blue rounded-full" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const UpcomingItem = ({ appointment, onViewDetails }) => {
  const appointmentDate = new Date(appointment.date);
  const time = appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const patientName = appointment.patient?.firstName && appointment.patient?.lastName 
    ? `${appointment.patient.firstName} ${appointment.patient.lastName}`
    : 'Unknown Patient';
  const protocolName = appointment.protocol?.name || 'Consultation';

  return (
    <div 
      className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onViewDetails && onViewDetails(appointment)}
    >
      <div className="w-8 h-8 rounded bg-ayur-green/10" />
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{patientName}</div>
        <div className="text-xs text-gray-600">{time} • {protocolName}</div>
      </div>
    </div>
  );
};

const QuickLink = ({ label, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-3 p-4 bg-white hover:bg-gray-50 rounded-lg border border-gray-100 text-left"
  >
    <div className="w-6 h-6 rounded bg-gray-300" />
    <span className="text-sm font-medium text-gray-800">{label}</span>
  </button>
);

const DoctorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch appointments and patients in parallel
      const [appointmentsResponse, patientsResponse] = await Promise.allSettled([
        api.get('/appointments/doctor'),
        api.get('/patients')
      ]);

      // Handle appointments data
      if (appointmentsResponse.status === 'fulfilled') {
        setAppointments(appointmentsResponse.value.data);
      } else {
        console.warn('Failed to fetch appointments:', appointmentsResponse.reason);
      }

      // Handle patients data
      if (patientsResponse.status === 'fulfilled') {
        setPatients(patientsResponse.value.data);
      } else {
        console.warn('Failed to fetch patients:', patientsResponse.reason);
      }

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + direction);
      return newMonth;
    });
  };

  // Handler functions for quick links and buttons
  const handleManagePatients = () => {
    navigate('/doctor-patients');
  };

  const handleCreateProtocol = () => {
    navigate('/doctor-protocols');
  };

  const handleNewAppointment = () => {
    navigate('/doctor-schedule');
  };

  const handleBroadcastReminder = () => {
    // For now, show a simple alert - could be enhanced with a broadcast modal
    const message = `
      Broadcast Reminder to Patients:
      
      📧 Email: Send appointment reminders
      📱 SMS: Send text notifications
      🔔 Push: Send app notifications
      
      This feature would allow you to send reminders to all patients or specific groups.
    `;
    alert(message);
  };

  const handlePatientRecords = () => {
    navigate('/doctor-patients');
  };

  const handleViewFullSchedule = () => {
    navigate('/doctor-schedule');
  };

  const handleViewAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  // Get today's appointments
  const today = new Date();
  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate.toDateString() === today.toDateString();
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  // Get upcoming appointments (next 7 days)
  const upcomingAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    const diffTime = aptDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ayur-green"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
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
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Today's Schedule</h2>
          <button 
            onClick={handleViewFullSchedule}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
          >
            View Full Schedule
          </button>
        </div>
        <CalendarGrid 
          appointments={appointments} 
          currentMonth={currentMonth} 
          onMonthChange={handleMonthChange} 
        />

        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Today's Appointments ({todayAppointments.length})
          </h3>
          {todayAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {todayAppointments.map((appointment) => (
                <UpcomingItem 
                  key={appointment._id} 
                  appointment={appointment} 
                  onViewDetails={handleViewAppointmentDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No appointments scheduled for today</p>
            </div>
          )}
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Upcoming Appointments ({upcomingAppointments.length})
          </h3>
          {upcomingAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {upcomingAppointments.slice(0, 4).map((appointment) => (
                <UpcomingItem 
                  key={appointment._id} 
                  appointment={appointment} 
                  onViewDetails={handleViewAppointmentDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No upcoming appointments</p>
            </div>
          )}
        </section>
      </div>

      <aside className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
        <div className="space-y-3">
          <QuickLink label="Manage Patients" onClick={handleManagePatients} />
          <QuickLink label="Create Protocol" onClick={handleCreateProtocol} />
          <QuickLink label="New Appointment" onClick={handleNewAppointment} />
          <QuickLink label="Broadcast Reminder" onClick={handleBroadcastReminder} />
          <QuickLink label="Patient Records" onClick={handlePatientRecords} />
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Patients</span>
              <span className="font-medium">{patients.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Today's Appointments</span>
              <span className="font-medium">{todayAppointments.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">This Week</span>
              <span className="font-medium">{upcomingAppointments.length}</span>
            </div>
          </div>
        </div>
      </aside>

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
                <span className="text-sm font-medium text-gray-600">Patient:</span>
                <p className="text-gray-900">
                  {selectedAppointment.patient?.firstName && selectedAppointment.patient?.lastName 
                    ? `${selectedAppointment.patient.firstName} ${selectedAppointment.patient.lastName}`
                    : 'Unknown Patient'}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Date:</span>
                <p className="text-gray-900">{new Date(selectedAppointment.date).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Time:</span>
                <p className="text-gray-900">{new Date(selectedAppointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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

export default DoctorDashboard;


