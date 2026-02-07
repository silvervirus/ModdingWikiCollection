// src/pages/ModEditPage.tsx
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../supabase/authProvider'
import ModEditForm from '../components/ModEditForm'

export default function ModEditPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()

  if (!user) return <p>You must be logged in.</p>
  if (!id) return <p>No mod specified.</p>

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#121212' }}>
      <h2>Edit Mod</h2>
      <ModEditForm
        modId={id}
        ownerId={user.id} // the check is inside the form anyway
        currentUserId={user.id}
        onUpdate={(updated) => {
          console.log('Updated mod:', updated)
        }}
      />
    </div>
  )
}

