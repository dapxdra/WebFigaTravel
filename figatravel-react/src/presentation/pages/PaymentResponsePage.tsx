import { useSearchParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { usePaymentVerification } from '../hooks/usePaymentVerification'

export function PaymentResponsePage() {
  usePageMeta(
    'Payment result',
    'Check the result of your Tilopay payment.',
  )

  const [searchParams] = useSearchParams()

  // These come straight from the browser redirect and are only used to know
  // which order to look up; the actual status is never trusted from here.
  const orderNumber = searchParams.get('order')
  const transactionId = searchParams.get('tilopay-transaction') ?? undefined

  const { loading, result, error } = usePaymentVerification(orderNumber, transactionId)

  return (
    <main className="payment-response-page">
      <header className="book-header">
        <h1>Payment result</h1>
      </header>

      {loading ? <p className="tilopay-status">Verifying your payment with Tilopay...</p> : null}

      {error ? (
        <div className="payment-result payment-result-error">
          <p className="error-text">{error}</p>
        </div>
      ) : null}

      {result?.status === 'paid' ? (
        <div className="payment-result payment-result-success">
          <h2>Payment approved</h2>
          <p>{result.message || 'Your reservation has been confirmed.'}</p>
        </div>
      ) : null}

      {result?.status === 'failed' ? (
        <div className="payment-result payment-result-failed">
          <h2>Payment not approved</h2>
          <p>{result.message || 'The payment was declined. Please try again.'}</p>
        </div>
      ) : null}
    </main>
  )
}
