import React from 'react';

const steps = [
  { key: 'personal', label: 'Personal Info' },
  { key: 'medical', label: 'Medical History' },
  { key: 'insurance', label: 'Insurance' },
  { key: 'confirm', label: 'Confirmation' },
];

const RegistrationStepper = ({ activeKey = 'personal' }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((s, idx) => {
          const isActive = s.key === activeKey;
          const isCompleted = steps.findIndex(st => st.key === activeKey) > idx;
          return (
            <div key={s.key} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${isActive || isCompleted ? 'border-ayur-green' : 'border-gray-300'}`}>
                  <span className={`${isActive ? 'text-ayur-green' : 'text-gray-600'} text-sm font-semibold`}>{idx + 1}</span>
                </div>
                <span className={`${isActive ? 'text-ayur-green' : 'text-gray-600'} text-sm font-medium`}>{s.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 ${isCompleted ? 'bg-ayur-green' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegistrationStepper;


