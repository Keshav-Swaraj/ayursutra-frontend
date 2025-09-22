import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationStepper from './RegistrationStepper';
import { useAuth } from '../context/authContext';
import api from '../api';

const PatientRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '', // Not in UI but helps with data consistency
    medicalHistory: '',
    doshaProfile: { vata: 0, pitta: 0, kapha: 0 },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { user, token, role } = useAuth(); // Get user and token from context

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (role === 'doctor') {
      navigate('/doctor-dashboard');
      return;
    }

    // Fetch existing patient profile on load to pre-populate form
    const fetchProfile = async () => {
      try {
        const response = await api.get('/patients/me');
        if (response.data) {
          setFormData(response.data);
          navigate('/patient-dashboard'); // If profile exists, redirect to dashboard
        }
      } catch (err) {
        if (err.response && err.response.status !== 404) {
          setError('Failed to load profile data.');
          console.error("Error fetching profile:", err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, role, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/patients', formData);
      navigate('/patient-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Profile creation failed.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="text-sm text-gray-700">First Name</label>
                <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full h-11 px-3 rounded-md border border-gray-200" required />
              </div>
              <div>
                <label htmlFor="lastName" className="text-sm text-gray-700">Last Name</label>
                <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full h-11 px-3 rounded-md border border-gray-200" required />
              </div>
              {/* Add your other fields here */}
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={handleNext} className="inline-flex items-center gap-2 bg-ayur-green text-white px-5 h-11 rounded-lg">
                <span>Next</span>
                <span>→</span>
              </button>
            </div>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Medical History</h1>
            {/* Add your medical history fields here */}
            <div className="flex justify-between">
              <button type="button" onClick={handlePrev} className="bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg">Back</button>
              <button type="button" onClick={handleNext} className="bg-ayur-green text-white font-bold py-2 px-6 rounded-lg">Next</button>
            </div>
          </form>
        );
      case 3:
        return (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dosha Assessment</h1>
            {/* Add your dosha assessment fields here */}
            <div className="flex justify-between">
              <button type="button" onClick={handlePrev} className="bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg">Back</button>
              <button type="submit" className="bg-ayur-green text-white font-bold py-2 px-6 rounded-lg">Submit</button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <RegistrationStepper activeKey={step === 1 ? 'personal' : step === 2 ? 'medical' : 'dosha'} />
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-gray-900">{step === 1 ? 'Personal Information' : step === 2 ? 'Medical History' : 'Dosha Assessment'}</h1>
          <p className="text-gray-600 mt-1">
            {step === 1 ? 'Tell us a bit about yourself to get started' : step === 2 ? 'Please provide your medical history' : 'Complete your dosha assessment'}
          </p>
          {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;