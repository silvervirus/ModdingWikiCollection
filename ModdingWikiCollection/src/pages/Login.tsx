// src/pages/Login.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../supabase/authProvider'

export default function Login() {
  const { login, signup, user } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [role, setRole] = useState<'user' | 'modder'>('user')
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isSignup) {
        await signup(username, password, role, photoUrl)
      } else {
        await login(username, password)
      }
      // Redirect to profile after successful login/signup
      navigate(`/profile/${username}`)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    navigate(`/profile/${user.username}`)
    return null
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        {isSignup && (
          <>
            <input
              placeholder="Photo URL (optional)"
              value={photoUrl}
              onChange={e => setPhotoUrl(e.target.value)}
              style={{ width: '100%', padding: 8, marginBottom: 8 }}
            />
            <select value={role} onChange={e => setRole(e.target.value as 'user' | 'modder')} style={{ width: '100%', padding: 8, marginBottom: 8 }}>
              <option value="user">User</option>
              <option value="modder">Modder</option>
            </select>
          </>
        )}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 8, marginBottom: 8 }}>
          {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <p style={{ textAlign: 'center', marginTop: 8 }}>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={() => setIsSignup(!isSignup)} style={{ textDecoration: 'underline', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
          {isSignup ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </div>
  )
}

