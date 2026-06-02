import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabaseClient } from '../../infrastructure/supabase/supabaseClient'
import { AuthContext } from './authContext'
import type { AuthContextValue } from './authContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const setup = async () => {
      if (!supabaseClient) {
        if (mounted) {
          setSession(null)
          setIsLoading(false)
        }
        return
      }

      const { data, error } = await supabaseClient.auth.getSession()

      if (!mounted) {
        return
      }

      if (error) {
        setAuthError('Unable to get the current session.')
      }

      setSession(data.session)
      setIsLoading(false)
    }

    void setup()

    const subscription = supabaseClient?.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession)
      },
    )

    return () => {
      mounted = false
      subscription?.data.subscription.unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    if (!supabaseClient) {
      setAuthError(
        'Configure Supabase to enable Google authentication.',
      )
      return
    }

    setAuthError(null)

    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin`,
      },
    })

    if (error) {
      setAuthError('Unable to sign in with Google.')
    }
  }

  const signOut = async () => {
    if (!supabaseClient) {
      return
    }

    setAuthError(null)

    const { error } = await supabaseClient.auth.signOut()

    if (error) {
      setAuthError('Unable to sign out.')
    }
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isLoading,
      isAuthenticated: Boolean(session),
      authError,
      signInWithGoogle,
      signOut,
    }),
    [session, isLoading, authError],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
