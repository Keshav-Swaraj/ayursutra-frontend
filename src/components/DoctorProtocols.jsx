import React, { useState } from 'react';
import ProtocolCard from './ProtocolCard';

const Collapsible = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 bg-gray-50">
        <span className="text-sm font-medium text-gray-800">{title}</span>
        <span className="text-gray-400">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
};

const existing = [
  { title: 'Panchakarma Detox', associatedDosha: 'Pitta', status: 'active', duration: '14 days' },
  { title: 'Stress Relief Protocol', associatedDosha: 'Vata', status: 'draft', duration: '7 days' },
  { title: 'Metabolic Balance', associatedDosha: 'Kapha', status: 'active', duration: '21 days' },
  { title: 'Skin Rejuvenation', associatedDosha: 'Pitta', status: 'draft', duration: '10 days' },
];

const DoctorProtocols = () => {
  const [form, setForm] = useState({ name: '', dosha: '', desc: '' });

  return (
    <div className="p-6 space-y-8">
      {/* Existing Protocols */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Existing Protocols</h2>
        <div className="relative w-full md:w-96">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input className="w-full h-10 pl-9 pr-3 rounded-md border border-gray-200" placeholder="Search protocols" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {existing.map((p) => (
            <ProtocolCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      {/* Protocol Editor */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Protocol Editor</h2>
        <div className="bg-white border border-gray-100 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Protocol Name</label>
              <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} className="w-full h-10 rounded-md border border-gray-200 px-3" placeholder="Enter name" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Associated Dosha</label>
              <select value={form.dosha} onChange={(e)=>setForm({...form, dosha:e.target.value})} className="w-full h-10 rounded-md border border-gray-200 px-3 bg-white">
                <option value="">Select dosha</option>
                <option value="Vata">Vata</option>
                <option value="Pitta">Pitta</option>
                <option value="Kapha">Kapha</option>
              </select>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm text-gray-600">Description</label>
              <textarea value={form.desc} onChange={(e)=>setForm({...form, desc:e.target.value})} className="w-full h-28 rounded-md border border-gray-200 p-3" placeholder="Describe the protocol..." />
            </div>
          </div>

          <div className="space-y-3">
            <Collapsible title="Preparation Phase">
              <div className="text-sm text-gray-600">Add steps for preparatory measures like snehana and swedana.</div>
            </Collapsible>
            <Collapsible title="Main Procedure">
              <div className="text-sm text-gray-600">Outline the primary therapy with dosages, frequency, and guidance.</div>
            </Collapsible>
            <Collapsible title="Post-Therapy Care">
              <div className="text-sm text-gray-600">Diet, rest, and follow-ups to consolidate benefits.</div>
            </Collapsible>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-ayur-green text-white rounded-lg">Add New Step</button>
            <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg bg-transparent">Reset Form</button>
            <button className="ml-auto px-4 py-2 bg-ayur-green text-white rounded-lg">Save Protocol</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorProtocols;


