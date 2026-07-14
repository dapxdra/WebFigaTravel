import { useCallback, useEffect, useMemo, useState } from 'react'
import { buildContainer } from '../../application/bootstrap/container'
import type { AvailabilitySlot } from '../../domain/entities/AvailabilitySlot'
import type { LeadRequest } from '../../domain/entities/LeadRequest'
import type { TravelPackage } from '../../domain/entities/TravelPackage'

interface SubmitState {
  loading: boolean
  success: boolean
  error: string | null
}

export function useBookingFormViewModel() {
  const container = useMemo(() => buildContainer(), [])

  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [loadingPackages, setLoadingPackages] = useState(true)
  const [packagesError, setPackagesError] = useState<string | null>(null)

  const [availability, setAvailability] = useState<AvailabilitySlot[]>([])
  const [loadingAvailability, setLoadingAvailability] = useState(false)
  const [availabilityError, setAvailabilityError] = useState<string | null>(null)

  const [submitState, setSubmitState] = useState<SubmitState>({
    loading: false,
    success: false,
    error: null,
  })

  useEffect(() => {
    let mounted = true

    const loadPackages = async () => {
      setLoadingPackages(true)
      setPackagesError(null)

      try {
        const result = await container.getAllPackages.execute()
        if (mounted) {
          setPackages(result)
        }
      } catch (error) {
        if (mounted) {
          setPackagesError(
            error instanceof Error
              ? error.message
              : 'Unable to load packages.',
          )
        }
      } finally {
        if (mounted) {
          setLoadingPackages(false)
        }
      }
    }

    void loadPackages()

    return () => {
      mounted = false
    }
  }, [container])

  const loadAvailability = useCallback(
    async (packageId: string) => {
      if (!packageId) {
        setAvailability([])
        setAvailabilityError(null)
        return
      }

      setLoadingAvailability(true)
      setAvailabilityError(null)

      try {
        const result = await container.getAvailabilityByPackage.execute(packageId)
        setAvailability(result)
      } catch (error) {
        setAvailabilityError(
          error instanceof Error
            ? error.message
            : 'Unable to load availability.',
        )
        setAvailability([])
      } finally {
        setLoadingAvailability(false)
      }
    },
    [container],
  )

  const submitLead = useCallback(
    async (leadRequest: LeadRequest): Promise<boolean> => {
      setSubmitState({ loading: true, success: false, error: null })

      try {
        await container.submitLead.execute(leadRequest)
        setSubmitState({ loading: false, success: true, error: null })
        return true
      } catch (error) {
        setSubmitState({
          loading: false,
          success: false,
          error:
            error instanceof Error
              ? error.message
              : 'Unable to submit the request.',
        })
        return false
      }
    },
    [container],
  )

  return {
    packages,
    loadingPackages,
    packagesError,
    availability,
    loadingAvailability,
    availabilityError,
    loadAvailability,
    submitLead,
    submitState,
  }
}
