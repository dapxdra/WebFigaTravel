import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

const LAST_UPDATED = 'September 17, 2026'

export function TermsConditionsPage() {
  usePageMeta(
    'Terms and Conditions',
    'Booking, payment, and cancellation terms for private transportation services with Figa Travel Costa Rica.',
  )

  return (
    <main className="info-page legal-page" data-cy="terms-conditions-page">
      <header className="section page-hero">
        <p className="eyebrow">LEGAL</p>
        <h1>Terms and Conditions</h1>
        <p className="hero-copy">Last updated: {LAST_UPDATED}</p>
      </header>

      <section className="section legal-content" aria-labelledby="terms-intro-title">
        <h2 id="terms-intro-title">1. Acceptance of these terms</h2>
        <p>
          These Terms and Conditions govern the use of figatravelcr.com and any private
          transportation service booked with Figa Travel Costa Rica. By submitting a reservation
          or using our contact form, you accept these terms.
        </p>
      </section>

      <section className="section legal-content" aria-labelledby="terms-booking-title">
        <h2 id="terms-booking-title">2. Bookings</h2>
        <p>
          A reservation is created when you submit the Book Online form with your route, date,
          pickup time, and traveler details. A booking is confirmed once payment is successfully
          processed. Please double-check your travel date, pickup location, and traveler count
          before confirming payment.
        </p>
      </section>

      <section className="section legal-content" aria-labelledby="terms-pricing-title">
        <h2 id="terms-pricing-title">3. Pricing and payment</h2>
        <p>
          The price shown at checkout is the total price for your route, door to door, including
          tolls and fuel. Payments are processed securely through Tilopay; Figa Travel does not
          store your card details. Prices are listed in the currency shown on the booking form.
        </p>
      </section>

      <section className="section legal-content" aria-labelledby="terms-changes-title">
        <h2 id="terms-changes-title">4. Changes and cancellations</h2>
        <p>
          To change or cancel a confirmed booking, contact us as soon as possible by WhatsApp,
          phone, or email with your booking details. We will do our best to accommodate changes
          when availability allows, but changes made with little notice before pickup time may not
          always be possible.
        </p>
      </section>

      <section className="section legal-content" aria-labelledby="terms-service-title">
        <h2 id="terms-service-title">5. Service delivery</h2>
        <ul>
          <li>Airport pickups include flight tracking and complimentary wait time as described on our site.</li>
          <li>Drivers are licensed and authorized to operate tourism transportation in Costa Rica.</li>
          <li>
            Travel times shown on the site are estimates; actual duration can vary with weather,
            road conditions, or traffic.
          </li>
          <li>
            You are responsible for providing an accurate pickup location and being ready at the
            agreed pickup time.
          </li>
        </ul>
      </section>

      <section className="section legal-content" aria-labelledby="terms-liability-title">
        <h2 id="terms-liability-title">6. Liability</h2>
        <p>
          Our vehicles carry commercial passenger insurance. Figa Travel is not liable for delays
          or changes caused by events outside our reasonable control, such as extreme weather,
          road closures, flight delays, or government restrictions. Passengers are responsible for
          their personal belongings during the trip.
        </p>
      </section>

      <section className="section legal-content" aria-labelledby="terms-conduct-title">
        <h2 id="terms-conduct-title">7. Passenger conduct</h2>
        <p>
          We may decline or end a trip if a passenger's conduct endangers the driver, other
          passengers, or the vehicle.
        </p>
      </section>

      <section className="section legal-content" aria-labelledby="terms-law-title">
        <h2 id="terms-law-title">8. Governing law</h2>
        <p>
          These terms are governed by the laws of Costa Rica. Any dispute will be resolved under
          Costa Rican jurisdiction.
        </p>
      </section>

      <section className="section legal-content" aria-labelledby="terms-contact-title">
        <h2 id="terms-contact-title">9. Contact us</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <a href="mailto:infofigatravel@gmail.com">infofigatravel@gmail.com</a> or{' '}
          <a href="tel:+50671392747">+506 7139 2747</a>. See also our{' '}
          <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>
      </section>
    </main>
  )
}
