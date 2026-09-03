import { useEffect, useRef, useState } from 'react'
import type { Reservation, TilopaySdkSession } from '../../../domain/entities/Reservation'
import type { TilopayMethod, TilopaySavedCard } from '../../lib/tilopaySdk'
import { loadTilopaySdk } from '../../lib/tilopaySdk'

interface TilopayCheckoutProps {
  reservation: Reservation
  sdkSession: TilopaySdkSession | null
  tokenLoading: boolean
  tokenError: string | null
  fetchSdkToken: (orderNumber: string) => Promise<TilopaySdkSession | null>
}

function splitName(fullName: string): { first: string; last: string } {
  const parts = fullName.trim().split(/\s+/)
  const first = parts[0] ?? fullName
  const last = parts.slice(1).join(' ') || first
  return { first, last }
}

type InitState = 'idle' | 'loading' | 'ready' | 'error'

export function TilopayCheckout({
  reservation,
  sdkSession,
  tokenLoading,
  tokenError,
  fetchSdkToken,
}: TilopayCheckoutProps) {
  const requestedTokenRef = useRef(false)
  const [initState, setInitState] = useState<InitState>('idle')
  const [initError, setInitError] = useState<string | null>(null)
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState<string | null>(null)
  const [methods, setMethods] = useState<TilopayMethod[]>([])
  const [savedCards, setSavedCards] = useState<TilopaySavedCard[]>([])
  const [selectedMethod, setSelectedMethod] = useState('')

  // Request the SDK session token once the checkout step is shown.
  useEffect(() => {
    if (requestedTokenRef.current || sdkSession) {
      return
    }
    requestedTokenRef.current = true
    void fetchSdkToken(reservation.orderNumber)
  }, [fetchSdkToken, reservation.orderNumber, sdkSession])

  // Once we have a token, load the SDK script and initialize the card form.
  useEffect(() => {
    if (!sdkSession) {
      return
    }

    let cancelled = false
    const { first, last } = splitName(reservation.fullName)

    const initialize = async () => {
      setInitState('loading')
      setInitError(null)

      try {
        const tilopay = await loadTilopaySdk()
        // Tilopay.Init() is the one-time-payment method: it charges
        // `amount` against `orderNumber` and captures immediately
        // (capture: '1'). Tilopay.InitTokenize() is a different, unrelated
        // flow for saving a card for later and must not be used here.
        const response = await tilopay.Init({
          token: sdkSession.accessToken,
          key: sdkSession.apiKey,
          amount: reservation.amount.toFixed(2),
          currency: reservation.currency,
          orderNumber: reservation.orderNumber,
          redirect: `${window.location.origin}/pago/respuesta`,
          capture: '1',
          language: 'es',
          billToFirstName: first,
          billToLastName: last,
          billToAddress: 'N/A',
          billToCity: 'San Jose',
          billToState: 'CR-SJ',
          billToZipPostCode: '10101',
          billToCountry: 'CR',
          billToTelephone: reservation.phone ?? '00000000',
          billToEmail: reservation.email,
        })

        // Tilopay resolves (does not reject) with an empty methods list and a
        // message when the merchant/session can't be initialized.
        if (response.methods.length === 0) {
          throw new Error(response.message || 'Tilopay did not return any payment methods.')
        }

        if (!cancelled) {
          setMethods(response.methods)
          setSavedCards(response.cards)
          setSelectedMethod(response.methods[0].id)
          setInitState('ready')
        }
      } catch (error) {
        if (!cancelled) {
          setInitState('error')
          setInitError(
            error instanceof Error ? error.message : 'Unable to load the payment form.',
          )
        }
      }
    }

    void initialize()

    return () => {
      cancelled = true
    }
  }, [reservation, sdkSession])

  const handlePay = async () => {
    if (!window.Tilopay) {
      setPayError('Payment form is not ready yet.')
      return
    }

    setPaying(true)
    setPayError(null)

    try {
      // On approval Tilopay navigates the browser to the `redirect` URL
      // (including any 3DS step); this only resolves for local failures.
      const result = await window.Tilopay.startPayment()
      if (result?.code && result.code !== '1') {
        setPayError(result.message ?? 'Payment was rejected. Please try again.')
      }
    } catch (error) {
      setPayError(error instanceof Error ? error.message : 'Payment was rejected. Please try again.')
    } finally {
      setPaying(false)
    }
  }

  return (
    <section className="section payment-checkout" aria-labelledby="payment-checkout-title">
      <div className="section-head">
        <h2 id="payment-checkout-title">Secure payment</h2>
        <p>
          Order #{reservation.orderNumber} - {reservation.currency} {reservation.amount.toFixed(2)}
        </p>
      </div>

      <div className="tilopay-status-stack">
        {tokenLoading ? <p className="tilopay-status">Starting secure session...</p> : null}
        {tokenError ? <p className="error-text">{tokenError}</p> : null}
        {initState === 'loading' ? <p className="tilopay-status">Loading payment form...</p> : null}
        {initError ? <p className="error-text">{initError}</p> : null}
        {payError ? <p className="error-text">{payError}</p> : null}
      </div>

      <div className="payFormTilopay tilopay-card-form">
        <label className="tilopay-field">
          <span className="tilopay-field-label">Payment method</span>
          <select
            name="tlpy_payment_method"
            id="tlpy_payment_method"
            className="tilopay-select"
            value={selectedMethod}
            disabled={methods.length <= 1}
            onChange={(event) => setSelectedMethod(event.target.value)}
          >
            <option value="">Select payment method</option>
            {methods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </label>

        {/* Only "card" methods are enabled for this merchant today; the
            sinpemovil form (#tlpy_phone_number_div) stays hidden until that
            payment method is offered. */}
        <div id="tlpy_card_payment_div" className="tilopay-card-panel">
          {savedCards.length > 0 ? (
            <label className="tilopay-field">
              <span className="tilopay-field-label">Saved cards</span>
              <select name="tlpy_saved_cards" id="tlpy_saved_cards" className="tilopay-select">
                <option value="">Select card</option>
                {savedCards.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.name}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <select name="tlpy_saved_cards" id="tlpy_saved_cards" style={{ display: 'none' }} />
          )}

          <label className="tilopay-field">
            <span className="tilopay-field-label">Card number</span>
            <span className="tilopay-input-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <rect x="2" y="5" width="20" height="14" rx="2.5" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              <input
                type="text"
                id="tlpy_cc_number"
                name="tlpy_cc_number"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="0000 0000 0000 0000"
              />
            </span>
          </label>

          <div className="tilopay-row-2">
            <label className="tilopay-field">
              <span className="tilopay-field-label">Expiration date</span>
              <input
                type="text"
                id="tlpy_cc_expiration_date"
                name="tlpy_cc_expiration_date"
                inputMode="numeric"
                placeholder="MM/YY"
                maxLength={5}
                autoComplete="cc-exp"
              />
            </label>

            <label className="tilopay-field">
              <span className="tilopay-field-label">CVV</span>
              <input
                type="text"
                id="tlpy_cvv"
                name="tlpy_cvv"
                inputMode="numeric"
                placeholder="123"
                maxLength={4}
                autoComplete="cc-csc"
              />
            </label>
          </div>
        </div>

        <div id="tlpy_phone_number_div" style={{ display: 'none' }}>
          <label className="tilopay-field">
            <span className="tilopay-field-label">Phone number</span>
            <input type="text" id="tlpy_phone_number" name="tlpy_phone_number" />
          </label>
        </div>
      </div>

      {/* Required by Tilopay's SDK: hosts the 3DS challenge when a payment
          method requires it. */}
      <div id="responseTilopay" />

      <button
        type="button"
        className="tilopay-pay-button"
        onClick={() => void handlePay()}
        disabled={initState !== 'ready' || paying}
      >
        {paying ? 'Processing...' : `Pay ${reservation.currency} ${reservation.amount.toFixed(2)}`}
      </button>

      <p className="tilopay-security-note">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        Your card details are encrypted and processed securely by Tilopay.
      </p>
    </section>
  )
}
