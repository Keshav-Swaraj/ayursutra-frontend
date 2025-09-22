import React, { useState } from 'react';

const statusStyles = {
  upcoming: {
    leftBg: 'bg-ayur-green/10',
    badgeBg: 'bg-ayur-green/10 text-ayur-green',
    label: 'Upcoming',
  },
  completed: {
    leftBg: 'bg-gray-200',
    badgeBg: 'bg-gray-200 text-gray-700',
    label: 'Completed',
  },
};

const AppointmentCard = ({ appointment, status = 'upcoming', onViewDetails, onReschedule }) => {
  const [showActions, setShowActions] = useState(false);
  const styles = statusStyles[status] || statusStyles.upcoming;
  
  // Handle both old props format and new appointment object
  const appointmentDate = appointment?.date ? new Date(appointment.date) : new Date();
  const date = appointmentDate.getDate();
  const month = appointmentDate.toLocaleDateString('en-US', { month: 'short' });
  const time = appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const doctorName = appointment?.doctor?.name || 'Dr. Unknown';
  const treatmentType = appointment?.protocol?.name || appointment?.notes || 'Consultation';

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(appointment);
    }
  };

  const handleReschedule = () => {
    if (onReschedule) {
      onReschedule(appointment);
    }
  };

  return (
    <div 
      className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Left: Date block */}
      <div className={`w-16 h-16 ${styles.leftBg} rounded-md flex flex-col items-center justify-center shrink-0`}> 
        <span className="text-xl font-bold text-gray-900">{date}</span>
        <span className="text-xs uppercase tracking-wide text-gray-600">{month}</span>
      </div>

      {/* Middle: Doctor and treatment */}
      <div className="flex-1 px-4 flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-gray-900 font-semibold truncate">{doctorName}</p>
            <span className="text-gray-400">•</span>
            <p className="text-sm text-gray-600 truncate">{treatmentType}</p>
          </div>
          <p className="text-sm text-gray-500 mt-1">{time}</p>
          {appointment?.notes && (
            <p className="text-xs text-gray-400 mt-1 truncate">{appointment.notes}</p>
          )}
        </div>
      </div>

      {/* Right: Status badge and actions */}
      <div className="flex items-center space-x-3">
        <div className={`px-3 py-1 text-sm font-medium rounded-full ${styles.badgeBg} capitalize`}>
          {styles.label}
        </div>
        
        {/* Action buttons - show on hover for upcoming appointments */}
        {status === 'upcoming' && showActions && (
          <div className="flex space-x-2">
            <button
              onClick={handleViewDetails}
              className="px-3 py-1 text-xs bg-ayur-green text-white rounded hover:bg-green-700 transition-colors"
            >
              View
            </button>
            <button
              onClick={handleReschedule}
              className="px-3 py-1 text-xs border border-ayur-green text-ayur-green rounded hover:bg-green-50 transition-colors"
            >
              Reschedule
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;


