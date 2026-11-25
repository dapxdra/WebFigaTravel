import { useSearchParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { usePaymentVerification } from '../hooks/usePaymentVerification'
import { useI18n } from '../i18n/useI18n'

export function PaymentResponsePage() {
  const { m } = useI18n()
  const t = m.paymentResponse

  usePageMeta(
    'Payment result',
    'Check the result of your Tilopay payment.',
    { noindex: true },
  )

  const [searchParams] = useSearchParams()

  // These come straight from the browser redirect and are only used to know
  // which order to look up; the actual status is never trusted from here.
  const orderNumber = searchParams.get('order')
  const transactionId = searchParams.get('tilopay-transaction') ?? undefined

  const { loading, result, error } = usePaymentVerification(orderNumber, transactionId)

  return (
    <main className="payment-response-page" data-cy="payment-response-page">
      <header className="book-header">
        <h1>{t.title}</h1>
      </header>

      {loading ? <p className="tilopay-status" data-cy="payment-verifying">{t.verifying}</p> : null}

      {error ? (
        <div className="payment-result payment-result-error" data-cy="payment-result-error">
          <p className="error-text">{error}</p>
        </div>
      ) : null}

      {result?.status === 'paid' ? (
        <div className="payment-result payment-result-success" data-cy="payment-result-paid">
          <h2>{t.approvedTitle}</h2>
          <p>{result.message || t.approvedText}</p>
        </div>
      ) : null}

      {result?.status === 'failed' ? (
        <div className="payment-result payment-result-failed" data-cy="payment-result-failed">
          <h2>{t.failedTitle}</h2>
          <p>{result.message || t.failedText}</p>
        </div>
      ) : null}
    </main>
  )
}
