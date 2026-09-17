import { usePageMeta } from '../hooks/usePageMeta'

const LAST_UPDATED = 'September 17, 2026'

export function PrivacyPolicyPage() {
  usePageMeta(
    'Privacy Policy',
    'How Figa Travel Costa Rica collects, uses, and protects your personal data when you book a transfer or contact us.',
  )

  return (
    <main className="info-page legal-page" data-cy="privacy-policy-page">
      <header className="section page-hero">
        <p className="eyebrow">LEGAL</p>
        <h1>Privacy Policy</h1>
        <p className="hero-copy">Last updated: {LAST_UPDATED}</p>
      </header>

      <section className="section legal-content" aria-labelledby="privacy-intro-title">
        <h2 id="privacy-intro-title">1. Introduction</h2>
        <p>
          Figa Travel Costa Rica ("Figa Travel", "we", "us") provides private transportation
          services across Costa Rica. This Privacy Policy explains what personal data we collect
          through figatravelcr.com, how we use it, and the choices you have. By using this site
          or booking a transfer with us, you agree to the practices described here.
        </p>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-data-title">
        <h2 id="privacy-data-title">2. Information we collect</h2>
        <ul>
          <li>
            <strong>Contact and booking details</strong> you submit through the contact form or the
            Book Online form: full name, email, phone number, pickup and drop-off locations, travel
            date and time, number of travelers, and any notes you add.
          </li>
          <li>
            <strong>Payment data</strong>: card payments are processed directly by our payment
            provider, Tilopay. We never see or store your full card number, expiry date, or CVV —
            those details are entered on Tilopay's secure payment form and handled under their own
            security standards.
          </li>
          <li>
            <strong>Account data</strong>, only if you create an admin account: your email and
            authentication metadata, managed by our database provider, Supabase.
          </li>
          <li>
            <strong>Technical data</strong> such as browser type and general usage of the site,
            which helps us keep the service reliable and secure.
          </li>
        </ul>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-use-title">
        <h2 id="privacy-use-title">3. How we use your information</h2>
        <ul>
          <li>To create and manage your reservation and confirm payment.</li>
          <li>To contact you about your trip: pickup confirmation, flight tracking, and schedule changes.</li>
          <li>To respond to messages sent through the contact form.</li>
          <li>To improve our routes, vehicles, and customer service.</li>
          <li>To meet legal, tax, and accounting obligations in Costa Rica.</li>
        </ul>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-sharing-title">
        <h2 id="privacy-sharing-title">4. Sharing your information</h2>
        <p>We do not sell your personal data. We share it only with:</p>
        <ul>
          <li>
            <strong>Tilopay</strong>, to process your payment securely.
          </li>
          <li>
            <strong>Supabase</strong>, our database and authentication provider, which stores
            reservation and lead records on our behalf.
          </li>
          <li>Authorities, when required by law.</li>
        </ul>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-cookies-title">
        <h2 id="privacy-cookies-title">5. Cookies and local storage</h2>
        <p>
          We use essential browser storage to keep you signed in to the admin panel and to
          remember basic site preferences. We do not use third-party advertising trackers.
        </p>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-retention-title">
        <h2 id="privacy-retention-title">6. Data retention</h2>
        <p>
          We keep reservation and contact records for as long as needed to provide our services and
          to meet accounting and legal obligations, after which we delete or anonymize the data.
        </p>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-rights-title">
        <h2 id="privacy-rights-title">7. Your rights</h2>
        <p>
          You may ask us to access, correct, or delete your personal data at any time by writing to{' '}
          <a href="mailto:infofigatravel@gmail.com">infofigatravel@gmail.com</a>. We will respond
          within a reasonable time.
        </p>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-children-title">
        <h2 id="privacy-children-title">8. Children's privacy</h2>
        <p>
          Our services are intended for adults booking travel. We do not knowingly collect personal
          data directly from children.
        </p>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-contact-title">
        <h2 id="privacy-contact-title">9. Contact us</h2>
        <p>
          Questions about this policy can be sent to{' '}
          <a href="mailto:infofigatravel@gmail.com">infofigatravel@gmail.com</a> or{' '}
          <a href="tel:+50671392747">+506 7139 2747</a>.
        </p>
      </section>
    </main>
  )
}
