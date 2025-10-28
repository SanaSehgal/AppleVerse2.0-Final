import React, { useState } from 'react';
import { Search, X, Clock, Activity, Check, XCircle, Eye, Edit } from 'lucide-react';
import AppleDisp from './AppleDisp';
import CreateApple from '../pages/CreateApple'; // ✅ Added import
import './AdminDashboard.css';

const AdminDashboard = ({ isAdmin }) => {
  const [activeTab, setActiveTab] = useState('pending'); // pending, current, apples, create
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [selectedApple, setSelectedApple] = useState(null);
  const [showAppleDisp, setShowAppleDisp] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Mock data (unchanged)
  const [pendingAdmins, setPendingAdmins] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@email.com', requestDate: '2025-10-20', reason: 'Research team member - Apple genetics study', status: 'pending' },
    { id: 2, name: 'Emily Chen', email: 'emily.chen@email.com', requestDate: '2025-10-22', reason: 'Database administrator for inventory management', status: 'pending' },
    { id: 3, name: 'Michael Brown', email: 'm.brown@email.com', requestDate: '2025-10-23', reason: 'Field researcher - Ontario apple varieties', status: 'pending' }
  ]);

  const [currentAdmins, setCurrentAdmins] = useState([
    {
      id: 101,
      name: 'Namratha Muraleedharan',
      email: 'namratha@appleverse.com',
      role: 'Super Admin',
      isActive: true,
      joinDate: '2024-01-15',
      lastLogin: '2025-10-25 09:30 AM',
      activityLog: [
        { action: 'Logged in', timestamp: '2025-10-25 09:30 AM', details: 'IP: 192.168.1.1' },
        { action: 'Updated apple variety', timestamp: '2025-10-25 10:15 AM', details: 'Modified Honeycrisp data' },
      ]
    },
    {
      id: 102,
      name: 'Sana Sehgal',
      email: 'sana@appleverse.com',
      role: 'Admin',
      isActive: true,
      joinDate: '2024-03-10',
      lastLogin: '2025-10-24 03:45 PM',
      activityLog: [
        { action: 'Logged in', timestamp: '2025-10-24 03:45 PM', details: 'IP: 192.168.1.5' },
        { action: 'Added new apple variety', timestamp: '2025-10-24 04:00 PM', details: 'Added Ambrosia variety' }
      ]
    }
  ]);

  const [apples, setApples] = useState([
    { id: 1, name: 'Honeycrisp', origin: 'USA', status: 'Active', lastUpdated: '2025-10-20' },
    { id: 2, name: 'Gala', origin: 'New Zealand', status: 'Active', lastUpdated: '2025-10-18' },
    { id: 3, name: 'Fuji', origin: 'Japan', status: 'Active', lastUpdated: '2025-10-15' }
  ]);

  // Handlers (unchanged)
  const handleApprove = (id) => setPendingAdmins(prev => prev.filter(admin => admin.id !== id));
  const handleReject = (id) => setPendingAdmins(prev => prev.filter(admin => admin.id !== id));
  const toggleActiveStatus = (id) => setCurrentAdmins(prev => prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  const handleViewApple = (apple) => { setSelectedApple(apple); setShowAppleDisp(true); setIsEditing(false); };
  const handleEditApple = (apple) => { setSelectedApple(apple); setShowAppleDisp(true); setIsEditing(true); };

  const filteredPendingAdmins = pendingAdmins.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredCurrentAdmins = currentAdmins.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>🔐 Admin Dashboard</h1>
        <p className="admin-subtitle">Manage administrators and system access</p>
      </div>

      {/* ✅ Tabs including Create Apple */}
      <div className="admin-tabs">
        <button className={`admin-tab ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>
          Pending Requests
          {pendingAdmins.length > 0 && <span className="badge">{pendingAdmins.length}</span>}
        </button>
        <button className={`admin-tab ${activeTab === 'current' ? 'active' : ''}`} onClick={() => setActiveTab('current')}>
          Current Admins
          <span className="badge-secondary">{currentAdmins.length}</span>
        </button>
        <button className={`admin-tab ${activeTab === 'apples' ? 'active' : ''}`} onClick={() => setActiveTab('apples')}>
          Apple Varieties
          <span className="badge-secondary">{apples.length}</span>
        </button>
        {/* ✅ New Create Apple Tab */}
        <button className={`admin-tab ${activeTab === 'create' ? 'active' : ''}`} onClick={() => setActiveTab('create')}>
          Create Apple
        </button>
      </div>

      {/* ✅ Conditional render per tab */}
      <div className="admin-content">
        {activeTab === 'pending' && (
          <div>
            <h2>Pending Admin Requests</h2>
            {filteredPendingAdmins.map(a => (
              <div key={a.id} className="request-card">
                <h3>{a.name}</h3>
                <p>{a.email}</p>
                <p>{a.reason}</p>
                <div>
                  <button onClick={() => handleApprove(a.id)}>Approve</button>
                  <button onClick={() => handleReject(a.id)}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'current' && (
          <div>
            <h2>Current Administrators</h2>
            {filteredCurrentAdmins.map(a => (
              <div key={a.id} className="admin-card">
                <h3>{a.name}</h3>
                <p>{a.email}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'apples' && (
          <div>
            <h2>Apple Varieties Database</h2>
            <table className="apples-table">
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Origin</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apples.map(apple => (
                  <tr key={apple.id}>
                    <td>{apple.id}</td>
                    <td>{apple.name}</td>
                    <td>{apple.origin}</td>
                    <td>{apple.status}</td>
                    <td>
                      <button onClick={() => handleViewApple(apple)}>View</button>
                      {isAdmin && <button onClick={() => handleEditApple(apple)}>Edit</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ✅ The Create Apple page integrated */}
        {activeTab === 'create' && (
          <div className="create-apple-tab">
            <h2>Create a New Apple Entry</h2>
            <CreateApple /> 
          </div>
        )}
      </div>

      {/* Apple details popup */}
      {showAppleDisp && selectedApple && (
        <AppleDisp
          appleData={selectedApple}
          onClose={() => setShowAppleDisp(false)}
          isEditing={isEditing}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
