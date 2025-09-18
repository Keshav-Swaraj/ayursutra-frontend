import React from 'react';
import PatientCard from './PatientCard';

const metrics = [
  { label: 'Total Patients', value: 520 },
  { label: 'Active Patients', value: 380 },
  { label: 'New This Month', value: 15 },
  { label: 'Follow-ups Due', value: 42 },
];

const mockPatients = [
  { name: 'Radha Sharma', patientId: 'PT-1023', lastAppointment: '2025-09-02', profilePicUrl: '' },
  { name: 'Anil Verma', patientId: 'PT-0991', lastAppointment: '2025-09-08', profilePicUrl: '' },
  { name: 'Priya Gupta', patientId: 'PT-1102', lastAppointment: '2025-08-30', profilePicUrl: '' },
  { name: 'Vivek Rao', patientId: 'PT-0877', lastAppointment: '2025-09-10', profilePicUrl: '' },
  { name: 'Meera Nair', patientId: 'PT-0765', lastAppointment: '2025-09-05', profilePicUrl: '' },
  { name: 'Kabir Singh', patientId: 'PT-0654', lastAppointment: '2025-08-28', profilePicUrl: '' },
];

const DoctorPatients = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Patients</h2>

      {/* Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 text-center">
            <div className="text-2xl font-bold text-gray-900">{m.value}</div>
            <div className="text-sm text-gray-600 mt-1">{m.label}</div>
          </div>
        ))}
      </section>

      {/* Find & Manage */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Find & Manage Patients</h3>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input className="w-full h-10 pl-9 pr-3 rounded-md border border-gray-200" placeholder="Search patients" />
            </div>
            <button className="inline-flex items-center gap-2 px-4 h-10 bg-ayur-green text-white rounded-lg">
              <span>＋</span>
              <span>Add New Patient</span>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPatients.map((p) => (
            <PatientCard
              key={p.patientId}
              name={p.name}
              patientId={p.patientId}
              lastAppointment={p.lastAppointment}
              profilePicUrl={p.profilePicUrl}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DoctorPatients;


