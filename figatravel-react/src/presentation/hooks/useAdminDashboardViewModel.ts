import { useCallback, useEffect, useMemo, useState } from 'react'
import { buildContainer } from '../../application/bootstrap/container'
import type { LeadRecord } from '../../domain/entities/LeadRecord'
import type { TravelPackage } from '../../domain/entities/TravelPackage'

export function useAdminDashboardViewModel() {
  const container = useMemo(() => buildContainer(), [])

  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [leads, setLeads] = useState<LeadRecord[]>([])
  const [priceDrafts, setPriceDrafts] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const updateDraftsFromPackages = useCallback((items: TravelPackage[]) => {
    const nextDrafts: Record<string, string> = {}
    for (const item of items) {
      nextDrafts[item.id] = item.price.toFixed(2)
    }
    setPriceDrafts(nextDrafts)
  }, [])

  const loadDashboardData = useCallback(async () => {
    const [packagesResult, leadsResult] = await Promise.allSettled([
      container.getAllPackages.execute(),
      container.getRecentLeads.execute(12),
    ])

    if (packagesResult.status === 'fulfilled') {
      setPackages(packagesResult.value)
      updateDraftsFromPackages(packagesResult.value)
    } else {
      setPackages([])
      setPriceDrafts({})
    }

    if (leadsResult.status === 'fulfilled') {
      setLeads(leadsResult.value)
    } else {
      setLeads([])
    }

    const errors = [packagesResult, leadsResult]
      .filter((result) => result.status === 'rejected')
      .map((result) =>
        result.reason instanceof Error
          ? result.reason.message
          : 'Unable to load part of the admin dashboard.',
      )

    if (errors.length > 0) {
      setError(errors.join(' '))
    }
  }, [container, updateDraftsFromPackages])

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      await loadDashboardData()
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Unable to load the admin dashboard.',
      )
    } finally {
      setLoading(false)
    }
  }, [loadDashboardData])

  useEffect(() => {
    let mounted = true

    const loadOnMount = async () => {
      setLoading(true)
      setError(null)

      try {
        if (mounted) {
          await loadDashboardData()
        }
      } catch (loadError) {
        if (mounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'Unable to load the admin dashboard.',
          )
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    void loadOnMount()

    return () => {
      mounted = false
    }
  }, [loadDashboardData])

  const toggleFeatured = useCallback(
    async (packageId: string, nextValue: boolean) => {
      setUpdatingId(packageId)
      setError(null)

      try {
        await container.updatePackageFeatured.execute(packageId, nextValue)
        setPackages((current) =>
          current.map((item) =>
            item.id === packageId ? { ...item, isFeatured: nextValue } : item,
          ),
        )
      } catch (updateError) {
        setError(
          updateError instanceof Error
            ? updateError.message
            : 'Unable to update the package.',
        )
      } finally {
        setUpdatingId(null)
      }
    },
    [container],
  )

  const setPriceDraft = useCallback((packageId: string, nextValue: string) => {
    setPriceDrafts((current) => ({
      ...current,
      [packageId]: nextValue,
    }))
  }, [])

  const savePrice = useCallback(
    async (packageId: string) => {
      const rawPrice = (priceDrafts[packageId] ?? '').trim()
      const normalizedPrice = Number(rawPrice)

      if (!Number.isFinite(normalizedPrice) || normalizedPrice <= 0) {
        setError('Ingresa un precio valido mayor a 0.')
        return
      }

      setUpdatingId(packageId)
      setError(null)

      try {
        await container.updatePackagePrice.execute(packageId, normalizedPrice)

        setPackages((current) =>
          current.map((item) =>
            item.id === packageId ? { ...item, price: normalizedPrice } : item,
          ),
        )

        setPriceDrafts((current) => ({
          ...current,
          [packageId]: normalizedPrice.toFixed(2),
        }))
      } catch (updateError) {
        setError(
          updateError instanceof Error
            ? updateError.message
            : 'Unable to update the package price.',
        )
      } finally {
        setUpdatingId(null)
      }
    },
    [container, priceDrafts],
  )

  return {
    packages,
    leads,
    priceDrafts,
    loading,
    error,
    updatingId,
    toggleFeatured,
    setPriceDraft,
    savePrice,
    reload,
  }
}
