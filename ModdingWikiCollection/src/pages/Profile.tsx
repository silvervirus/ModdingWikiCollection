// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../supabase/authProvider'
import { supabase } from '../supabase/client'

export default function Profile() {
  const { user, setUser } = useAuth()
  const { username: paramUsername } = useParams()
  const username = paramUsername || user?.username

  const [profile, setProfile] = useState({ username: '', about: '', photo_url: '', role: 'user' })
  const [mods, setMods] = useState<any[]>([])
  const [supportDocs, setSupportDocs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const isOwner = user?.username === username
  const isAdmin = user?.role === 'admin'

  // Fetch profile, mods, and support docs
  useEffect(() => {
    if (!username) return

    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single()
      if (data) setProfile(data)
    }

    const fetchMods = async () => {
      const { data } = await supabase
        .from('mods')
        .select('*')
        .eq('modder_username', username)
      setMods(data || [])
    }

    const fetchSupportDocs = async () => {
      const { data } = await supabase
        .from('support_docs') // ✅ make sure it's support_docs
        .select('*')
        .eq('submitted_by', username)
      setSupportDocs(data || [])
    }

    Promise.all([fetchProfile(), fetchMods(), fetchSupportDocs()]).finally(() => setLoading(false))
  }, [username])

  // Save profile changes
  const handleSave = async () => {
    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('username', username)
    if (error) return alert(error.message)
    setUser(profile)
    alert('Profile updated!')
  }

  if (!username) return <p>No profile found.</p>
  if (loading) return <p>Loading profile…</p>

  return (
    <div style={{ padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2>{profile.username}'s Profile</h2>

      {profile.photo_url && (
        <img
          src={profile.photo_url}
          alt="Profile"
          style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem' }}
        />
      )}

      {isOwner && (
        <div style={{ marginBottom: '1rem' }}>
          <input
            placeholder="Username"
            value={profile.username}
            onChange={e => setProfile({ ...profile, username: e.target.value })}
            style={{ display: 'block', marginBottom: '0.5rem', padding: '0.5rem', width: '100%' }}
          />
          <input
            placeholder="About"
            value={profile.about}
            onChange={e => setProfile({ ...profile, about: e.target.value })}
            style={{ display: 'block', marginBottom: '0.5rem', padding: '0.5rem', width: '100%' }}
          />
          <input
            placeholder="Photo URL"
            value={profile.photo_url}
            onChange={e => setProfile({ ...profile, photo_url: e.target.value })}
            style={{ display: 'block', marginBottom: '0.5rem', padding: '0.5rem', width: '100%' }}
          />
          <button
            onClick={handleSave}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#294172',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Save Profile
          </button>
        </div>
      )}

      {/* Mods */}
      <h3>{isOwner ? 'Your Mods' : `${profile.username}'s Mods`}</h3>
      {isOwner && (
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
          <Link
            to="/modder"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#294172',
              color: '#fff',
              borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            Submit New Mod
          </Link>
          <Link
            to="/mod-manager"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#7dbaff',
              color: '#000',
              borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            Manage Mods
          </Link>
        </div>
      )}
      {mods.length === 0 ? (
        <p>No mods uploaded yet.</p>
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
              </div>
              {isOwner && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to={`/mod/${mod.id}`} style={{ color: '#9fdfff', textDecoration: 'underline' }}>
                    View
                  </Link>
                  <Link to={`/mod/${mod.id}/edit`} style={{ color: '#ffb86c', textDecoration: 'underline' }}>
                    Edit
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Support Docs */}
      <h3>{isOwner ? 'Your Support Docs' : `${profile.username}'s Support Docs`}</h3>
      {supportDocs.length === 0 ? (
        <p>No support docs submitted yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {supportDocs.map(doc => {
            const canEditDoc = isOwner || isAdmin
            return (
              <li
                key={doc.id}
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
                  <strong style={{ fontSize: '1.1rem', color: '#7dbaff' }}>{doc.title}</strong>
                  <p style={{ margin: 0, color: '#ccc' }}>Submitted by: {doc.submitted_by}</p>
                </div>
                {canEditDoc && (
                  <Link
                    to={`/support/${doc.id}/edit`}
                    style={{ color: '#ffb86c', textDecoration: 'underline' }}
                  >
                    Edit
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

