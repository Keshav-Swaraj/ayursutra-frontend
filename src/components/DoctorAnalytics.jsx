import React from 'react';

const TherapyLegend = () => (
  <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
    <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 bg-ayur-green rounded-sm" /> Vamana</div>
    <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 bg-ayur-blue rounded-sm" /> Virechana</div>
    <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 bg-yellow-500 rounded-sm" /> Basti</div>
    <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 bg-gray-400 rounded-sm" /> Nasya</div>
  </div>
);

const DonutPlaceholder = () => (
  <div className="flex flex-col items-center gap-6">
    <div className="relative w-56 h-56">
      <div className="absolute inset-0 rounded-full border-[18px] border-ayur-green" />
      <div className="absolute inset-0 rounded-full border-[18px] border-t-transparent border-ayur-blue rotate-45" />
      <div className="absolute inset-0 rounded-full border-[18px] border-t-transparent border-yellow-500 rotate-[120deg]" />
      <div className="absolute inset-0 rounded-full border-[18px] border-t-transparent border-gray-300 rotate-[210deg]" />
      <div className="absolute inset-10 rounded-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">Distribution</div>
          <div className="text-xs text-gray-500">Top therapies</div>
        </div>
      </div>
    </div>
    <TherapyLegend />
  </div>
);

const SuccessRatesPlaceholder = () => (
  <div className="w-full">
    <div className="relative h-72 border border-gray-200 rounded-lg bg-white p-6">
      {/* Y axis and grid lines */}
      <div className="absolute left-12 top-6 bottom-12 w-px bg-gray-200" />
      {[25, 50, 75, 100].map((mark) => (
        <div key={mark} className="absolute left-12 right-6" style={{ bottom: `calc(12% + ${(mark - 0.5)}% - 12px)` }}>
          <div className="h-px bg-gray-100" />
          <div className="-ml-10 -mt-2 text-xs text-gray-400">{mark}%</div>
        </div>
      ))}
      {/* X axis */}
      <div className="absolute left-12 right-6 bottom-12 h-px bg-gray-200" />
      {/* Bars */}
      <div className="absolute left-16 right-8 bottom-12 top-10 flex items-end justify-between gap-6">
        {[85, 72, 90, 66].map((h, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div className="relative w-12 bg-ayur-green/90 rounded-md" style={{ height: `${h}%` }}>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-ayur-green">{h}%</span>
            </div>
            <div className="text-xs text-gray-600 text-center whitespace-nowrap max-w-20">
              {['Arthritis', 'Stress', 'Dermatitis', 'Metabolic'][idx]}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DoctorAnalytics = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Analytics Overview</h2>
        <p className="text-gray-600 mt-2">Key insights across therapies and outcomes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Therapy Distribution</h3>
            <span className="text-xs text-gray-400">Last 90 days</span>
          </div>
          <DonutPlaceholder />
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Treatment Success Rates</h3>
            <span className="text-xs text-gray-400">Top programs</span>
          </div>
          <SuccessRatesPlaceholder />
        </div>
      </div>
    </div>
  );
};

export default DoctorAnalytics;


