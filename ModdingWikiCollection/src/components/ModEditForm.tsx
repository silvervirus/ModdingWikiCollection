// src/components/ModEditForm.tsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'

interface ModEditFormProps {
  modId: string
  onUpdate: (updatedMod: any) => void
  ownerId: string // id of mod owner
  currentUserId: string // id of logged-in user
}

export default function ModEditForm({ modId, onUpdate, ownerId, currentUserId }: ModEditFormProps) {
  const [mod, setMod] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [bannerUrl, setBannerUrl] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [downloadLink, setDownloadLink] = useState('')
  const [gameVersion, setGameVersion] = useState('')
  const [modVersion, setModVersion] = useState('')
  const [releaseChannel, setReleaseChannel] = useState('stable')

  // Load mod data
  useEffect(() => {
    const fetchMod = async () => {
      const { data, error } = await supabase
        .from('mods')
        .select('*')
        .eq('id', modId)
        .single()
      if (error) return alert(error.message)
      if (data) {
        setMod(data)
        setTitle(data.title)
        setDescription(data.description)
        setBannerUrl(data.banner_url)
        setImages(data.images || [])
        setDownloadLink(data.download_link)
        setGameVersion(data.game_version)
        setModVersion(data.mod_version)
        setReleaseChannel(data.release_channel || 'stable')
      }
    }
    fetchMod()
  }, [modId])

  if (ownerId !== currentUserId) return null // only owner can edit

  if (!mod) return <p>Loading mod info...</p>

  const handleSubmit = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('mods')
      .update({
        title,
        description,
        banner_url: bannerUrl,
        images,
        download_link: downloadLink,
        game_version: gameVersion,
        mod_version: modVersion,
        release_channel: releaseChannel,
      })
      .eq('id', modId)
      .select('*')
      .single()

    setLoading(false)
    if (error) return alert(error.message)
    onUpdate(data)
  }

  const handleImagesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const arr = e.target.value.split('\n').map(s => s.trim()).filter(Boolean)
    setImages(arr)
  }

  return (
    <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#1b1b2f', borderRadius: '8px' }}>
      <h3>Edit Mod Info</h3>

      <input
        placeholder="Title"
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

      <textarea
        placeholder="Screenshots URLs (one per line)"
        value={images.join('\n')}
        onChange={handleImagesChange}
        style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
      />

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
        <option value="2025">2025</option>
        <option value="2023">2023</option>
        <option value="legacy">Legacy</option>
        <option value="experimental">Experimental</option>
      </select>

      <button
        onClick={handleSubmit}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#294172',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
        disabled={loading}
      >
        {loading ? 'Saving…' : 'Save Changes'}
      </button>
    </div>
  )
}

