// src/pages/ModManager.tsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import { useAuth } from '../supabase/authProvider'
import { Link } from 'react-router-dom'

export default function ModManager() {
  const { user } = useAuth()
  const [mods, setMods] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch mods for the logged-in user
  useEffect(() => {
    const fetchMods = async () => {
      if (!user) return
      const { data, error } = await supabase
        .from('mods')
        .select('*')
        .eq('modder_username', user.username)
        .order('created_at', { ascending: false })

      if (error) return alert(error.message)
      setMods(data || [])
      setLoading(false)
    }
    fetchMods()
  }, [user])

  if (!user) return <p>You must be logged in to manage your mods.</p>
  if (loading) return <p>Loading your mods…</p>

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Your Mods</h2>

      {mods.length === 0 ? (
        <p>You haven't added any mods yet.</p>
      ) : (
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
                <p style={{ margin: 0, color: '#ccc' }}>Channel: {mod.release_channel || 'stable'}</p>
                <p style={{ margin: 0, color: '#aaa', fontSize: '0.85rem' }}>Version: {mod.mod_version || '-'}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link
                  to={`/mod/${mod.id}`}
                  style={{ color: '#9fdfff', textDecoration: 'underline' }}
                >
                  View
                </Link>
                <Link
                  to={`/mod/${mod.id}/edit`}
                  style={{ color: '#ffb86c', textDecoration: 'underline' }}
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

