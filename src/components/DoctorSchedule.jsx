import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import api from '../api';

const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DoctorSchedule = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    patientId: '',
    date: '',
    time: '',
    notes: '',
    protocolId: ''
  });
  const [patients, setPatients] = useState([]);
  const [protocols, setProtocols] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchProtocols();
    
    // Check if a patient was pre-selected from the patients page
    if (location.state?.selectedPatient) {
      setBookingForm(prev => ({
        ...prev,
        patientId: location.state.selectedPatient._id
      }));
      setShowBookingModal(true);
    }
  }, [location.state]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/appointments/doctor');
      setAppointments(response.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await api.get('/patients');
      setPatients(response.data);
    } catch (err) {
      console.error('Error fetching patients:', err);
    }
  };

  const fetchProtocols = async () => {
    try {
      const response = await api.get('/protocols');
      setProtocols(response.data);
    } catch (err) {
      console.error('Error fetching protocols:', err);
    }
  };

  const handleWeekChange = (direction) => {
    setCurrentWeek(prev => {
      const newWeek = new Date(prev);
      newWeek.setDate(newWeek.getDate() + (direction * 7));
      return newWeek;
    });
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
  };

  // Handler functions
  const handleAddAppointment = () => {
    setShowBookingModal(true);
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingForm(prev => ({
      ...prev,
      date: tomorrow.toISOString().split('T')[0]
    }));
  };

  const handleQuickAddAppointment = () => {
    handleAddAppointment();
  };

  const handleViewAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    try {
      setBookingLoading(true);
      
      // Combine date and time
      const appointmentDateTime = new Date(`${bookingForm.date}T${bookingForm.time}`);
      
      // For now, we'll just show a success message
      // In a real app, this would make an API call to book the appointment
      alert('Appointment booked successfully!');
      
      setShowBookingModal(false);
      setBookingForm({
        patientId: '',
        date: '',
        time: '',
        notes: '',
        protocolId: ''
      });
      
      // Refresh appointments
      await fetchAppointments();
    } catch (err) {
      console.error('Error booking appointment:', err);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  // Get the start of the current week (Sunday)
  const getWeekStart = (date) => {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    return weekStart;
  };

  // Get appointments for the current week
  const getWeekAppointments = () => {
    const weekStart = getWeekStart(currentWeek);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= weekStart && aptDate <= weekEnd;
    });
  };

  // Convert appointment to schedule format
  const getScheduleAppointments = () => {
    const weekAppointments = getWeekAppointments();
    const weekStart = getWeekStart(currentWeek);
    
    return weekAppointments.map(apt => {
      const aptDate = new Date(apt.date);
      const dayOfWeek = aptDate.getDay();
      const hour = aptDate.getHours();
      const minute = aptDate.getMinutes();
      
      // Convert to time index (9 AM = 0, 10 AM = 1, etc.)
      const timeIdx = Math.max(0, hour - 9);
      
      // Determine duration (default 1 hour)
      const duration = 1;
      
      // Assign color based on protocol or random
      const colors = ['bg-ayur-green', 'bg-ayur-blue', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const patientName = apt.patient?.firstName && apt.patient?.lastName 
        ? `${apt.patient.firstName} ${apt.patient.lastName}`
        : 'Unknown Patient';

      return {
        id: apt._id,
        name: patientName,
        day: dayOfWeek,
        timeIdx: timeIdx,
        duration: duration,
        color: color,
        time: aptDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        protocol: apt.protocol?.name || 'Consultation'
      };
    });
  };

  // Get upcoming appointments (next 7 days)
  const getUpcomingAppointments = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return appointments
      .filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate >= today && aptDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  const scheduleAppointments = getScheduleAppointments();
  const upcomingAppointments = getUpcomingAppointments();

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
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Schedule</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchAppointments}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6">
      {/* Left: Weekly schedule */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={goToToday}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50"
            >
              Today
            </button>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => handleWeekChange(-1)}
                className="px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50" 
                aria-label="Prev Week"
              >
                ‹
              </button>
              <button 
                onClick={() => handleWeekChange(1)}
                className="px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50" 
                aria-label="Next Week"
              >
                ›
              </button>
            </div>
            <div className="ml-2 text-gray-700 font-medium">
              {currentWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Schedule
            </div>
          </div>
          <button 
            onClick={handleAddAppointment}
            className="px-4 py-2 bg-ayur-green text-white rounded-lg hover:bg-green-700"
          >
            Add Appointment
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid" style={{ gridTemplateColumns: '100px repeat(7, 1fr)' }}>
            {/* Header row */}
            <div className="bg-gray-50 border-b border-gray-200" />
            {days.map((d) => (
              <div key={d} className="bg-gray-50 border-b border-gray-200 px-3 py-2 text-sm font-medium text-gray-600">{d}</div>
            ))}

            {/* Time rows */}
            {times.map((t, rowIdx) => (
              <React.Fragment key={t}>
                <div className="border-r border-gray-200 px-3 py-4 text-xs text-gray-500">{t}</div>
                {days.map((_, colIdx) => (
                  <div key={`${rowIdx}-${colIdx}`} className="relative h-16 border-t border-gray-100" />
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Appointment blocks overlay */}
          <div className="relative" style={{ marginLeft: 100 }}>
            <div className="absolute inset-0" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {scheduleAppointments.map((apt) => (
                <div key={apt.id} className="relative">
                  <div
                    className={`${apt.color} text-white rounded-md shadow-sm px-3 py-2 absolute cursor-pointer hover:opacity-90`}
                    style={{
                      top: (apt.timeIdx * 64) + 8,
                      height: apt.duration * 64 - 16,
                      left: `calc(${apt.day / 7 * 100}% + 8px)`,
                      width: 'calc(100% / 7 - 16px)'
                    }}
                    title={`${apt.name} - ${apt.protocol}`}
                    onClick={() => {
                      const appointment = appointments.find(a => a._id === apt.id);
                      if (appointment) handleViewAppointmentDetails(appointment);
                    }}
                  >
                    <div className="text-sm font-semibold truncate">{apt.name}</div>
                    <div className="text-xs opacity-90">{apt.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Upcoming appointments */}
      <aside className="w-full lg:w-80 space-y-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Upcoming Appointments</h3>
          <div className="space-y-3">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((apt) => {
                const aptDate = new Date(apt.date);
                const patientName = apt.patient?.firstName && apt.patient?.lastName 
                  ? `${apt.patient.firstName} ${apt.patient.lastName}`
                  : 'Unknown Patient';
                
                return (
                  <div key={apt._id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-ayur-green/10" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{patientName}</div>
                      <div className="text-xs text-gray-600">
                        {aptDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • 
                        {aptDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p>No upcoming appointments</p>
              </div>
            )}
          </div>
          <button 
            onClick={handleQuickAddAppointment}
            className="mt-4 w-full px-4 py-2 bg-ayur-green text-white rounded-lg inline-flex items-center justify-center gap-2 hover:bg-green-700"
          >
            <span>＋</span>
            <span>Quick Add Appointment</span>
          </button>
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

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Book New Appointment</h3>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Patient</label>
                <select
                  name="patientId"
                  value={bookingForm.patientId}
                  onChange={handleBookingInputChange}
                  className="w-full h-10 rounded-md border border-gray-200 px-3"
                  required
                >
                  <option value="">Select a patient</option>
                  {patients.map(patient => (
                    <option key={patient._id} value={patient._id}>
                      {patient.firstName} {patient.lastName}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={bookingForm.date}
                  onChange={handleBookingInputChange}
                  className="w-full h-10 rounded-md border border-gray-200 px-3"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  value={bookingForm.time}
                  onChange={handleBookingInputChange}
                  className="w-full h-10 rounded-md border border-gray-200 px-3"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Protocol (Optional)</label>
                <select
                  name="protocolId"
                  value={bookingForm.protocolId}
                  onChange={handleBookingInputChange}
                  className="w-full h-10 rounded-md border border-gray-200 px-3"
                >
                  <option value="">Select a protocol</option>
                  {protocols.map(protocol => (
                    <option key={protocol._id} value={protocol._id}>
                      {protocol.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={bookingForm.notes}
                  onChange={handleBookingInputChange}
                  className="w-full h-20 rounded-md border border-gray-200 px-3 py-2"
                  placeholder="Any specific notes or instructions..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="flex-1 px-4 py-2 bg-ayur-green text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {bookingLoading ? 'Booking...' : 'Book Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorSchedule;


