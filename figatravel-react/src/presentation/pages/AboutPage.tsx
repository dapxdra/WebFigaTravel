import { priorities } from '../data/siteContent'

export function AboutPage() {
  return (
    <main>
      <header className="section page-hero">
        <p className="eyebrow">ABOUT US</p>
        <h1>Conecta destinos, personas y experiencias</h1>
        <p className="hero-copy">
          Somos una agencia enfocada en traslados y experiencias premium en
          Costa Rica con operacion segura y acompanamiento continuo.
        </p>
      </header>

      <section className="section" aria-labelledby="about-mission-title">
        <div className="section-head">
          <h2 id="about-mission-title">Nuestra mision</h2>
          <p>
            Crear viajes confiables con puntualidad, trato humano y excelencia
            en cada detalle logistica.
          </p>
        </div>

        <div className="priority-grid">
          {priorities.map((priority) => (
            <article key={priority.title} className="priority-card">
              <h3>{priority.title}</h3>
              <p>{priority.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
