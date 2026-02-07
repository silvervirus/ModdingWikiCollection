// src/pages/SupportEditPage.tsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { useAuth } from '../supabase/authProvider'

export default function SupportEditPage() {
  const { user } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()

  const [doc, setDoc] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('open')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchDoc = async () => {
      const { data, error } = await supabase
        .from('support_docs')
        .select('*')
        .eq('id', id)
        .single()
      if (error) return alert(error.message)
      if (!data) return
      setDoc(data)
      setTitle(data.title)
      setContent(data.content)
      setStatus(data.status || 'open')
      setLoading(false)
    }
    fetchDoc()
  }, [id])

  if (loading) return <p style={{ padding: '1rem' }}>Loading…</p>
  if (!doc) return <p>Support doc not found.</p>

  // Only allow creator or admin to edit
  if (doc.submitted_by !== user?.username && user?.role !== 'admin') {
    return <p style={{ padding: '1rem' }}>You do not have permission to edit this support doc.</p>
  }

  const handleSave = async () => {
    const { error } = await supabase
      .from('support_docs')
      .update({ title, content, status })
      .eq('id', id)
    if (error) return alert(error.message)
    alert('Support doc updated!')
    navigate(`/support/${id}`)
  }

  return (
    <div style={{ padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Edit Support Doc</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
      />

      <textarea
        placeholder="Content (Markdown supported)"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={12}
        style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
      />

      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
      >
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>

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
        Save Changes
      </button>
    </div>
  )
}

