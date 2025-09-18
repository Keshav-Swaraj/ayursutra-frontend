import React, { useState } from 'react';

const Toggle = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-ayur-green' : 'bg-gray-300'}`}
        aria-pressed={checked}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
};

const Profile = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    gender: '',
  });

  const [toggles, setToggles] = useState({
    tipsEmail: true,
    shareData: false,
    smsReminders: true,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Profile</h2>

      {/* Personal Details */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-600" htmlFor="fullName">Full Name</label>
            <input id="fullName" name="fullName" value={form.fullName} onChange={handleInput} className="w-full h-10 rounded-md border border-gray-200 px-3" placeholder="Enter full name" />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600" htmlFor="email">Email Address</label>
            <input id="email" name="email" value={form.email} onChange={handleInput} className="w-full h-10 rounded-md border border-gray-200 px-3" placeholder="Enter email" />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600" htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" value={form.phone} onChange={handleInput} className="w-full h-10 rounded-md border border-gray-200 px-3" placeholder="Enter phone number" />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600" htmlFor="dob">Date of Birth</label>
            <input id="dob" name="dob" type="date" value={form.dob} onChange={handleInput} className="w-full h-10 rounded-md border border-gray-200 px-3" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm text-gray-600" htmlFor="address">Address</label>
            <input id="address" name="address" value={form.address} onChange={handleInput} className="w-full h-10 rounded-md border border-gray-200 px-3" placeholder="Enter address" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm text-gray-600" htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={form.gender} onChange={handleInput} className="w-full h-10 rounded-md border border-gray-200 px-3 bg-white">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg bg-transparent">Cancel</button>
          <button className="px-4 py-2 text-white bg-ayur-green rounded-lg">Save Changes</button>
        </div>
      </section>

      {/* Privacy & Consent */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Consent</h3>
        <div className="divide-y divide-gray-200">
          <Toggle
            label="Receive health tips and newsletters via email"
            checked={toggles.tipsEmail}
            onChange={(v) => setToggles((p) => ({ ...p, tipsEmail: v }))}
          />
          <Toggle
            label="Share anonymized data for research and improvements"
            checked={toggles.shareData}
            onChange={(v) => setToggles((p) => ({ ...p, shareData: v }))}
          />
          <Toggle
            label="Allow appointment reminders via SMS"
            checked={toggles.smsReminders}
            onChange={(v) => setToggles((p) => ({ ...p, smsReminders: v }))}
          />
        </div>
        <div className="mt-6">
          <button className="px-4 py-2 text-white bg-ayur-green rounded-lg">Save Settings</button>
        </div>
      </section>
    </div>
  );
};

export default Profile;


