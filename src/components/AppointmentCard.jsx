import React from 'react';

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

const AppointmentCard = ({ date, month, time, doctorName, treatmentType, status = 'upcoming' }) => {
  const styles = statusStyles[status] || statusStyles.upcoming;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center justify-between">
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
        </div>
      </div>

      {/* Right: Status badge */}
      <div className={`px-3 py-1 text-sm font-medium rounded-full ${styles.badgeBg} capitalize`}>
        {styles.label}
      </div>
    </div>
  );
};

export default AppointmentCard;


