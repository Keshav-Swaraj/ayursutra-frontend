import React from 'react';
import RegistrationStepper from './RegistrationStepper';

const PatientRegistration = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <RegistrationStepper activeKey="personal" />

        <div className="mt-8">
          <h1 className="text-2xl font-bold text-gray-900">Personal Information</h1>
          <p className="text-gray-600 mt-1">Tell us a bit about yourself to get started</p>

          <form className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-700" htmlFor="firstName">First Name</label>
                <input id="firstName" className="w-full h-11 px-3 rounded-md border border-gray-200" placeholder="First name" />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-700" htmlFor="lastName">Last Name</label>
                <input id="lastName" className="w-full h-11 px-3 rounded-md border border-gray-200" placeholder="Last name" />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-700" htmlFor="dob">Date of Birth</label>
                <input id="dob" type="date" className="w-full h-11 px-3 rounded-md border border-gray-200" />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-700" htmlFor="gender">Gender</label>
                <select id="gender" className="w-full h-11 px-3 rounded-md border border-gray-200 bg-white">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-700" htmlFor="email">Email</label>
                <input id="email" type="email" className="w-full h-11 px-3 rounded-md border border-gray-200" placeholder="you@example.com" />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-700" htmlFor="phone">Phone Number</label>
                <input id="phone" className="w-full h-11 px-3 rounded-md border border-gray-200" placeholder="Enter phone" />
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="inline-flex items-center gap-2 bg-ayur-green text-white px-5 h-11 rounded-lg">
                <span>Next</span>
                <span>→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;


