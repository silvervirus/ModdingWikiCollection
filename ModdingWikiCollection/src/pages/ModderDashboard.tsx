import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import { useAuth } from '../supabase/authProvider'
import { Link } from 'react-router-dom'

export default function ModderDashboard() {
  const { user } = useAuth()

  // Mod creation form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [bannerUrl, setBannerUrl] = useState('/default-banner.jpg')
  const [screenshots, setScreenshots] = useState<string[]>(['', '', '', ''])
  const [downloadLink, setDownloadLink] = useState('')
  const [gameVersion, setGameVersion] = useState('')
  const [modVersion, setModVersion] = useState('')
  const [releaseChannel, setReleaseChannel] = useState('stable')

  // Data lists
  const [mods, setMods] = useState<any[]>([])
  const [supportDocs, setSupportDocs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch mods and support docs for the logged-in modder
  const fetchData = async () => {
    if (!user) return

    // Fetch mods
    const { data: modsData, error: modsError } = await supabase
      .from('mods')
      .select('*')
      .eq('modder_username', user.username)
      .order('created_at', { ascending: false })

    if (modsError) return alert(modsError.message)
    setMods(modsData || [])

    // Fetch support docs
    const { data: supportData, error: supportError } = await supabase
      .from('support_docs') // ✅ updated table name
      .select('*')
      .eq('submitted_by', user.username) // ✅ use correct column
      .order('created_at', { ascending: false })

    if (supportError) return alert(supportError.message)
    setSupportDocs(supportData || [])

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [user])

  // Handle mod form screenshot updates
  const handleScreenshotChange = (index: number, value: string) => {
    const newScreenshots = [...screenshots]
    newScreenshots[index] = value
    setScreenshots(newScreenshots)
  }

  // Handle mod creation
  const handleCreateMod = async () => {
    if (!user) return alert('Not logged in')

    const { data, error } = await supabase
      .from('mods')
      .insert([{
        title,
        description,
        modder_username: user.username,
        banner_url: bannerUrl,
        images: screenshots.filter(Boolean),
        download_link: downloadLink,
        game_version: gameVersion,
        mod_version: modVersion,
        release_channel: releaseChannel,
      }])
      .select('*')

    if (error) return alert(error.message)
    if (!data || data.length === 0) return

    // Add new mod to the list
    setMods([data[0], ...mods])

    // Reset form
    setTitle('')
    setDescription('')
    setBannerUrl('/default-banner.jpg')
    setScreenshots(['', '', '', ''])
    setDownloadLink('')
    setGameVersion('')
    setModVersion('')
    setReleaseChannel('stable')
  }

  if (!user) return <p>You must be logged in to view this page.</p>
  if (loading) return <p>Loading your mods and support docs…</p>

  return (
    <div style={{ padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Modder Dashboard</h2>

      {/* Create Mod Form */}
      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#1b1b2f', borderRadius: '8px' }}>
        <h3>Create a New Mod</h3>

        <input
          placeholder="Mod Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />

        <input
          placeholder="Banner URL"
          value={bannerUrl}
          onChange={e => setBannerUrl(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />

        <h4>Screenshots (up to 4)</h4>
        {screenshots.map((s, i) => (
          <input
            key={i}
            placeholder={`Screenshot ${i + 1}`}
            value={s}
            onChange={e => handleScreenshotChange(i, e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
        ))}

        <input
          placeholder="Download Link"
          value={downloadLink}
          onChange={e => setDownloadLink(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />

        <input
          placeholder="Game Version"
          value={gameVersion}
          onChange={e => setGameVersion(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />

        <input
          placeholder="Mod Version"
          value={modVersion}
          onChange={e => setModVersion(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />

        <select
          value={releaseChannel}
          onChange={e => setReleaseChannel(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        >
          <option value="stable">Stable</option>
          <option value="experimental">Experimental</option>
          <option value="legacy">Legacy</option>
          <option value="2025">2025</option>
          <option value="2023">2023</option>
        </select>

        <button
          onClick={handleCreateMod}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#294172',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Submit Mod
        </button>
      </div>

      {/* Mods List */}
      <h3>Your Mods</h3>
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
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={`/mod/${mod.id}`} style={{ color: '#9fdfff', textDecoration: 'underline' }}>
                  View
                </Link>
                <Link to={`/mod/${mod.id}/edit`} style={{ color: '#ffb86c', textDecoration: 'underline' }}>
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Support Docs List */}
      <h3>Your Support Docs</h3>
      {supportDocs.length === 0 ? (
        <p>You haven't added any support docs yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {supportDocs.map(doc => (
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
                <strong style={{ fontSize: '1.1rem', color: '#ff79c6' }}>{doc.title}</strong>
                <p style={{ margin: 0, color: '#ccc' }}>Status: {doc.status || 'open'}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={`/support/${doc.id}`} style={{ color: '#9fdfff', textDecoration: 'underline' }}>
                  View
                </Link>
                <Link to={`/support/${doc.id}/edit`} style={{ color: '#ffb86c', textDecoration: 'underline' }}>
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

