import { useCallback, useMemo, useState } from 'react'
import { buildContainer } from '../../application/bootstrap/container'
import type { ContactMessage } from '../../domain/entities/ContactMessage'

interface SubmitState {
  loading: boolean
  success: boolean
  error: string | null
}

// Thin view-model for the public Contact form: it only orchestrates the
// SendContactMessage use-case and exposes its async state to the component.
export function useContactFormViewModel() {
  const container = useMemo(() => buildContainer(), [])

  const [submitState, setSubmitState] = useState<SubmitState>({
    loading: false,
    success: false,
    error: null,
  })

  const submit = useCallback(
    async (message: ContactMessage): Promise<boolean> => {
      setSubmitState({ loading: true, success: false, error: null })

      try {
        await container.sendContactMessage.execute(message)
        setSubmitState({ loading: false, success: true, error: null })
        return true
      } catch (error) {
        setSubmitState({
          loading: false,
          success: false,
          error:
            error instanceof Error ? error.message : 'Unable to send your message.',
        })
        return false
      }
    },
    [container],
  )

  return { submit, submitState }
}
