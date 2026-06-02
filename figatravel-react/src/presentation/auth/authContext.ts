import { createContext } from 'react'
import type { Session } from '@supabase/supabase-js'

export interface AuthContextValue {
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  authError: string | null
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
