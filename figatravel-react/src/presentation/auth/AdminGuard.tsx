import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const {
    isLoading,
    isAuthenticated,
    isAuthSubmitting,
    isPasswordRecovery,
    authError,
    authInfo,
    signInWithPassword,
    sendPasswordReset,
    clearAuthMessages,
  } = useAuth()
  const [mode, setMode] = useState<'signin' | 'forgot'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitLabel =
    mode === 'signin'
      ? isAuthSubmitting
        ? 'Signing in...'
        : 'Sign in'
      : isAuthSubmitting
        ? 'Sending email...'
        : 'Send reset email'

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (mode === 'signin') {
      await signInWithPassword(email.trim(), password)
      return
    }

    if (mode === 'forgot') {
      await sendPasswordReset(email.trim())
      return
    }
  }

  if (isLoading) {
    return (
      <main>
        <section className="section page-hero">
          <h1>Checking session...</h1>
          <p className="hero-copy">Please wait while we validate access.</p>
        </section>
      </main>
    )
  }

  if (isPasswordRecovery) {
    return <Navigate replace to="/auth/reset-password" />
  }

  if (!isAuthenticated) {
    return (
      <main>
        <section className="section page-hero auth-access-section">
          <p className="eyebrow">ADMIN ACCESS</p>
          <h1>Restricted access</h1>
          <p className="hero-copy">
            Sign in with your admin account.
          </p>

          <div className="auth-mode-switch" role="tablist" aria-label="Auth mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'signin'}
              className={mode === 'signin' ? 'auth-mode-button active' : 'auth-mode-button'}
              onClick={() => {
                setMode('signin')
                clearAuthMessages()
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'forgot'}
              className={mode === 'forgot' ? 'auth-mode-button active' : 'auth-mode-button'}
              onClick={() => {
                setMode('forgot')
                clearAuthMessages()
              }}
            >
              Forgot
            </button>
          </div>

          <form className="auth-local-form" onSubmit={(event) => void onSubmit(event)}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            {mode !== 'forgot' ? (
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={6}
                  required
                />
              </label>
            ) : null}

            {mode === 'forgot' ? (
              <p className="auth-form-note">
                We will send a password reset link to your email.
              </p>
            ) : null}

            <button type="submit" className="hero-cta" disabled={isAuthSubmitting}>
              {submitLabel}
            </button>
          </form>

          {authInfo ? <p className="success-text auth-error-inline">{authInfo}</p> : null}
          {authError ? <p className="error-text auth-error-inline">{authError}</p> : null}
        </section>
      </main>
    )
  }

  return <>{children}</>
}
