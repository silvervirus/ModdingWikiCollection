import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import { Link } from 'react-router-dom'

export default function ModManagement() {
  const [mods, setMods] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMods = async () => {
      const { data, error } = await supabase.from('mods').select('*').order('created_at', { ascending: false })
      if (error) return alert(error.message)
      setMods(data || [])
      setLoading(false)
    }
    fetchMods()
  }, [])

  if (loading) return <p>Loading mods…</p>

  return (
    <div>
      <h2>All Mods</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {mods.map(mod => (
          <li
            key={mod.id}
            style={{
              marginBottom: '1rem',
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: '#1b1b2f',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong style={{ fontSize: '1.1rem', color: '#7dbaff' }}>{mod.title}</strong>
              <p style={{ margin: 0, color: '#ccc' }}>Owner: {mod.modder_username}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to={`/mod/${mod.id}`} style={{ color: '#9fdfff', textDecoration: 'underline' }}>View</Link>
              <Link to={`/mod/${mod.id}/edit`} style={{ color: '#ffb86c', textDecoration: 'underline' }}>Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

