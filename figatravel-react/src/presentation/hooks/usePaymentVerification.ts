import { useEffect, useMemo, useState } from 'react'
import { buildContainer } from '../../application/bootstrap/container'
import type { PaymentVerificationResult } from '../../domain/entities/Reservation'

interface VerificationState {
  loading: boolean
  result: PaymentVerificationResult | null
  error: string | null
}

// Calls verify-tilopay-payment so the paid/failed status always comes from a
// server-side check against Tilopay, never from the redirect's query params.
export function usePaymentVerification(orderNumber: string | null, transactionId?: string) {
  const container = useMemo(() => buildContainer(), [])
  const [state, setState] = useState<VerificationState>({
    loading: Boolean(orderNumber),
    result: null,
    error: null,
  })

  useEffect(() => {
    if (!orderNumber) {
      return
    }

    let mounted = true

    const verify = async () => {
      setState({ loading: true, result: null, error: null })

      try {
        const result = await container.verifyTilopayPayment.execute(orderNumber, transactionId)
        if (mounted) {
          setState({ loading: false, result, error: null })
        }
      } catch (error) {
        if (mounted) {
          setState({
            loading: false,
            result: null,
            error: error instanceof Error ? error.message : 'Unable to verify the payment.',
          })
        }
      }
    }

    void verify()

    return () => {
      mounted = false
    }
  }, [container, orderNumber, transactionId])

  if (!orderNumber) {
    return { loading: false, result: null, error: 'Missing order reference in the URL.' }
  }

  return state
}
