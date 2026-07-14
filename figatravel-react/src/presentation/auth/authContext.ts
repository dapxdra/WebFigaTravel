import { createContext } from 'react'
import type { Session } from '@supabase/supabase-js'

export interface SignUpWithPasswordInput {
  email: string
  password: string
  fullName?: string
  phone?: string
}

export interface AuthContextValue {
  session: Session | null
  isLoading: boolean
  isAuthSubmitting: boolean
  isPasswordRecovery: boolean
  isAuthenticated: boolean
  authError: string | null
  authInfo: string | null
  signInWithPassword: (email: string, password: string) => Promise<void>
  signUpWithPassword: (input: SignUpWithPasswordInput) => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
  updatePassword: (nextPassword: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  clearAuthMessages: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
