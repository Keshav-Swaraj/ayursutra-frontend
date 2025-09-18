import React from 'react';

const PatientCard = ({ name, patientId, lastAppointment, profilePicUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-4">
          {profilePicUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profilePicUrl} alt={name} className="w-full h-full object-cover" />
          ) : null}
        </div>
        <div className="text-gray-900 font-semibold">{name}</div>
        <div className="text-sm text-gray-500">ID: {patientId}</div>
        <div className="mt-3 text-xs text-gray-600 flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-gray-300" />
          <span>Last Appointment: {lastAppointment}</span>
        </div>
      </div>
      <div className="px-6 pb-6">
        <a href="#" className="text-sm text-ayur-green font-medium hover:underline">View Details</a>
      </div>
    </div>
  );
};

export default PatientCard;


