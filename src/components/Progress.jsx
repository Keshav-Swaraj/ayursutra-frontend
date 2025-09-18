import React from 'react';

const CircleMeter = ({ label, percent, score, ringClass }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`w-28 h-28 rounded-full border-8 ${ringClass} flex items-center justify-center bg-white`}>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">{percent}%</div>
          <div className="text-xs text-gray-500">Current: {score}</div>
        </div>
      </div>
      <div className="text-sm font-medium text-gray-700">{label}</div>
    </div>
  );
};

const WavyPlaceholder = ({ colorClass = 'text-ayur-green' }) => {
  return (
    <div className="h-40 bg-white rounded-md border border-gray-200 flex items-end p-2 overflow-hidden">
      <svg viewBox="0 0 200 80" className={`w-full h-full ${colorClass}`}>
        <path d="M0 60 C 30 20, 60 100, 90 60 S 150 20, 200 60" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    </div>
  );
};

const DonutPlaceholder = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-28 h-28">
        <div className="absolute inset-0 rounded-full border-8 border-ayur-green" />
        <div className="absolute inset-0 rounded-full border-8 border-t-transparent border-ayur-blue rotate-45" />
        <div className="absolute inset-0 rounded-full border-8 border-t-transparent border-yellow-500 rotate-[120deg]" />
        <div className="absolute inset-0 rounded-full border-8 border-t-transparent border-gray-300 rotate-[210deg]" />
        <div className="absolute inset-4 rounded-full bg-white" />
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-ayur-green" /> 40%</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-ayur-blue" /> 30%</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500" /> 15%</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-300" /> 10%</div>
      </div>
    </div>
  );
};

const Progress = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Progress</h2>
      </div>

      {/* Dosha Balance */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Dosha Balance</h3>
        <div className="flex flex-wrap items-center gap-8">
          <CircleMeter label="Vata" percent={25} score={65} ringClass="border-ayur-green" />
          <CircleMeter label="Pitta" percent={40} score={72} ringClass="border-ayur-blue" />
          <CircleMeter label="Kapha" percent={35} score={58} ringClass="border-yellow-500" />
        </div>
      </section>

      {/* Graphs */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Symptom Score</h4>
          <WavyPlaceholder colorClass="text-ayur-green" />
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Weight Trend</h4>
          <WavyPlaceholder colorClass="text-ayur-blue" />
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Sleep Quality</h4>
          <DonutPlaceholder />
        </div>
      </section>

      {/* Daily Progress Log */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Daily Progress Log</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="h-10 rounded-md border border-gray-200 bg-gray-50 flex items-center px-3 text-gray-600">Select Date</div>
            <textarea className="w-full h-28 rounded-md border border-gray-200 p-3 text-sm focus:outline-none" placeholder="Write your daily notes here..." />
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1"><span>Energy Level</span><span>7/10</span></div>
              <input type="range" min="0" max="10" defaultValue="7" className="w-full accent-ayur-green" />
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1"><span>Digestion Score</span><span>6/10</span></div>
              <input type="range" min="0" max="10" defaultValue="6" className="w-full accent-ayur-green" />
            </div>
          </div>
        </div>
        <div>
          <button className="px-4 py-2 bg-ayur-green text-white rounded-lg shadow-sm">Log Entry</button>
        </div>
      </section>

      {/* Visual Progress Gallery */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Visual Progress Gallery</h3>
          <button className="px-4 py-2 bg-ayur-green text-white rounded-lg shadow-sm">Upload Photos</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square rounded-lg bg-gray-200" />
          <div className="aspect-square rounded-lg bg-gray-200" />
          <div className="aspect-square rounded-lg bg-gray-200" />
          <div className="aspect-square rounded-lg bg-gray-200" />
        </div>
      </section>
    </div>
  );
};

export default Progress;


