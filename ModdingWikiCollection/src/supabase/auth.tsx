// src/supabase/auth.tsx
import { createContext, useContext, useState, ReactNode } from 'react'
import { supabase } from './client' // Ensure you have a supabase client setup

// This function reads the logged-in user from localStorage
export function getUser() {
  const raw = localStorage.getItem('user')
  return raw ? JSON.parse(raw) : null
}

// Define the shape of the context
interface AuthContextType {
  user: any | null
  setUser: (user: any | null) => void
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null)

// AuthProvider component
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(getUser())

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the AuthContext
function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

// Function to login a user
async function login(username: string, password: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !data) {
    throw new Error('Invalid username or password')
  }

  // Save the user to localStorage
  localStorage.setItem('user', JSON.stringify(data))
  return data
}

// Function to signup a user
async function signup(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    throw new Error(error.message)
  }

  // Save the user to localStorage
  localStorage.setItem('user', JSON.stringify(data.user))
  return data.user
}

// Export all the components and functions together in one block
export { AuthProvider, useAuth, login, signup }

