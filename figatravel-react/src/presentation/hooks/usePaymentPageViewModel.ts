import { useCallback, useEffect, useMemo, useState } from 'react'
import { buildContainer } from '../../application/bootstrap/container'
import type { AvailabilitySlot } from '../../domain/entities/AvailabilitySlot'
import type { TravelPackage } from '../../domain/entities/TravelPackage'
import type {
  Reservation,
  ReservationRequest,
  TilopaySdkSession,
} from '../../domain/entities/Reservation'
import type {
  CustomRouteQuote,
  CustomRouteReservationRequest,
  CustomRouteSearch,
} from '../../domain/entities/CustomRoute'

// The quote is stored with the exact search it was priced for, so the booking
// form always reserves the route the customer saw the price of.
export interface QuotedRoute {
  search: CustomRouteSearch
  quote: CustomRouteQuote
}

interface AsyncState {
  loading: boolean
  error: string | null
}

export function usePaymentPageViewModel() {
  const container = useMemo(() => buildContainer(), [])

  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [loadingPackages, setLoadingPackages] = useState(true)
  const [packagesError, setPackagesError] = useState<string | null>(null)

  const [availability, setAvailability] = useState<AvailabilitySlot[]>([])
  const [loadingAvailability, setLoadingAvailability] = useState(false)
  const [availabilityError, setAvailabilityError] = useState<string | null>(null)

  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [reservationState, setReservationState] = useState<AsyncState>({
    loading: false,
    error: null,
  })

  const [sdkSession, setSdkSession] = useState<TilopaySdkSession | null>(null)
  const [tokenState, setTokenState] = useState<AsyncState>({ loading: false, error: null })

  const [quotedRoute, setQuotedRoute] = useState<QuotedRoute | null>(null)
  const [quoteState, setQuoteState] = useState<AsyncState>({ loading: false, error: null })
  const [customReservationState, setCustomReservationState] = useState<AsyncState>({
    loading: false,
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
          setPackagesError(error instanceof Error ? error.message : 'Unable to load packages.')
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
          error instanceof Error ? error.message : 'Unable to load availability.',
        )
        setAvailability([])
      } finally {
        setLoadingAvailability(false)
      }
    },
    [container],
  )

  const createReservation = useCallback(
    async (request: ReservationRequest): Promise<Reservation | null> => {
      setReservationState({ loading: true, error: null })

      try {
        const created = await container.createPendingReservation.execute(request)
        setReservation(created)
        setReservationState({ loading: false, error: null })
        return created
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unable to create the reservation.'
        setReservationState({ loading: false, error: message })
        return null
      }
    },
    [container],
  )

  const quoteCustomRoute = useCallback(
    async (search: CustomRouteSearch): Promise<void> => {
      setQuoteState({ loading: true, error: null })

      try {
        const quote = await container.getCustomRouteQuote.execute(search)
        setQuotedRoute({ search, quote })
        setQuoteState({ loading: false, error: null })
      } catch (error) {
        setQuotedRoute(null)
        setQuoteState({
          loading: false,
          error: error instanceof Error ? error.message : 'Unable to price this route.',
        })
      }
    },
    [container],
  )

  const createCustomRouteReservation = useCallback(
    async (request: CustomRouteReservationRequest): Promise<Reservation | null> => {
      setCustomReservationState({ loading: true, error: null })

      try {
        const created = await container.createCustomRouteReservation.execute(request)
        setReservation(created)
        setCustomReservationState({ loading: false, error: null })
        return created
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unable to create the reservation.'
        setCustomReservationState({ loading: false, error: message })
        return null
      }
    },
    [container],
  )

  const fetchSdkToken = useCallback(
    async (orderNumber: string): Promise<TilopaySdkSession | null> => {
      setTokenState({ loading: true, error: null })

      try {
        const session = await container.getTilopaySdkToken.execute(orderNumber)
        setSdkSession(session)
        setTokenState({ loading: false, error: null })
        return session
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unable to start the payment session.'
        setTokenState({ loading: false, error: message })
        return null
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
    reservation,
    reservationState,
    createReservation,
    sdkSession,
    tokenState,
    fetchSdkToken,
    quotedRoute,
    quoteState,
    quoteCustomRoute,
    customReservationState,
    createCustomRouteReservation,
  }
}
