// src/supabase/authFunctions.ts
import { supabase } from './client' // Ensure you have a supabase client set up

// Function to login a user
export async function login(username: string, password: string) {
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
export async function signup(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    throw new Error(error.message)
  }

  // Save the user to localStorage
  localStorage.setItem('user', JSON.stringify(data.user))
  return data.user
}

// Additional authentication functions can be added here

