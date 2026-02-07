// src/pages/ModEditPage.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import { useAuth } from '../supabase/authProvider'

export default function ModEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [mod, setMod] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!id || !user) return

    const fetchMod = async () => {
      const { data: modData, error: modError } = await supabase
        .from('mods')
        .select('*')
        .eq('id', id)
        .single()

      if (modError) {
        alert(modError.message)
        setLoading(false)
        return
      }

      setMod(modData)

      // Determine if current user is admin
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('username', user.username)
        .single()

      if (profileError) {
        console.error(profileError)
      } else {
        setIsAdmin(profileData?.role === 'admin')
      }

      setLoading(false)
    }

    fetchMod()
  }, [id, user])

  if (loading) return <p>Loading mod...</p>
  if (!mod) return <p>Mod not found.</p>

  const canEdit = isAdmin || mod.modder_username === user?.username
  if (!canEdit) return <p>You do not have permission to edit this mod.</p>

  const handleSave = async () => {
    setSaving(true)

    const updateData: any = {
      title: mod.title,
      description: mod.description,
      mod_version: mod.mod_version,
      game_version: mod.game_version,
      download_link: mod.download_link,
    }

    // Admin can also update modder_username
    if (isAdmin) {
      updateData.modder_username = mod.modder_username
    }

    const { error } = await supabase
      .from('mods')
      .update(updateData)
      .eq('id', id)

    setSaving(false)

    if (error) {
      alert(error.message)
    } else {
      alert('Mod updated successfully!')
      navigate(`/mod/${id}`)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Edit Mod</h2>

      {isAdmin && (
        <div style={{ marginBottom: '1rem' }}>
          <label>Modder Username</label>
          <input
            value={mod.modder_username}
            onChange={e => setMod({ ...mod, modder_username: e.target.value })}
            style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <label>Title</label>
        <input
          value={mod.title}
          onChange={e => setMod({ ...mod, title: e.target.value })}
          style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Description</label>
        <textarea
          value={mod.description}
          onChange={e => setMod({ ...mod, description: e.target.value })}
          style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Mod Version</label>
        <input
          value={mod.mod_version}
          onChange={e => setMod({ ...mod, mod_version: e.target.value })}
          style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Game Version</label>
        <input
          value={mod.game_version}
          onChange={e => setMod({ ...mod, game_version: e.target.value })}
          style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Download Link</label>
        <input
          value={mod.download_link}
          onChange={e => setMod({ ...mod, download_link: e.target.value })}
          placeholder="https://example.com/download"
          style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#294172',
          color: '#fff',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {saving ? 'Saving...' : 'Save Mod'}
      </button>
    </div>
  )
}

