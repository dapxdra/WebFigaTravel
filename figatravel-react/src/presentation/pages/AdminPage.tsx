import { useAdminDashboardViewModel } from '../hooks/useAdminDashboardViewModel'
import { usePageMeta } from '../hooks/usePageMeta'

export function AdminPage() {
  usePageMeta(
    'Admin Dashboard',
    'Manage featured travel packages and review incoming leads from the website.',
  )

  const {
    packages,
    leads,
    priceDrafts,
    loading,
    error,
    updatingId,
    toggleFeatured,
    setPriceDraft,
    savePrice,
    reload,
  } = useAdminDashboardViewModel()

  return (
    <main className="admin-page">
      <header className="section page-hero">
        <p className="eyebrow">ADMIN PANEL</p>
        <h1>Basic package and lead management</h1>
        <p className="hero-copy">
          Initial operations panel to validate featured content and requests.
        </p>
      </header>

      <section className="section" aria-labelledby="admin-packages-title">
        <div className="section-head admin-head">
          <div>
            <h2 id="admin-packages-title">Packages</h2>
            <p>Enable or disable whether a package appears as featured.</p>
          </div>
          <button type="button" className="hero-cta admin-refresh" onClick={() => void reload()}>
            Refresh
          </button>
        </div>

        {loading ? <p>Loading dashboard...</p> : null}
        {error ? <p className="error-text">{error}</p> : null}

        <div className="admin-grid">
          {packages.map((item) => (
            <article key={item.id} className="priority-card">
              <h3>{item.title}</h3>
              <p>{item.destination}</p>
              <p>
                {item.currency} {item.price.toFixed(2)}
              </p>

              <form
                className="admin-price-form"
                onSubmit={(event) => {
                  event.preventDefault()
                  void savePrice(item.id)
                }}
              >
                <label>
                  Price
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={priceDrafts[item.id] ?? ''}
                    onChange={(event) => setPriceDraft(item.id, event.target.value)}
                    disabled={updatingId === item.id}
                  />
                </label>
                <button
                  type="submit"
                  className="admin-save-price"
                  disabled={updatingId === item.id}
                >
                  {updatingId === item.id ? 'Saving...' : 'Save price'}
                </button>
              </form>

              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={item.isFeatured}
                  disabled={updatingId === item.id}
                  onChange={(event) =>
                    void toggleFeatured(item.id, event.target.checked)
                  }
                />
                Featured
              </label>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="admin-leads-title">
        <div className="section-head">
          <h2 id="admin-leads-title">Recent leads</h2>
          <p>Latest requests submitted from the web form.</p>
        </div>

        <div className="lead-table-wrap">
          <table className="lead-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Travelers</th>
                <th>Package</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.createdAt.slice(0, 10)}</td>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.travelers}</td>
                  <td>{lead.packageId}</td>
                </tr>
              ))}
              {!loading && leads.length === 0 ? (
                <tr>
                  <td colSpan={5}>No leads available.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
