import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/authContext'; // Import your auth context

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isDoctorSignup, setIsDoctorSignup] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handlePatientSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // The backend defaults to 'patient' if no role is sent
      const response = await api.post('/auth/signup', { name, email, password });
      
      login(response.data);
      if (response.data.role === 'patient') {
        navigate('/patient-registration');
      } else { // Fallback, though we expect a patient here
        navigate('/patient-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const handleDoctorSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Explicitly send the 'doctor' role
      const response = await api.post('/auth/signup', { name, email, password, role: 'doctor' });
      
      login(response.data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Doctor signup failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="w-full max-w-md p-8 m-4 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Your Account
          </h1>
          <p className="mt-2 text-gray-500">
            Start your journey to holistic wellness today.
          </p>
        </div>

        <form onSubmit={isDoctorSignup ? handleDoctorSignup : handlePatientSignup} className="mt-8 space-y-6">
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          
          {/* Form fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-ayur-green focus:border-ayur-green" placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-ayur-green focus:border-ayur-green" placeholder="name@example.com" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-ayur-green focus:border-ayur-green" placeholder="••••••••" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" id="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-ayur-green focus:border-ayur-green" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full py-3 px-4 bg-ayur-green text-white font-bold rounded-lg shadow-md hover:opacity-90 transition-opacity">
            {isDoctorSignup ? 'Sign Up as a Doctor' : 'Sign Up as a Patient'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          {isDoctorSignup ? (
            <button onClick={() => setIsDoctorSignup(false)} className="font-medium text-ayur-blue hover:text-ayur-blue/80">
              Not a doctor? Go back to patient signup.
            </button>
          ) : (
            <button onClick={() => setIsDoctorSignup(true)} className="font-medium text-ayur-blue hover:text-ayur-blue/80">
              Are you a doctor? Sign up here.
            </button>
          )}
        </p>
        <p className="mt-2 text-center text-gray-500 text-sm">
          Already have an account?{' '}
          <Link to="/patient-login" className="font-medium text-ayur-blue hover:text-ayur-blue/80">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;