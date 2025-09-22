import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import api from '../api';
import AppointmentCard from './AppointmentCard';

const Calendar = ({ appointments, currentMonth, onMonthChange }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const currentDate = new Date(currentMonth);
  
  // Get first day of month and number of days
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
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
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <button 
          onClick={() => onMonthChange(1)}
          className="p-2 rounded hover:bg-gray-100" 
          aria-label="Next month"
        >
          ▶
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-2">
        {days.map((d) => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>

      {/* Dates grid */}
      <div className="grid grid-cols-7 gap-2">
        {dates.map((d, index) => (
          <div
            key={index}
            className={`aspect-square flex items-center justify-center rounded text-sm ${
              d === null 
                ? 'bg-transparent' 
                : appointmentDates.includes(d)
                ? 'bg-ayur-green/10 text-ayur-green font-medium' 
                : 'bg-gray-50 text-gray-700'
            }`}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    notes: '',
    doctor: ''
  });
  const [doctors, setDoctors] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      // For now, we'll use a mock list of doctors
      // In a real app, this would be an API call to get available doctors
      setDoctors([
        { id: '1', name: 'Dr. Rajesh Kumar', specialization: 'General Ayurveda' },
        { id: '2', name: 'Dr. Priya Sharma', specialization: 'Panchakarma Specialist' },
        { id: '3', name: 'Dr. Amit Patel', specialization: 'Digestive Health' }
      ]);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/appointments/patient');
      setAppointments(response.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments');
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

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookAppointment = () => {
    setShowBookingModal(true);
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingForm(prev => ({
      ...prev,
      date: tomorrow.toISOString().split('T')[0]
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
      alert('Appointment booking request submitted! Your doctor will confirm the appointment.');
      
      setShowBookingModal(false);
      setBookingForm({
        date: '',
        time: '',
        notes: '',
        doctor: ''
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

  const handleViewAppointmentDetails = (appointment) => {
    // For now, show appointment details in an alert
    // In a real app, this would open a detailed modal
    const appointmentDate = new Date(appointment.date);
    const details = `
      Doctor: ${appointment.doctor?.name || 'Dr. Unknown'}
      Date: ${appointmentDate.toLocaleDateString()}
      Time: ${appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      Protocol: ${appointment.protocol?.name || 'Consultation'}
      Notes: ${appointment.notes || 'None'}
    `;
    alert(details);
  };

  const handleRescheduleAppointment = (appointment) => {
    // For now, show a message about rescheduling
    // In a real app, this would open a reschedule modal
    alert('To reschedule this appointment, please contact the clinic directly or use the booking form to create a new appointment.');
  };

  // Separate upcoming and past appointments
  const now = new Date();
  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
    
  const pastAppointments = appointments
    .filter(apt => new Date(apt.date) < now)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

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
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Appointments</h3>
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
    <div className="p-6 space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        <button 
          onClick={handleBookAppointment}
          className="inline-flex items-center gap-2 bg-ayur-green text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-90"
        >
          <span className="text-lg">＋</span>
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* Calendar section */}
      <Calendar 
        appointments={appointments} 
        currentMonth={currentMonth} 
        onMonthChange={handleMonthChange} 
      />

      {/* Upcoming */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Upcoming Appointments ({upcomingAppointments.length})
        </h3>
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                status="upcoming"
                onViewDetails={handleViewAppointmentDetails}
                onReschedule={handleRescheduleAppointment}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No upcoming appointments</p>
          </div>
        )}
      </div>

      {/* Past */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Past Appointments ({pastAppointments.length})
        </h3>
        {pastAppointments.length > 0 ? (
          <div className="space-y-3">
            {pastAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                status="completed"
                onViewDetails={handleViewAppointmentDetails}
                onReschedule={handleRescheduleAppointment}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No past appointments</p>
          </div>
        )}
      </div>

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
                <label className="block text-sm text-gray-600 mb-1">Doctor</label>
                <select
                  name="doctor"
                  value={bookingForm.doctor}
                  onChange={handleBookingInputChange}
                  className="w-full h-10 rounded-md border border-gray-200 px-3"
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization}
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
                <label className="block text-sm text-gray-600 mb-1">Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={bookingForm.notes}
                  onChange={handleBookingInputChange}
                  className="w-full h-20 rounded-md border border-gray-200 px-3 py-2"
                  placeholder="Any specific concerns or questions..."
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

export default Appointments;


