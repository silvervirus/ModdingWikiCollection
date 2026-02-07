// src/components/ProtectedRoute.tsx
import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../supabase/authProvider'

interface ProtectedRouteProps {
  role: 'modder' | 'admin'
  children: ReactNode
}

export default function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const { user } = useAuth()

  // If no user is logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // If user is an admin, allow access
  if (user.role === 'admin') {
    return <>{children}</>
  }

  // If user’s role matches the required role, allow access
  if (user.role === role) {
    return <>{children}</>
  }

  // Otherwise, redirect to the home page
  return <Navigate to="/" replace />
}

