// src/pages/Home.tsx
import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import { Link } from 'react-router-dom'

type Channel = 'all' | 'legacy' | '2023' | '2025' | 'stable' | 'experimental'

export default function Home() {
  const [mods, setMods] = useState<any[]>([])
  const [term, setTerm] = useState('')
  const [channel, setChannel] = useState<Channel>('all')
  const [loading, setLoading] = useState(false)

  const fetchMods = async () => {
    setLoading(true)

    let query = supabase
      .from('mods')
      .select('id, title, description, modder_username, release_channel')
      .ilike('title', `%${term}%`)

    if (channel !== 'all') {
      query = query.eq('release_channel', channel)
    }

    const { data } = await query
    setMods(data || [])
    setLoading(false)
  }

  // Initial load
  useEffect(() => {
    fetchMods()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Debounced search + filter
  useEffect(() => {
    const timeout = setTimeout(fetchMods, 300)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, channel])

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#e0e0e0',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        Modding Wiki
      </h1>

      {/* Search */}
      <input
        placeholder="Search mods..."
        value={term}
        onChange={e => setTerm(e.target.value)}
        style={{
          padding: '0.6rem',
          width: '100%',
          maxWidth: '520px',
          margin: '0 auto 1rem auto',
          display: 'block',
          borderRadius: '10px',
          border: '1px solid #555',
          backgroundColor: '#1b1b1b',
          color: '#eee',
        }}
      />

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
        }}
      >
        {(['all', 'stable', '2025', '2023', 'legacy', 'experimental'] as Channel[]).map(c => (
          <button
            key={c}
            onClick={() => setChannel(c)}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '999px',
              border: '1px solid #445',
              backgroundColor:
                channel === c ? '#243b6b' : 'rgba(20,30,60,0.8)',
              color: '#dbe7ff',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading && <p style={{ textAlign: 'center' }}>Loading…</p>}

      {!loading && mods.length === 0 && (
        <p style={{ textAlign: 'center' }}>No mods found.</p>
      )}

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {mods.map(m => (
          <li
            key={m.id}
            style={{
              marginBottom: '1.5rem',
              padding: '1.2rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(20, 30, 60, 0.88)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.45)',
            }}
          >
            <Link
              to={`/mod/${m.id}`}
              style={{
                fontWeight: 'bold',
                fontSize: '1.25rem',
                color: '#7dbaff',
                textDecoration: 'none',
              }}
            >
              {m.title}
            </Link>

            {m.modder_username && (
              <p style={{ margin: '0.4rem 0', color: '#9bbcff' }}>
                By {m.modder_username}
              </p>
            )}

            {m.release_channel && (
              <span
                style={{
                  display: 'inline-block',
                  marginBottom: '0.5rem',
                  padding: '0.15rem 0.6rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  backgroundColor: '#2d4175',
                  color: '#cfe0ff',
                }}
              >
                {m.release_channel.toUpperCase()}
              </span>
            )}

            <p style={{ color: '#ccc', marginTop: '0.5rem' }}>
              {m.description?.slice(0, 160)}
              {m.description?.length > 160 && '…'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

