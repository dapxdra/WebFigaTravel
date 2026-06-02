import { useAuth } from './useAuth'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated, authError, signInWithGoogle } = useAuth()

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

  if (!isAuthenticated) {
    return (
      <main>
        <section className="section page-hero">
          <p className="eyebrow">ADMIN ACCESS</p>
          <h1>Restricted access</h1>
          <p className="hero-copy">
            Sign in with Google to manage packages and leads.
          </p>
          <button type="button" className="hero-cta" onClick={() => void signInWithGoogle()}>
            Sign in with Google
          </button>
          {authError ? <p className="error-text auth-error-inline">{authError}</p> : null}
        </section>
      </main>
    )
  }

  return <>{children}</>
}
