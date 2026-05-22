import { useCallback, useEffect, useMemo, useState } from 'react'
import { buildContainer } from '../../application/bootstrap/container'
import type { LeadRecord } from '../../domain/entities/LeadRecord'
import type { TravelPackage } from '../../domain/entities/TravelPackage'

export function useAdminDashboardViewModel() {
  const container = useMemo(() => buildContainer(), [])

  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [leads, setLeads] = useState<LeadRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const [allPackages, recentLeads] = await Promise.all([
        container.getAllPackages.execute(),
        container.getRecentLeads.execute(12),
      ])

      setPackages(allPackages)
      setLeads(recentLeads)
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'No fue posible cargar el panel admin.',
      )
    } finally {
      setLoading(false)
    }
  }, [container])

  useEffect(() => {
    let mounted = true

    const loadOnMount = async () => {
      setLoading(true)
      setError(null)

      try {
        const [allPackages, recentLeads] = await Promise.all([
          container.getAllPackages.execute(),
          container.getRecentLeads.execute(12),
        ])

        if (mounted) {
          setPackages(allPackages)
          setLeads(recentLeads)
        }
      } catch (loadError) {
        if (mounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'No fue posible cargar el panel admin.',
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
  }, [container])

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
            : 'No fue posible actualizar el paquete.',
        )
      } finally {
        setUpdatingId(null)
      }
    },
    [container],
  )

  return {
    packages,
    leads,
    loading,
    error,
    updatingId,
    toggleFeatured,
    reload,
  }
}
