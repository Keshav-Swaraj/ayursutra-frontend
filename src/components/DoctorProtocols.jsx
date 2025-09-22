import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import api from '../api';
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

const DoctorProtocols = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [showProtocolModal, setShowProtocolModal] = useState(false);
  
  const [form, setForm] = useState({ 
    name: '', 
    associatedDosha: '', 
    description: '',
    duration: '',
    steps: {
      preparation: '',
      mainProcedure: '',
      postTherapy: ''
    }
  });

  useEffect(() => {
    fetchProtocols();
  }, []);

  const fetchProtocols = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/protocols');
      setProtocols(response.data);
    } catch (err) {
      console.error('Error fetching protocols:', err);
      setError('Failed to load protocols');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('steps.')) {
      const stepKey = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        steps: {
          ...prev.steps,
          [stepKey]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const protocolData = {
        name: form.name,
        associatedDosha: form.associatedDosha,
        description: form.description,
        duration: form.duration,
        steps: form.steps
      };

      await api.post('/protocols', protocolData);
      
      setSuccess(true);
      setForm({ 
        name: '', 
        associatedDosha: '', 
        description: '',
        duration: '',
        steps: {
          preparation: '',
          mainProcedure: '',
          postTherapy: ''
        }
      });
      
      // Refresh protocols list
      await fetchProtocols();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving protocol:', err);
      setError('Failed to save protocol. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setForm({ 
      name: '', 
      associatedDosha: '', 
      description: '',
      duration: '',
      steps: {
        preparation: '',
        mainProcedure: '',
        postTherapy: ''
      }
    });
  };

  // Handler functions
  const handleViewProtocol = (protocol) => {
    setSelectedProtocol(protocol);
    setShowProtocolModal(true);
  };

  const handleEditProtocol = (protocol) => {
    // Pre-fill the form with existing protocol data
    setForm({
      name: protocol.name || '',
      associatedDosha: protocol.associatedDosha || '',
      description: protocol.description || '',
      duration: protocol.duration || '',
      steps: {
        preparation: protocol.steps?.preparation || '',
        mainProcedure: protocol.steps?.mainProcedure || '',
        postTherapy: protocol.steps?.postTherapy || ''
      }
    });
    // Scroll to the form section
    document.getElementById('protocol-editor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteProtocol = async (protocolId) => {
    if (window.confirm('Are you sure you want to delete this protocol? This action cannot be undone.')) {
      try {
        await api.delete(`/protocols/${protocolId}`);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        await fetchProtocols();
      } catch (err) {
        console.error('Error deleting protocol:', err);
        setError('Failed to delete protocol. Please try again.');
      }
    }
  };

  const handleCreateNewProtocol = () => {
    resetForm();
    // Scroll to the form section
    document.getElementById('protocol-editor')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter protocols based on search term
  const filteredProtocols = protocols.filter(protocol => {
    const searchLower = searchTerm.toLowerCase();
    return protocol.name.toLowerCase().includes(searchLower) || 
           protocol.associatedDosha.toLowerCase().includes(searchLower) ||
           protocol.description.toLowerCase().includes(searchLower);
  });

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
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Protocols</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchProtocols}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">Protocol saved successfully!</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Existing Protocols */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Existing Protocols</h2>
          <button 
            onClick={handleCreateNewProtocol}
            className="px-4 py-2 bg-ayur-green text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            + Create New Protocol
          </button>
        </div>
        <div className="relative w-full md:w-96">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input 
            className="w-full h-10 pl-9 pr-3 rounded-md border border-gray-200" 
            placeholder="Search protocols"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredProtocols.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProtocols.map((protocol) => (
              <ProtocolCard 
                key={protocol._id} 
                title={protocol.name}
                associatedDosha={protocol.associatedDosha}
                status={protocol.status || 'active'}
                duration={protocol.duration || 'N/A'}
                protocol={protocol}
                onView={handleViewProtocol}
                onEdit={handleEditProtocol}
                onDelete={handleDeleteProtocol}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>{searchTerm ? 'No protocols found matching your search' : 'No protocols found'}</p>
          </div>
        )}
      </section>

      {/* Protocol Editor */}
      <section id="protocol-editor" className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Protocol Editor</h2>
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Protocol Name</label>
              <input 
                name="name"
                value={form.name} 
                onChange={handleInputChange} 
                className="w-full h-10 rounded-md border border-gray-200 px-3" 
                placeholder="Enter name" 
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Associated Dosha</label>
              <select 
                name="associatedDosha"
                value={form.associatedDosha} 
                onChange={handleInputChange} 
                className="w-full h-10 rounded-md border border-gray-200 px-3 bg-white"
                required
              >
                <option value="">Select dosha</option>
                <option value="Vata">Vata</option>
                <option value="Pitta">Pitta</option>
                <option value="Kapha">Kapha</option>
                <option value="Tridosha">Tridosha (Balanced)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Duration</label>
              <input 
                name="duration"
                value={form.duration} 
                onChange={handleInputChange} 
                className="w-full h-10 rounded-md border border-gray-200 px-3" 
                placeholder="e.g., 14 days" 
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm text-gray-600">Description</label>
              <textarea 
                name="description"
                value={form.description} 
                onChange={handleInputChange} 
                className="w-full h-28 rounded-md border border-gray-200 p-3" 
                placeholder="Describe the protocol..." 
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Collapsible title="Preparation Phase">
              <textarea
                name="steps.preparation"
                value={form.steps.preparation}
                onChange={handleInputChange}
                className="w-full h-20 rounded-md border border-gray-200 p-3 text-sm"
                placeholder="Add steps for preparatory measures like snehana and swedana..."
              />
            </Collapsible>
            <Collapsible title="Main Procedure">
              <textarea
                name="steps.mainProcedure"
                value={form.steps.mainProcedure}
                onChange={handleInputChange}
                className="w-full h-20 rounded-md border border-gray-200 p-3 text-sm"
                placeholder="Outline the primary therapy with dosages, frequency, and guidance..."
              />
            </Collapsible>
            <Collapsible title="Post-Therapy Care">
              <textarea
                name="steps.postTherapy"
                value={form.steps.postTherapy}
                onChange={handleInputChange}
                className="w-full h-20 rounded-md border border-gray-200 p-3 text-sm"
                placeholder="Diet, rest, and follow-ups to consolidate benefits..."
              />
            </Collapsible>
          </div>

          <div className="flex items-center gap-3">
            <button 
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-ayur-green text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Protocol'}
            </button>
            <button 
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg bg-transparent hover:bg-gray-50"
            >
              Reset Form
            </button>
          </div>
        </form>
      </section>

      {/* Protocol Details Modal */}
      {showProtocolModal && selectedProtocol && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Protocol Details</h3>
              <button 
                onClick={() => setShowProtocolModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Protocol Name:</span>
                  <p className="text-gray-900 font-semibold">{selectedProtocol.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Associated Dosha:</span>
                  <p className="text-gray-900">{selectedProtocol.associatedDosha}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Duration:</span>
                  <p className="text-gray-900">{selectedProtocol.duration || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedProtocol.status === 'active' ? 'bg-green-100 text-green-800' :
                    selectedProtocol.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedProtocol.status || 'Active'}
                  </span>
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-600">Description:</span>
                <p className="text-gray-900 mt-1">{selectedProtocol.description}</p>
              </div>
              
              {selectedProtocol.steps && (
                <div className="space-y-4">
                  {selectedProtocol.steps.preparation && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Preparation Phase:</span>
                      <p className="text-gray-900 mt-1 text-sm">{selectedProtocol.steps.preparation}</p>
                    </div>
                  )}
                  {selectedProtocol.steps.mainProcedure && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Main Procedure:</span>
                      <p className="text-gray-900 mt-1 text-sm">{selectedProtocol.steps.mainProcedure}</p>
                    </div>
                  )}
                  {selectedProtocol.steps.postTherapy && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Post-Therapy Care:</span>
                      <p className="text-gray-900 mt-1 text-sm">{selectedProtocol.steps.postTherapy}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => handleEditProtocol(selectedProtocol)}
                className="flex-1 px-4 py-2 bg-ayur-green text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Edit Protocol
              </button>
              <button 
                onClick={() => setShowProtocolModal(false)}
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

export default DoctorProtocols;


