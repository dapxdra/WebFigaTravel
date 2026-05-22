import { useAdminDashboardViewModel } from '../hooks/useAdminDashboardViewModel'

export function AdminPage() {
  const {
    packages,
    leads,
    loading,
    error,
    updatingId,
    toggleFeatured,
    reload,
  } = useAdminDashboardViewModel()

  return (
    <main>
      <header className="section page-hero">
        <p className="eyebrow">ADMIN PANEL</p>
        <h1>Gestion basica de paquetes y leads</h1>
        <p className="hero-copy">
          Panel operativo inicial para validar contenido destacado y solicitudes.
        </p>
      </header>

      <section className="section" aria-labelledby="admin-packages-title">
        <div className="section-head admin-head">
          <div>
            <h2 id="admin-packages-title">Paquetes</h2>
            <p>Activa o desactiva si un paquete aparece como destacado.</p>
          </div>
          <button type="button" className="hero-cta admin-refresh" onClick={() => void reload()}>
            Refrescar
          </button>
        </div>

        {loading ? <p>Cargando panel...</p> : null}
        {error ? <p className="error-text">{error}</p> : null}

        <div className="admin-grid">
          {packages.map((item) => (
            <article key={item.id} className="priority-card">
              <h3>{item.title}</h3>
              <p>{item.destination}</p>
              <p>
                {item.currency} {item.price.toFixed(2)}
              </p>
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={item.isFeatured}
                  disabled={updatingId === item.id}
                  onChange={(event) =>
                    void toggleFeatured(item.id, event.target.checked)
                  }
                />
                Destacado
              </label>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="admin-leads-title">
        <div className="section-head">
          <h2 id="admin-leads-title">Leads recientes</h2>
          <p>Ultimas solicitudes enviadas desde el formulario web.</p>
        </div>

        <div className="lead-table-wrap">
          <table className="lead-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Viajeros</th>
                <th>Paquete</th>
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
                  <td colSpan={5}>No hay leads disponibles.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
