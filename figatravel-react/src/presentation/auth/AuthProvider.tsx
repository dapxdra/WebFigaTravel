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
import type { SignUpWithPasswordInput } from './authContext'

function normalizeAuthError(error: string | undefined, fallback: string) {
  const message = (error ?? '').toLowerCase()

  if (message.includes('invalid login credentials')) {
    return 'Invalid credentials. Check your email and password.'
  }

  if (message.includes('email not confirmed')) {
    return 'Email not confirmed. Verify your email and try again.'
  }

  if (message.includes('already registered')) {
    return 'This email is already registered. Try sign in instead.'
  }

  if (message.includes('password should be at least')) {
    return 'Password is too short. Use at least 6 characters.'
  }

  return fallback
}

function hasRecoveryTypeInUrl() {
  const search = window.location.search.toLowerCase()
  const hash = window.location.hash.toLowerCase()
  return search.includes('type=recovery') || hash.includes('type=recovery')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false)
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [authInfo, setAuthInfo] = useState<string | null>(null)

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
      setIsPasswordRecovery(hasRecoveryTypeInUrl())
      setIsLoading(false)
    }

    void setup()

    const subscription = supabaseClient?.auth.onAuthStateChange(
      (event, nextSession) => {
        if (event === 'PASSWORD_RECOVERY') {
          setIsPasswordRecovery(true)
          setAuthInfo('Set your new password to finish recovery.')
        }

        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          setIsPasswordRecovery(hasRecoveryTypeInUrl())
        }

        if (event === 'SIGNED_OUT') {
          setIsPasswordRecovery(false)
        }

        setSession(nextSession)
      },
    )

    return () => {
      mounted = false
      subscription?.data.subscription.unsubscribe()
    }
  }, [])

  const clearAuthMessages = () => {
    setAuthError(null)
    setAuthInfo(null)
  }

  const signInWithPassword = async (email: string, password: string) => {
    if (!supabaseClient) {
      setAuthError('Configure Supabase to enable authentication.')
      return
    }

    setIsAuthSubmitting(true)
    clearAuthMessages()

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    })

    setIsAuthSubmitting(false)

    if (error) {
      setAuthError(normalizeAuthError(error.message, 'Unable to sign in with email and password.'))
      return
    }

    setAuthInfo('Logged in successfully.')
  }

  const signUpWithPassword = async ({
    email,
    password,
    fullName,
    phone,
  }: SignUpWithPasswordInput) => {
    if (!supabaseClient) {
      setAuthError('Configure Supabase to enable authentication.')
      return
    }

    setIsAuthSubmitting(true)
    clearAuthMessages()

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
        },
        emailRedirectTo: window.location.origin,
      },
    })

    setIsAuthSubmitting(false)

    if (error) {
      setAuthError(normalizeAuthError(error.message, 'Unable to create an account.'))
      return
    }

    if (!data.session) {
      setAuthInfo('Account created. Check your email to verify and then sign in.')
      return
    }

    setAuthInfo('Account created and logged in successfully.')
  }

  const sendPasswordReset = async (email: string) => {
    if (!supabaseClient) {
      setAuthError('Configure Supabase to enable authentication.')
      return
    }

    setIsAuthSubmitting(true)
    clearAuthMessages()

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    setIsAuthSubmitting(false)

    if (error) {
      setAuthError(
        normalizeAuthError(error.message, 'Unable to send password reset email.'),
      )
      return
    }

    setAuthInfo('Password reset email sent. Check your inbox and spam folder.')
  }

  const updatePassword = async (nextPassword: string) => {
    if (!supabaseClient) {
      setAuthError('Configure Supabase to enable authentication.')
      return
    }

    setIsAuthSubmitting(true)
    clearAuthMessages()

    const { error } = await supabaseClient.auth.updateUser({
      password: nextPassword,
    })

    setIsAuthSubmitting(false)

    if (error) {
      setAuthError(normalizeAuthError(error.message, 'Unable to update password.'))
      return
    }

    setIsPasswordRecovery(false)
    setAuthInfo('Password updated successfully. You can now continue to admin.')
    window.history.replaceState({}, document.title, window.location.pathname)
  }

  const signInWithGoogle = async () => {
    if (!supabaseClient) {
      setAuthError(
        'Configure Supabase to enable Google authentication.',
      )
      return
    }

    setIsAuthSubmitting(true)
    clearAuthMessages()

    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.href,
      },
    })

    setIsAuthSubmitting(false)

    if (error) {
      const isProviderDisabled =
        error.message.toLowerCase().includes('unsupported provider') ||
        error.message.toLowerCase().includes('provider is not enabled')

      setAuthError(
        isProviderDisabled
          ? 'Google login is disabled in Supabase. Enable Google provider in Authentication > Providers and configure Client ID/Secret.'
          : 'Unable to sign in with Google.',
      )
    }
  }

  const signOut = async () => {
    if (!supabaseClient) {
      return
    }

    clearAuthMessages()

    const { error } = await supabaseClient.auth.signOut()

    if (error) {
      setAuthError('Unable to sign out.')
    }
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isLoading,
      isAuthSubmitting,
      isPasswordRecovery,
      isAuthenticated: Boolean(session),
      authError,
      authInfo,
      signInWithPassword,
      signUpWithPassword,
      sendPasswordReset,
      updatePassword,
      signInWithGoogle,
      signOut,
      clearAuthMessages,
    }),
    [
      session,
      isLoading,
      isAuthSubmitting,
      isPasswordRecovery,
      authError,
      authInfo,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
