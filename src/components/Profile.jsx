import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import api from '../api';

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
  const { user } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    gender: '',
    doshaProfile: '',
    medicalHistory: '',
  });

  const [toggles, setToggles] = useState({
    tipsEmail: true,
    shareData: false,
    smsReminders: true,
  });
  const [settingsSaving, setSettingsSaving] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/patients/me');
      const profileData = response.data;
      
      setForm({
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        email: profileData.user?.email || user?.email || '',
        phoneNumber: profileData.phoneNumber || '',
        dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toISOString().split('T')[0] : '',
        address: profileData.address || '',
        gender: profileData.gender || '',
        doshaProfile: profileData.doshaProfile || '',
        medicalHistory: profileData.medicalHistory || '',
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const { email, ...profileData } = form; // Remove email as it's not part of patient profile
      
      await api.post('/patients', profileData);
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSettingsSaving(true);
      setError(null);
      setSuccess(false);

      // In a real app, this would save the settings to the backend
      // For now, we'll just show a success message
      console.log('Saving settings:', toggles);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Failed to save settings. Please try again.');
    } finally {
      setSettingsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ayur-green"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Profile</h2>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">Changes saved successfully!</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Personal Details */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-600" htmlFor="firstName">First Name</label>
            <input 
              id="firstName" 
              name="firstName" 
              value={form.firstName} 
              onChange={handleInput} 
              className="w-full h-10 rounded-md border border-gray-200 px-3" 
              placeholder="Enter first name" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600" htmlFor="lastName">Last Name</label>
            <input 
              id="lastName" 
              name="lastName" 
              value={form.lastName} 
              onChange={handleInput} 
              className="w-full h-10 rounded-md border border-gray-200 px-3" 
              placeholder="Enter last name" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600" htmlFor="email">Email Address</label>
            <input 
              id="email" 
              name="email" 
              value={form.email} 
              disabled 
              className="w-full h-10 rounded-md border border-gray-200 px-3 bg-gray-50 text-gray-500" 
              placeholder="Email (read-only)" 
            />
            <p className="text-xs text-gray-500">Email cannot be changed</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600" htmlFor="phoneNumber">Phone Number</label>
            <input 
              id="phoneNumber" 
              name="phoneNumber" 
              value={form.phoneNumber} 
              onChange={handleInput} 
              className="w-full h-10 rounded-md border border-gray-200 px-3" 
              placeholder="Enter phone number" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600" htmlFor="dateOfBirth">Date of Birth</label>
            <input 
              id="dateOfBirth" 
              name="dateOfBirth" 
              type="date" 
              value={form.dateOfBirth} 
              onChange={handleInput} 
              className="w-full h-10 rounded-md border border-gray-200 px-3" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600" htmlFor="gender">Gender</label>
            <select 
              id="gender" 
              name="gender" 
              value={form.gender} 
              onChange={handleInput} 
              className="w-full h-10 rounded-md border border-gray-200 px-3 bg-white"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm text-gray-600" htmlFor="address">Address</label>
            <input 
              id="address" 
              name="address" 
              value={form.address} 
              onChange={handleInput} 
              className="w-full h-10 rounded-md border border-gray-200 px-3" 
              placeholder="Enter address" 
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm text-gray-600" htmlFor="doshaProfile">Dosha Profile</label>
            <select 
              id="doshaProfile" 
              name="doshaProfile" 
              value={form.doshaProfile} 
              onChange={handleInput} 
              className="w-full h-10 rounded-md border border-gray-200 px-3 bg-white"
            >
              <option value="">Select dosha profile</option>
              <option value="vata">Vata</option>
              <option value="pitta">Pitta</option>
              <option value="kapha">Kapha</option>
              <option value="vata-pitta">Vata-Pitta</option>
              <option value="vata-kapha">Vata-Kapha</option>
              <option value="pitta-kapha">Pitta-Kapha</option>
              <option value="tridosha">Tridosha (Balanced)</option>
            </select>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm text-gray-600" htmlFor="medicalHistory">Medical History</label>
            <textarea 
              id="medicalHistory" 
              name="medicalHistory" 
              value={form.medicalHistory} 
              onChange={handleInput} 
              className="w-full h-20 rounded-md border border-gray-200 px-3 py-2" 
              placeholder="Enter your medical history and current conditions"
            />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button 
            onClick={fetchProfile}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg bg-transparent hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 text-white bg-ayur-green rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
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
          <button 
            onClick={handleSaveSettings}
            disabled={settingsSaving}
            className="px-4 py-2 text-white bg-ayur-green rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {settingsSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;


