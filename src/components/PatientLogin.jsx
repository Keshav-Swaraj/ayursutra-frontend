import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PatientLogin = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-stretch">
        {/* Left: Image placeholder */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
          <div className="w-3/4 h-3/4 bg-gray-300 rounded-lg" />
        </div>

        {/* Right: Login form */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-900">Patient Login</h1>
            <p className="text-gray-600 mt-1">Access your dashboard and appointments</p>

            <form className="mt-6 space-y-4">
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm text-gray-700">Email Address</label>
                <input id="email" type="email" className="w-full h-11 px-3 rounded-md border border-gray-200" placeholder="you@example.com" />
              </div>
              <div className="space-y-1">
                <label htmlFor="password" className="text-sm text-gray-700">Password</label>
                <input id="password" type="password" className="w-full h-11 px-3 rounded-md border border-gray-200" placeholder="Enter your password" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-700">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-ayur-green hover:underline">Forgot Password?</a>
              </div>

              <button type="button" className="w-full h-11 bg-ayur-green text-white rounded-lg">Login</button>

              <div className="text-sm text-gray-700 text-center">
                Don't have an account? <a href="#" className="text-ayur-green font-medium hover:underline">Sign Up</a>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PatientLogin;


