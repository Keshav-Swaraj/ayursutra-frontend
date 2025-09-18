import React from 'react';

const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const appointments = [
  { name: 'Priya Gupta', day: 1, timeIdx: 1, duration: 1, color: 'bg-ayur-green' },
  { name: 'Anil Verma', day: 3, timeIdx: 2, duration: 1, color: 'bg-ayur-blue' },
  { name: 'Radha Sharma', day: 4, timeIdx: 0, duration: 2, color: 'bg-yellow-500' },
];

const DoctorSchedule = () => {
  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6">
      {/* Left: Weekly schedule */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded">Today</button>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 bg-white border border-gray-200 rounded" aria-label="Prev">‹</button>
              <button className="px-2 py-1 bg-white border border-gray-200 rounded" aria-label="Next">›</button>
            </div>
            <div className="ml-2 text-gray-700 font-medium">September 2025 Schedule</div>
          </div>
          <button className="px-4 py-2 bg-ayur-green text-white rounded-lg">Add Appointment</button>
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
              {appointments.map((a, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`${a.color} text-white rounded-md shadow-sm px-3 py-2 absolute`}
                    style={{
                      top: (a.timeIdx * 64) + 8,
                      height: a.duration * 64 - 16,
                      left: `calc(${a.day / 7 * 100}% + 8px)`,
                      width: 'calc(100% / 7 - 16px)'
                    }}
                  >
                    <div className="text-sm font-semibold">{a.name}</div>
                    <div className="text-xs opacity-90">{times[a.timeIdx]}</div>
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
            {[{n:'Radha Sharma', d:'Sep 18', t:'10:00 AM'}, {n:'Anil Verma', d:'Sep 18', t:'11:30 AM'}, {n:'Priya Gupta', d:'Sep 19', t:'2:00 PM'}].map((it) => (
              <div key={it.n} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-ayur-green/10" />
                <div>
                  <div className="text-sm font-medium text-gray-900">{it.n}</div>
                  <div className="text-xs text-gray-600">{it.d} • {it.t}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full px-4 py-2 bg-ayur-green text-white rounded-lg inline-flex items-center justify-center gap-2">
            <span>＋</span>
            <span>Quick Add Appointment</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default DoctorSchedule;


