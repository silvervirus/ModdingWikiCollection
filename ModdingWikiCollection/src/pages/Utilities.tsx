// src/pages/Utilities.tsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import { Link } from 'react-router-dom'

export default function Utilities() {
  const [utils, setUtils] = useState<any[]>([])
  const [term, setTerm] = useState('')

  const fetchUtils = async (searchTerm = '') => {
    const { data } = await supabase
      .from('mods')
      .select('*')
      .ilike('title', `%${searchTerm}%`)
      .eq('category', 'Utility')
    setUtils(data || [])
  }

  useEffect(() => { fetchUtils('') }, [])
  useEffect(() => {
    const timeout = setTimeout(() => fetchUtils(term), 300)
    return () => clearTimeout(timeout)
  }, [term])

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Utilities & Libraries</h2>
      <input placeholder="Search..." value={term} onChange={e => setTerm(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
      <ul>
        {utils.map(u => (
          <li key={u.id} style={{ marginBottom: '0.5rem' }}>
            <Link to={`/mod/${u.id}`} style={{ color: '#7dbaff' }}>{u.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

