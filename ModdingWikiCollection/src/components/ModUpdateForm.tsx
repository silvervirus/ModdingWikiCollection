// src/components/ModUpdateForm.tsx
import React, { useState } from 'react'
import { supabase } from '../supabase/client'

interface ModUpdateFormProps {
  modId: string
  onUpdate: (newUpdate: any) => void
}

export default function ModUpdateForm({ modId, onUpdate }: ModUpdateFormProps) {
  const [version, setVersion] = useState('')
  const [downloadLink, setDownloadLink] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from('mod_updates')
      .insert([{ mod_id: modId, version, download_link: downloadLink, notes }])
      .select('*')
      .single()
    if (error) return alert(error.message)
    onUpdate(data)
    setVersion('')
    setDownloadLink('')
    setNotes('')
  }

  return (
    <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#1b1b2f', borderRadius: '8px' }}>
      <h3>Add Update</h3>
      <input
        placeholder="Version (e.g., 1.0.1)"
        value={version}
        onChange={e => setVersion(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
      />
      <input
        placeholder="Download Link"
        value={downloadLink}
        onChange={e => setDownloadLink(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
      />
      <textarea
        placeholder="Update notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
      />
      <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem', backgroundColor: '#294172', color: '#fff', border: 'none', borderRadius: '6px' }}>
        Add Update
      </button>
    </div>
  )
}

