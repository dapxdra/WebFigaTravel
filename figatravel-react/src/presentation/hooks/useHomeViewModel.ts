import { useCallback, useEffect, useMemo, useState } from 'react'
import { buildContainer } from '../../application/bootstrap/container'
import type { LeadRequest } from '../../domain/entities/LeadRequest'
import type { TravelPackage } from '../../domain/entities/TravelPackage'

interface SubmitState {
  loading: boolean
  success: boolean
  error: string | null
}

export function useHomeViewModel() {
  const container = useMemo(() => buildContainer(), [])

  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [submitState, setSubmitState] = useState<SubmitState>({
    loading: false,
    success: false,
    error: null,
  })

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setLoading(true)
      setError(null)

      try {
        const featured = await container.getFeaturedPackages.execute()
        if (mounted) {
          setPackages(featured)
        }
      } catch (loadError) {
        if (mounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'Error inesperado al cargar paquetes.',
          )
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      mounted = false
    }
  }, [container])

  const submitLead = useCallback(
    async (leadRequest: LeadRequest) => {
      setSubmitState({ loading: true, success: false, error: null })

      try {
        await container.submitLead.execute(leadRequest)
        setSubmitState({ loading: false, success: true, error: null })
      } catch (submitError) {
        setSubmitState({
          loading: false,
          success: false,
          error:
            submitError instanceof Error
              ? submitError.message
              : 'No se pudo enviar la solicitud.',
        })
      }
    },
    [container],
  )

  return {
    packages,
    loading,
    error,
    submitLead,
    submitState,
  }
}
