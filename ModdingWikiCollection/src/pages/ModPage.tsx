// src/pages/ModPage.tsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { useAuth } from '../supabase/authProvider'
import ModUpdateForm from '../components/ModUpdateForm'
import VersionLink from '../components/VersionLink'

export default function ModPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [mod, setMod] = useState<any>(null)
  const [updates, setUpdates] = useState<any[]>([])

  // Fetch mod and updates
  useEffect(() => {
    if (!id) return

    // Load mod
    supabase
      .from('mods')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) setMod(data)
      })

    // Load updates
    supabase
      .from('mod_updates')
      .select('*')
      .eq('mod_id', id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setUpdates(data || []))
  }, [id])

  if (!mod) return <p style={{ color: '#fff', padding: '2rem' }}>Loading mod...</p>

  const canEdit = user?.username === mod?.modder_username

  const boxStyle: React.CSSProperties = {
    backgroundColor: '#1e3a5f',
    borderRadius: '12px',
    padding: '1rem',
    minWidth: '200px',
    flex: 1,
    color: '#fff',
    textAlign: 'center',
  }

  return (
    <div
      style={{
        padding: '2rem',
        minHeight: '100vh',
        backgroundImage: 'url(/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ marginBottom: '1rem' }}>{mod.title}</h1>

      {/* Banner */}
      {mod.banner_url && (
        <img
          src={mod.banner_url}
          alt="Banner"
          style={{
            width: '100%',
            maxHeight: '300px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        />
      )}

      {/* Description */}
      <p style={{ marginBottom: '2rem', lineHeight: 1.5 }}>{mod.description}</p>

      {/* Screenshots */}
      {mod.images && mod.images.length > 0 && (
        <>
          <h3>Screenshots</h3>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', marginBottom: '2rem' }}>
            {mod.images.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                alt={`Screenshot ${i + 1}`}
                style={{
                  width: '200px',
                  height: 'auto',
                  border: '2px solid #1e3a5f',
                  borderRadius: '12px',
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Info Boxes */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div style={boxStyle}>
          <strong>Download:</strong>
          <br />
          {mod.download_link ? (
            <VersionLink version={mod.mod_version} url={mod.download_link} />
          ) : (
            'N/A'
          )}
        </div>

        <div style={boxStyle}>
          <strong>Game Version:</strong>
          <br />
          {mod.game_version || 'N/A'}
        </div>

        <div style={boxStyle}>
          <strong>Mod Version:</strong>
          <br />
          {mod.mod_version || 'N/A'}
        </div>

        <div style={boxStyle}>
          <strong>Modder:</strong>
          <br />
          {mod.modder_username || 'N/A'}
        </div>
      </div>

      {/* Updates */}
      {updates.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Previous Updates</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {updates.map(u => (
              <li
                key={u.id}
                style={{
                  marginBottom: '0.8rem',
                  padding: '0.5rem',
                  backgroundColor: '#243b6b',
                  borderRadius: '6px',
                }}
              >
                <VersionLink version={u.version} url={u.download_link} />
                {u.notes && (
                  <p style={{ margin: '0.3rem 0 0 0', color: '#ccc' }}>{u.notes}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modder update form */}
      {canEdit && (
        <ModUpdateForm
          modId={mod.id}
          onUpdate={newUpdate => setUpdates([newUpdate, ...updates])}
        />
      )}

      {/* Back to mods list */}
      <Link to="/" style={{ color: '#9fdfff', textDecoration: 'underline', display: 'block', marginTop: '2rem' }}>
        &larr; Back to Mods
      </Link>
    </div>
  )
}

