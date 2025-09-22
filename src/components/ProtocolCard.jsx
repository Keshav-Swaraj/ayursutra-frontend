import React from 'react';

const StatusBadge = ({ status }) => {
  const isActive = (status || '').toLowerCase() === 'active';
  const classes = isActive
    ? 'bg-ayur-green/10 text-ayur-green'
    : 'bg-gray-200 text-gray-700';
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${classes}`}>
      {isActive ? 'Active' : 'Draft'}
    </span>
  );
};

const ProtocolCard = ({ 
  title, 
  associatedDosha, 
  status = 'draft', 
  duration, 
  icon, 
  protocol, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center shrink-0">
          {icon || <div className="w-5 h-5 bg-gray-300 rounded" />}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-gray-900 font-semibold truncate">{title}</h4>
          <div className="text-sm text-gray-600 mt-1 flex items-center gap-3 flex-wrap">
            <span>Dosha: <span className="font-medium">{associatedDosha}</span></span>
            <span className="text-gray-300">|</span>
            <span>Duration: <span className="font-medium">{duration}</span></span>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <button 
          onClick={() => onView && onView(protocol)}
          className="px-3 py-1.5 text-sm rounded bg-ayur-green text-white hover:opacity-90 transition-colors"
        >
          View Details
        </button>
        <button 
          onClick={() => onEdit && onEdit(protocol)}
          className="px-3 py-1.5 text-sm rounded border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete && onDelete(protocol._id)}
          className="px-3 py-1.5 text-sm rounded border border-red-200 text-red-700 hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProtocolCard;


