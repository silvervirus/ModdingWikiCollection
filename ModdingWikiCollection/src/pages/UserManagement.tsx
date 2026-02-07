import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('profiles').select('*')
      if (error) return alert(error.message)
      setUsers(data || [])
      setLoading(false)
    }
    fetchUsers()
  }, [])

  const handleRoleChange = async (userId: string, newRole: string) => {
    const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId)
    if (error) return alert(error.message)
    setUsers(users.map(u => (u.id === userId ? { ...u, role: newRole } : u)))
  }

  if (loading) return <p>Loading users…</p>

  return (
    <div>
      <h2>All Users</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #555' }}>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Username</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Role</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '0.5rem' }}>{user.username}</td>
              <td style={{ padding: '0.5rem' }}>{user.email}</td>
              <td style={{ padding: '0.5rem' }}>{user.role}</td>
              <td style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleRoleChange(user.id, 'admin')}>Admin</button>
                <button onClick={() => handleRoleChange(user.id, 'modder')}>Modder</button>
                <button onClick={() => handleRoleChange(user.id, 'user')}>User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

