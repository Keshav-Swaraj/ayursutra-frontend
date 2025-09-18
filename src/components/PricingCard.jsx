import React from 'react';

const Icon = ({ ok }) => (
  <span className={`${ok ? 'text-ayur-green' : 'text-red-500'} text-lg leading-none`}>
    {ok ? '✓' : '✕'}
  </span>
);

const PricingCard = ({ title, price, features = [], buttonText, isHighlighted = false, isOutlineButton = false }) => {
  const wrapper = isHighlighted
    ? 'bg-ayur-green/10 border border-ayur-green'
    : 'bg-white border border-gray-100';

  const btnClass = isOutlineButton
    ? 'border border-ayur-green text-ayur-green bg-transparent'
    : 'bg-ayur-green text-white';

  return (
    <div className={`rounded-xl p-6 shadow-sm ${wrapper} flex flex-col`}> 
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div className="mt-2 text-3xl font-bold text-gray-900">{price}</div>
      </div>
      <ul className="space-y-3 flex-1">
        {features.map((f, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
            <Icon ok={f.included} />
            <span>{f.label}</span>
          </li>
        ))}
      </ul>
      <button className={`mt-6 w-full h-11 rounded-lg ${btnClass}`}>{buttonText}</button>
    </div>
  );
};

export default PricingCard;


