// src/pages/SupportDocManagement.tsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import { Link } from 'react-router-dom'

export default function SupportDocManagement() {
  const [docs, setDocs] = useState<any[]>([])

  const fetchDocs = async () => {
    const { data, error } = await supabase.from('support_docs').select('*').order('created_at', { ascending: false })
    if (error) return alert(error.message)
    setDocs(data || [])
  }

  useEffect(() => {
    fetchDocs()
  }, [])

  return (
    <div>
      <h2>Support Docs Management</h2>
      <ul>
        {docs.map(doc => (
          <li key={doc.id} style={{ marginBottom: '0.5rem' }}>
            <Link to={`/support/${doc.id}`} style={{ marginRight: '1rem' }}>View</Link>
            <Link to={`/support/${doc.id}/edit`} style={{ marginRight: '1rem' }}>Edit</Link>
            <span>{doc.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

