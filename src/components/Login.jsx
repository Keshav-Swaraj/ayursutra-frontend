import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import api from '../api'; // Import your axios instance
import { useAuth } from '../context/authContext'; // Import your auth context

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      
      const userData = response.data;
      login(userData); // Store user data and token in context

      // Redirect based on the user's role
      if (userData.role === 'patient') {
        navigate('/patient-dashboard');
      } else if (userData.role === 'doctor') {
        navigate('/doctor-dashboard');
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-stretch">
        {/* Left: Image placeholder */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
          <div className="w-3/4 h-3/4 bg-gray-300 rounded-lg">
            <img 
              src="/login.jpg" // <--- REPLACE THIS WITH YOUR IMAGE PATH
              alt="Ayurveda Login Illustration" 
              className="w-full h-full object-cover rounded-lg" // <--- CHANGED TO object-cover
            />
          </div>
        </div>

        {/* Right: Login form */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-900">Login</h1>
            <p className="text-gray-600 mt-1">Access your dashboard and appointments</p>
            {error && <div className="mt-4 text-sm text-red-500">{error}</div>}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm text-gray-700">Email Address</label>
                <input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3 rounded-md border border-gray-200" 
                  placeholder="you@example.com" 
                  required 
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="password" className="text-sm text-gray-700">Password</label>
                <input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 px-3 rounded-md border border-gray-200" 
                  placeholder="Enter your password" 
                  required 
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-700">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Remember me</span>
                </label>
                <Link to="#" className="text-ayur-green hover:underline">Forgot Password?</Link>
              </div>

              <button type="submit" className="w-full h-11 bg-ayur-green text-white rounded-lg">Login</button>

              <div className="text-sm text-gray-700 text-center">
                Don't have an account? <Link to="/patient-registration" className="text-ayur-green font-medium hover:underline">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;