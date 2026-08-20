import { useEffect, useRef, useState } from 'react'
import type { Reservation, TilopaySdkSession } from '../../../domain/entities/Reservation'
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
        await tilopay.InitTokenize({
          token: sdkSession.accessToken,
          key: sdkSession.apiKey,
          amount: reservation.amount.toFixed(2),
          currency: reservation.currency,
          orderNumber: reservation.orderNumber,
          redirect: `${window.location.origin}/pago/respuesta`,
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

        if (!cancelled) {
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

      {tokenLoading ? <p>Starting secure session...</p> : null}
      {tokenError ? <p className="error-text">{tokenError}</p> : null}
      {initState === 'loading' ? <p>Loading payment form...</p> : null}
      {initError ? <p className="error-text">{initError}</p> : null}
      {payError ? <p className="error-text">{payError}</p> : null}

      <div className="payFormTilopay">
        <label>
          Payment Method
          <select name="tlpy_payment_method" id="tlpy_payment_method">
            <option value="">Select payment method</option>
          </select>
        </label>

        <div id="tlpy_card_payment_div">
          <label>
            Saved cards
            <select name="tlpy_saved_cards" id="tlpy_saved_cards">
              <option value="">Select card</option>
            </select>
          </label>

          <label>
            Card number
            <input type="text" id="tlpy_cc_number" name="tlpy_cc_number" autoComplete="cc-number" />
          </label>

          <label>
            Expiration date
            <input
              type="text"
              id="tlpy_cc_expiration_date"
              name="tlpy_cc_expiration_date"
              placeholder="MM/YY"
              autoComplete="cc-exp"
            />
          </label>

          <label>
            CVV
            <input type="text" id="tlpy_cvv" name="tlpy_cvv" autoComplete="cc-csc" />
          </label>
        </div>

        <div id="tlpy_phone_number_div" style={{ display: 'none' }}>
          <label>
            Phone number
            <input type="text" id="tlpy_phone_number" name="tlpy_phone_number" />
          </label>
        </div>
      </div>

      <div id="result" />

      <button type="button" onClick={() => void handlePay()} disabled={initState !== 'ready' || paying}>
        {paying ? 'Processing...' : 'Pay now'}
      </button>
    </section>
  )
}
