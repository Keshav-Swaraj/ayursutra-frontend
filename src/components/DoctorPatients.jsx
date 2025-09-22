import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import api from '../api';
import PatientCard from './PatientCard';

const DoctorPatients = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);

  useEffect(() => {
    fetchPatientsData();
  }, []);

  const fetchPatientsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch patients and appointments in parallel
      const [patientsResponse, appointmentsResponse] = await Promise.allSettled([
        api.get('/patients'),
        api.get('/appointments/doctor')
      ]);

      // Handle patients data
      if (patientsResponse.status === 'fulfilled') {
        setPatients(patientsResponse.value.data);
      } else {
        console.warn('Failed to fetch patients:', patientsResponse.reason);
      }

      // Handle appointments data
      if (appointmentsResponse.status === 'fulfilled') {
        setAppointments(appointmentsResponse.value.data);
      } else {
        console.warn('Failed to fetch appointments:', appointmentsResponse.reason);
      }

    } catch (err) {
      console.error('Error fetching patients data:', err);
      setError('Failed to load patients data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate metrics
  const totalPatients = patients.length;
  const activePatients = patients.filter(patient => {
    // Consider a patient active if they have an appointment in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return appointments.some(apt => 
      apt.patient._id === patient._id && 
      new Date(apt.date) >= thirtyDaysAgo
    );
  }).length;

  const newThisMonth = patients.filter(patient => {
    const patientCreated = new Date(patient.createdAt || patient._id);
    const thisMonth = new Date();
    thisMonth.setDate(1);
    return patientCreated >= thisMonth;
  }).length;

  const followUpsDue = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    const today = new Date();
    const diffTime = today - aptDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 7 && diffDays <= 30; // Follow-ups due between 1-4 weeks
  }).length;

  const metrics = [
    { label: 'Total Patients', value: totalPatients },
    { label: 'Active Patients', value: activePatients },
    { label: 'New This Month', value: newThisMonth },
    { label: 'Follow-ups Due', value: followUpsDue },
  ];

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => {
    const fullName = `${patient.firstName || ''} ${patient.lastName || ''}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return fullName.includes(searchLower) || 
           patient._id.toLowerCase().includes(searchLower) ||
           (patient.user?.email && patient.user.email.toLowerCase().includes(searchLower));
  });

  // Get last appointment for each patient
  const getLastAppointment = (patientId) => {
    const patientAppointments = appointments
      .filter(apt => apt.patient._id === patientId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return patientAppointments.length > 0 ? patientAppointments[0].date : null;
  };

  // Handler functions
  const handleAddNewPatient = () => {
    setShowAddPatientModal(true);
  };

  const handleViewPatientDetails = (patient) => {
    setSelectedPatient(patient);
    setShowPatientModal(true);
  };

  const handleCreateAppointment = (patient) => {
    // Navigate to schedule page with patient pre-selected
    navigate('/doctor-schedule', { state: { selectedPatient: patient } });
  };

  const handleViewProgress = (patient) => {
    // For now, show patient progress in an alert
    // In a real app, this would navigate to a progress page
    const message = `
      Patient Progress for ${patient.firstName} ${patient.lastName}:
      
      📊 Recent Progress Entries: 5
      📈 Symptom Score Trend: Improving
      📅 Last Entry: ${new Date().toLocaleDateString()}
      💊 Current Protocol: Vata Balancing
      
      This would show detailed progress tracking and charts.
    `;
    alert(message);
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

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Patients</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchPatientsData}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Patients</h2>

      {/* Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 text-center">
            <div className="text-2xl font-bold text-gray-900">{m.value}</div>
            <div className="text-sm text-gray-600 mt-1">{m.label}</div>
          </div>
        ))}
      </section>

      {/* Find & Manage */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Find & Manage Patients</h3>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input 
                className="w-full h-10 pl-9 pr-3 rounded-md border border-gray-200" 
                placeholder="Search patients by name, ID, or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={handleAddNewPatient}
              className="inline-flex items-center gap-2 px-4 h-10 bg-ayur-green text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <span>＋</span>
              <span>Add New Patient</span>
            </button>
          </div>
        </div>

        {/* Grid */}
        {filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => {
              const lastAppointment = getLastAppointment(patient._id);
              const patientName = `${patient.firstName || ''} ${patient.lastName || ''}`.trim() || 'Unknown Patient';
              
              return (
                <PatientCard
                  key={patient._id}
                  name={patientName}
                  patientId={patient._id}
                  lastAppointment={lastAppointment ? new Date(lastAppointment).toLocaleDateString() : 'No appointments'}
                  profilePicUrl={patient.profilePicUrl || ''}
                  patient={patient}
                  onViewDetails={handleViewPatientDetails}
                  onCreateAppointment={handleCreateAppointment}
                  onViewProgress={handleViewProgress}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>{searchTerm ? 'No patients found matching your search' : 'No patients found'}</p>
          </div>
        )}
      </section>

      {/* Add New Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Patient</h3>
              <button 
                onClick={() => setShowAddPatientModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                To add a new patient, they need to register through the patient portal first. 
                You can then assign them to your practice.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Instructions:</h4>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Patient registers at the clinic or online</li>
                  <li>Patient completes their profile setup</li>
                  <li>You can then book appointments for them</li>
                </ol>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowAddPatientModal(false)}
                className="flex-1 px-4 py-2 bg-ayur-green text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patient Details Modal */}
      {showPatientModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Patient Details</h3>
              <button 
                onClick={() => setShowPatientModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Name:</span>
                  <p className="text-gray-900">{selectedPatient.firstName} {selectedPatient.lastName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Patient ID:</span>
                  <p className="text-gray-900">{selectedPatient._id}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                  <p className="text-gray-900">{selectedPatient.user?.email || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Phone:</span>
                  <p className="text-gray-900">{selectedPatient.phoneNumber || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Gender:</span>
                  <p className="text-gray-900">{selectedPatient.gender || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Dosha Profile:</span>
                  <p className="text-gray-900">{selectedPatient.doshaProfile || 'N/A'}</p>
                </div>
              </div>
              
              {selectedPatient.medicalHistory && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Medical History:</span>
                  <p className="text-gray-900 text-sm mt-1">{selectedPatient.medicalHistory}</p>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => handleCreateAppointment(selectedPatient)}
                className="flex-1 px-4 py-2 bg-ayur-green text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Book Appointment
              </button>
              <button 
                onClick={() => setShowPatientModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPatients;


