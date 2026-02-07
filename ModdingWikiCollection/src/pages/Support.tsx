// src/pages/Support.tsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import { Link } from 'react-router-dom'

export default function Support() {
  const [docs, setDocs] = useState<any[]>([])
  const [term, setTerm] = useState('')

  const fetchDocs = async (searchTerm = '') => {
    const { data } = await supabase
      .from('support_docs')
      .select('*')
      .ilike('title', `%${searchTerm}%`)
      .order('created_at', { ascending: false })
    setDocs(data || [])
  }

  useEffect(() => {
    fetchDocs('')
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => fetchDocs(term), 300)
    return () => clearTimeout(timeout)
  }, [term])

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Support</h2>
      <input
        placeholder="Search support docs..."
        value={term}
        onChange={e => setTerm(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      {docs.length === 0 && <p>No support documents found.</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {docs.map(doc => (
          <li
            key={doc.id}
            style={{
              marginBottom: '1rem',
              borderRadius: '8px',
              backgroundColor: '#1b1b2f',
              padding: '1rem',
            }}
          >
            <Link to={`/support/${doc.id}`} style={{ color: '#7dbaff', fontWeight: 'bold', fontSize: '1.1rem' }}>
              {doc.title}
            </Link>
            <p style={{ color: '#ccc', marginTop: '0.5rem' }}>submitted by {doc.submitted_by}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

