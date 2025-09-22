import React from 'react';

const PatientCard = ({ 
  name, 
  patientId, 
  lastAppointment, 
  profilePicUrl, 
  patient, 
  onViewDetails, 
  onCreateAppointment, 
  onViewProgress 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
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
      <div className="px-6 pb-6 space-y-2">
        <button 
          onClick={() => onViewDetails && onViewDetails(patient)}
          className="w-full text-sm text-ayur-green font-medium hover:underline text-center block"
        >
          View Details
        </button>
        <div className="flex space-x-2">
          <button 
            onClick={() => onCreateAppointment && onCreateAppointment(patient)}
            className="flex-1 px-3 py-1 text-xs bg-ayur-green text-white rounded hover:bg-green-700 transition-colors"
          >
            Book Appointment
          </button>
          <button 
            onClick={() => onViewProgress && onViewProgress(patient)}
            className="flex-1 px-3 py-1 text-xs border border-ayur-green text-ayur-green rounded hover:bg-green-50 transition-colors"
          >
            View Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;


