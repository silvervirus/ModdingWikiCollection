// src/supabase/authProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { supabase } from './client'

export interface User {
  id: string
  username: string
  role: 'user' | 'modder' | 'admin'
  photo_url?: string
  about?: string
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  signup: (username: string, password: string, role?: 'user' | 'modder' | 'admin', photo_url?: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const fetchProfile = async (username: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('username', username).single()
    if (data) {
      setUser({
        id: data.id,
        username: data.username,
        role: data.role,
        photo_url: data.photo_url,
        about: data.about,
      })
    }
  }

  const login = async (username: string, password: string) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('username', username).single()
    if (!data) throw new Error('User not found')
    if (data.password !== password) throw new Error('Incorrect password') // hash in production!
    await fetchProfile(username)
  }

  const signup = async (
    username: string,
    password: string,
    role: 'user' | 'modder' | 'admin' = 'user',
    photo_url?: string
  ) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert({ username, password, role, photo_url, about: '' })
      .select('*')
      .single()
    if (error) throw error
    await fetchProfile(username)
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

