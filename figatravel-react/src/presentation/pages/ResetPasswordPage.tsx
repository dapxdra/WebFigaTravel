import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export function ResetPasswordPage() {
  const {
    isLoading,
    isPasswordRecovery,
    isAuthSubmitting,
    isAuthenticated,
    authError,
    authInfo,
    updatePassword,
  } = useAuth()

  const [nextPassword, setNextPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const passwordsDoNotMatch =
    nextPassword !== '' && confirmPassword !== '' && nextPassword !== confirmPassword

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (nextPassword.length < 6 || passwordsDoNotMatch) {
      return
    }

    await updatePassword(nextPassword)
    setNextPassword('')
    setConfirmPassword('')
  }

  if (isLoading) {
    return (
      <main>
        <section className="section page-hero auth-access-section">
          <h1>Preparing recovery...</h1>
          <p className="hero-copy">Please wait while we validate your reset session.</p>
        </section>
      </main>
    )
  }

  if (!isPasswordRecovery) {
    if (isAuthenticated) {
      return <Navigate replace to="/admin" />
    }

    return (
      <main>
        <section className="section page-hero auth-access-section">
          <p className="eyebrow">PASSWORD RECOVERY</p>
          <h1>Recovery session not found</h1>
          <p className="hero-copy">
            Open the latest password recovery email and use that link again.
          </p>
          <Link to="/admin" className="hero-cta">
            Back to admin login
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className="section page-hero auth-access-section">
        <p className="eyebrow">PASSWORD RECOVERY</p>
        <h1>Set a new password</h1>
        <p className="hero-copy">
          Create your new password to finish account recovery.
        </p>

        <form className="auth-local-form" onSubmit={(event) => void onSubmit(event)}>
          <label>
            New password
            <input
              type="password"
              value={nextPassword}
              onChange={(event) => setNextPassword(event.target.value)}
              minLength={6}
              required
            />
          </label>

          <label>
            Confirm password
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={6}
              required
            />
          </label>

          {passwordsDoNotMatch ? (
            <p className="error-text auth-error-inline">Passwords do not match.</p>
          ) : null}

          <button type="submit" className="hero-cta" disabled={isAuthSubmitting}>
            {isAuthSubmitting ? 'Updating password...' : 'Update password'}
          </button>
        </form>

        {authInfo ? <p className="success-text auth-error-inline">{authInfo}</p> : null}
        {authError ? <p className="error-text auth-error-inline">{authError}</p> : null}
      </section>
    </main>
  )
}
