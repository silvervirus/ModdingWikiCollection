// src/pages/SupportPage.tsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase/client'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { useAuth } from '../supabase/authProvider'

export default function SupportPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [doc, setDoc] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    supabase
      .from('support_docs')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) setDoc(data)
      })
  }, [id])

  if (!doc) return <p style={{ padding: '1rem' }}>Loading...</p>

  // Can edit if admin or the user who submitted it
  const canEdit = user && (user.role === 'admin' || user.username === doc.submitted_by)

  return (
    <div style={{ padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2>{doc.title}</h2>
      <p style={{ color: '#888' }}>Submitted by {doc.submitted_by}</p>

      {canEdit && (
        <Link
          to={`/support/${doc.id}/edit`}
          style={{
            display: 'inline-block',
            marginBottom: '1rem',
            color: '#ffb86c',
            textDecoration: 'underline'
          }}
        >
          Edit this doc
        </Link>
      )}

      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          borderRadius: '8px',
          backgroundColor: '#1b1b2f',
          color: '#eee'
        }}
      >
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {doc.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

