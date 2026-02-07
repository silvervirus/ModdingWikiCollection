import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import UserManagement from './UserManagement'
import ModManagement from './ModManagement'
import SupportDocManagement from './SupportDocManagement'
import NexusImportButton from '../components/NexusImportButton'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'users' | 'mods' | 'support'>('users')

  const tabStyle = (active: boolean) => ({
    padding: '0.5rem 1rem',
    backgroundColor: active ? '#294172' : '#1b1b2f',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  })

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#121212', color: '#eee' }}>
      <h1>Admin Dashboard</h1>

      {/* Tabs */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => setActiveTab('users')} style={tabStyle(activeTab === 'users')}>
          User Management
        </button>
        <button onClick={() => setActiveTab('mods')} style={tabStyle(activeTab === 'mods')}>
          Mod Management
        </button>
        <button onClick={() => setActiveTab('support')} style={tabStyle(activeTab === 'support')}>
          Support Docs
        </button>
      </div>
        <h3>Nexus Tools</h3>
        <NexusImportButton />
      {/* Active Tab Content */}
      <div style={{ marginTop: '1rem' }}>
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'mods' && <ModManagement />}
        {activeTab === 'support' && <SupportDocManagement />}
      </div>
    </div>
  )
}

