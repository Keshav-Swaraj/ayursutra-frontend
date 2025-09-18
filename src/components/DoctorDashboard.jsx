import React from 'react';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid = () => {
  const today = new Date();
  const currentDate = today.getDate();
  const daysInMonth = 30; // placeholder
  const appointmentDates = new Set([3, 7, 12, 18, 24, 27]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-2">
        {dayNames.map((d) => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
          const isToday = d === currentDate;
          const hasAppt = appointmentDates.has(d);
          return (
            <div key={d} className="aspect-square flex items-center justify-center">
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

const UpcomingItem = ({ name, time, type }) => (
  <div className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-100">
    <div className="w-8 h-8 rounded bg-ayur-green/10" />
    <div className="flex-1">
      <div className="text-sm font-medium text-gray-900">{name}</div>
      <div className="text-xs text-gray-600">{time} • {type}</div>
    </div>
  </div>
);

const QuickLink = ({ label }) => (
  <button className="w-full flex items-center gap-3 p-4 bg-white hover:bg-gray-50 rounded-lg border border-gray-100 text-left">
    <div className="w-6 h-6 rounded bg-gray-300" />
    <span className="text-sm font-medium text-gray-800">{label}</span>
  </button>
);

const DoctorDashboard = () => {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Today's Schedule</h2>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50">View Full Schedule</button>
        </div>
        <CalendarGrid />

        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <UpcomingItem name="Mrs. Radha Sharma" time="10:00 - 10:30" type="Consultation" />
            <UpcomingItem name="Mr. Anil Verma" time="11:00 - 11:45" type="Follow-up" />
            <UpcomingItem name="Ms. Priya Gupta" time="2:00 - 2:30" type="Therapy" />
            <UpcomingItem name="Mr. Vivek Rao" time="3:00 - 3:30" type="Consultation" />
          </div>
        </section>
      </div>

      <aside className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
        <div className="space-y-3">
          <QuickLink label="Manage Patients" />
          <QuickLink label="Create Protocol" />
          <QuickLink label="New Appointment" />
          <QuickLink label="View Analytics" />
          <QuickLink label="Broadcast Reminder" />
          <QuickLink label="Patient Records" />
        </div>
      </aside>
    </div>
  );
};

export default DoctorDashboard;


