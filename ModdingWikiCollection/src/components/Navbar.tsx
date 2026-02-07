// src/components/Navbar.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../supabase/authProvider'

export default function Navbar() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  const linkStyle: React.CSSProperties = {
    color: '#7dbaff',
    textDecoration: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '8px',
    backgroundColor: '#1f2a4d',
  }

  return (
    <nav
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem 2rem',
        backgroundColor: '#1b1b2f',
        color: '#eee',
        alignItems: 'center',
      }}
    >
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <Link to="/support" style={linkStyle}>
        Support
      </Link>

      {user ? (
        <>
          <Link to={`/profile/${user.username}`} style={linkStyle}>
            Profile
          </Link>
          <Link to="/modder" style={linkStyle}>
            Submit Mod
          </Link>
          {user.role === 'admin' && (
            <Link to="/admin" style={linkStyle}>
              Admin
            </Link>
          )}
          <button
            onClick={handleLogout}
            style={{
              marginLeft: 'auto',
              padding: '0.3rem 0.8rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#294172',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <Link to="/login" style={{ ...linkStyle, marginLeft: 'auto' }}>
          Login / Signup
        </Link>
      )}
    </nav>
  )
}

