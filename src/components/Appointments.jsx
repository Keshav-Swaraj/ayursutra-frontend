import React from 'react';
import AppointmentCard from './AppointmentCard';

const Calendar = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const highlighted = new Set([10, 15, 20]);
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      {/* Calendar header */}
      <div className="flex items-center justify-between mb-4">
        <button className="p-2 rounded hover:bg-gray-100" aria-label="Previous month">◀</button>
        <h3 className="text-lg font-semibold text-gray-900">November 2024</h3>
        <button className="p-2 rounded hover:bg-gray-100" aria-label="Next month">▶</button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-2">
        {days.map((d) => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>

      {/* Dates grid */}
      <div className="grid grid-cols-7 gap-2">
        {dates.map((d) => (
          <div
            key={d}
            className={`aspect-square flex items-center justify-center rounded text-sm ${
              highlighted.has(d) ? 'bg-ayur-green/10 text-ayur-green font-medium' : 'bg-gray-50 text-gray-700'
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
  return (
    <div className="p-6 space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        <button className="inline-flex items-center gap-2 bg-ayur-green text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-90">
          <span className="text-lg">＋</span>
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* Calendar section */}
      <Calendar />

      {/* Upcoming */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
        <div className="space-y-3">
          <AppointmentCard
            date={10}
            month="Nov"
            time="10:00 AM - 10:45 AM"
            doctorName="Dr. Aisha Sharma"
            treatmentType="Panchakarma Consultation"
            status="upcoming"
          />
          <AppointmentCard
            date={15}
            month="Nov"
            time="2:00 PM - 2:30 PM"
            doctorName="Dr. Rohan Patel"
            treatmentType="Diet & Lifestyle"
            status="upcoming"
          />
        </div>
      </div>

      {/* Past */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Past Appointments</h3>
        <div className="space-y-3">
          <AppointmentCard
            date={20}
            month="Oct"
            time="11:30 AM - 12:00 PM"
            doctorName="Dr. Meera Nair"
            treatmentType="Follow-up"
            status="completed"
          />
          <AppointmentCard
            date={5}
            month="Oct"
            time="4:00 PM - 4:30 PM"
            doctorName="Dr. Kabir Singh"
            treatmentType="Herbal Therapy"
            status="completed"
          />
        </div>
      </div>
    </div>
  );
};

export default Appointments;


