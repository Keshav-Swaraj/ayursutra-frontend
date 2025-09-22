import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import api from '../api';

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

const WavyPlaceholder = ({ colorClass = 'text-ayur-green', data = [] }) => {
  return (
    <div className="h-40 bg-white rounded-md border border-gray-200 flex items-end p-2 overflow-hidden">
      {data.length > 0 ? (
        <div className="flex items-end space-x-1 w-full">
          {data.map((value, index) => (
            <div
              key={index}
              className={`bg-ayur-green rounded-t`}
              style={{ height: `${(value / 10) * 100}%`, flex: 1 }}
            />
          ))}
        </div>
      ) : (
        <svg viewBox="0 0 200 80" className={`w-full h-full ${colorClass}`}>
          <path d="M0 60 C 30 20, 60 100, 90 60 S 150 20, 200 60" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      )}
    </div>
  );
};

const DonutPlaceholder = ({ data = [] }) => {
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
  const { user } = useAuth();
  const [progressEntries, setProgressEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [form, setForm] = useState({
    logDate: new Date().toISOString().split('T')[0],
    logEntry: '',
    symptomScore: 5,
    energyLevel: 5,
    digestionScore: 5,
    sleepQuality: 5,
    vitals: {
      weight: '',
      bloodPressure: '',
      heartRate: ''
    }
  });
  
  // File upload state
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/progress/me');
      setProgressEntries(response.data);
    } catch (err) {
      console.error('Error fetching progress:', err);
      if (err.response?.status === 404) {
        setError('Please create your patient profile first before logging progress.');
      } else if (err.response?.status === 403) {
        setError('Access denied. Please ensure you are logged in as a patient.');
      } else {
        setError('Failed to load progress data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('vitals.')) {
      const vitalKey = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        vitals: {
          ...prev.vitals,
          [vitalKey]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const uploadToCloudinary = async (file) => {
    try {
      // Get upload signature from backend
      const signatureResponse = await api.get('/cloudinary/signature');
      const { signature, timestamp, cloudName } = signatureResponse.data;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('cloud_name', cloudName);
      formData.append('folder', 'ayursutra/progress');

      const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });

      const result = await uploadResponse.json();
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      // Upload photos to Cloudinary
      let photoUrls = [];
      if (selectedFiles.length > 0) {
        setUploading(true);
        photoUrls = await Promise.all(selectedFiles.map(file => uploadToCloudinary(file)));
        setUploading(false);
      }

      // Prepare progress entry data
      const progressData = {
        symptomScore: form.symptomScore,
        vitals: form.vitals,
        logEntry: form.logEntry,
        photos: photoUrls,
        logDate: new Date(form.logDate)
      };

      await api.post('/progress', progressData);
      
      setSuccess(true);
      setForm({
        logDate: new Date().toISOString().split('T')[0],
        logEntry: '',
        symptomScore: 5,
        energyLevel: 5,
        digestionScore: 5,
        sleepQuality: 5,
        vitals: {
          weight: '',
          bloodPressure: '',
          heartRate: ''
        }
      });
      setSelectedFiles([]);
      
      // Refresh progress data
      await fetchProgress();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving progress:', err);
      setError('Failed to save progress entry. Please try again.');
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  // Calculate statistics from progress entries
  const latestEntry = progressEntries[0];
  const symptomScores = progressEntries.map(entry => entry.symptomScore).filter(score => score !== undefined);
  const avgSymptomScore = symptomScores.length > 0 ? 
    (symptomScores.reduce((a, b) => a + b, 0) / symptomScores.length).toFixed(1) : 0;

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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Progress</h2>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">Progress entry saved successfully!</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Progress Overview */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Progress Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-ayur-green">{progressEntries.length}</div>
            <div className="text-sm text-gray-600">Total Entries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-ayur-blue">{avgSymptomScore}/10</div>
            <div className="text-sm text-gray-600">Avg Symptom Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {latestEntry ? new Date(latestEntry.logDate).toLocaleDateString() : 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Latest Entry</div>
          </div>
        </div>
      </section>

      {/* Graphs */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Symptom Score Trend</h4>
          <WavyPlaceholder colorClass="text-ayur-green" data={symptomScores.slice(0, 10)} />
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Energy Level</h4>
          <WavyPlaceholder colorClass="text-ayur-blue" data={[]} />
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Sleep Quality</h4>
          <DonutPlaceholder data={[]} />
        </div>
      </section>

      {/* Daily Progress Log */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Daily Progress Log</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  name="logDate"
                  value={form.logDate}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-md border border-gray-200 px-3"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Daily Notes</label>
                <textarea
                  name="logEntry"
                  value={form.logEntry}
                  onChange={handleInputChange}
                  className="w-full h-28 rounded-md border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ayur-green"
                  placeholder="Write your daily notes here..."
                />
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Symptom Score</span>
                  <span>{form.symptomScore}/10</span>
                </div>
                <input
                  type="range"
                  name="symptomScore"
                  min="0"
                  max="10"
                  value={form.symptomScore}
                  onChange={handleInputChange}
                  className="w-full accent-ayur-green"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Energy Level</span>
                  <span>{form.energyLevel}/10</span>
                </div>
                <input
                  type="range"
                  name="energyLevel"
                  min="0"
                  max="10"
                  value={form.energyLevel}
                  onChange={handleInputChange}
                  className="w-full accent-ayur-green"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Digestion Score</span>
                  <span>{form.digestionScore}/10</span>
                </div>
                <input
                  type="range"
                  name="digestionScore"
                  min="0"
                  max="10"
                  value={form.digestionScore}
                  onChange={handleInputChange}
                  className="w-full accent-ayur-green"
                />
              </div>
            </div>
          </div>
          
          {/* Vitals Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Weight (kg)</label>
              <input
                type="number"
                name="vitals.weight"
                value={form.vitals.weight}
                onChange={handleInputChange}
                className="w-full h-10 rounded-md border border-gray-200 px-3"
                placeholder="Enter weight"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Blood Pressure</label>
              <input
                type="text"
                name="vitals.bloodPressure"
                value={form.vitals.bloodPressure}
                onChange={handleInputChange}
                className="w-full h-10 rounded-md border border-gray-200 px-3"
                placeholder="120/80"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Heart Rate (bpm)</label>
              <input
                type="number"
                name="vitals.heartRate"
                value={form.vitals.heartRate}
                onChange={handleInputChange}
                className="w-full h-10 rounded-md border border-gray-200 px-3"
                placeholder="72"
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Upload Photos</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full h-10 rounded-md border border-gray-200 px-3"
            />
            {selectedFiles.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Selected files: {selectedFiles.length}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedFiles.map((file, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {file.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={saving || uploading}
              className="px-4 py-2 bg-ayur-green text-white rounded-lg shadow-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : saving ? 'Saving...' : 'Log Entry'}
            </button>
          </div>
        </form>
      </section>

      {/* Recent Progress Entries */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Progress Entries</h3>
        {progressEntries.length > 0 ? (
          <div className="space-y-3">
            {progressEntries.slice(0, 5).map((entry, index) => (
              <div key={entry._id || index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(entry.logDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    Symptom Score: {entry.symptomScore}/10
                  </div>
                </div>
                {entry.logEntry && (
                  <p className="text-sm text-gray-600 mb-2">{entry.logEntry}</p>
                )}
                {entry.vitals && Object.keys(entry.vitals).some(key => entry.vitals[key]) && (
                  <div className="text-xs text-gray-500">
                    Vitals: {Object.entries(entry.vitals)
                      .filter(([key, value]) => value)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No progress entries yet. Start logging your daily progress!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Progress;


