import { useCallback, useEffect, useMemo, useState } from 'react'
import { buildContainer } from '../../application/bootstrap/container'
import type { CustomRoutePricingRules } from '../../domain/entities/CustomRoutePricing'
import { validateCustomRoutePricing } from '../../domain/entities/CustomRoutePricing'

// Form fields are kept as strings so the admin can type freely ("1." etc.);
// they are converted to numbers only to preview/validate/save.
export type PricingDraftField =
  | 'tier1MaxKm' | 'tier1Rate'
  | 'tier2MaxKm' | 'tier2Rate'
  | 'tier3MaxKm' | 'tier3Rate'
  | 'mediumGroupMultiplier' | 'largeGroupMultiplier'
  | 'minimumFare'

export type PricingDraft = Record<PricingDraftField, string>

function toDraft(rules: CustomRoutePricingRules): PricingDraft {
  const [tier1, tier2, tier3] = rules.tiers
  return {
    tier1MaxKm: String(tier1.maxKm),
    tier1Rate: String(tier1.ratePerKm),
    tier2MaxKm: String(tier2.maxKm),
    tier2Rate: String(tier2.ratePerKm),
    tier3MaxKm: String(tier3.maxKm),
    tier3Rate: String(tier3.ratePerKm),
    mediumGroupMultiplier: String(rules.mediumGroupMultiplier),
    largeGroupMultiplier: String(rules.largeGroupMultiplier),
    minimumFare: String(rules.minimumFare),
  }
}

// Empty strings become NaN so validation reports them instead of saving 0.
function toNumber(value: string): number {
  return value.trim() === '' ? Number.NaN : Number(value)
}

function toRules(draft: PricingDraft): CustomRoutePricingRules {
  return {
    tiers: [
      { maxKm: toNumber(draft.tier1MaxKm), ratePerKm: toNumber(draft.tier1Rate) },
      { maxKm: toNumber(draft.tier2MaxKm), ratePerKm: toNumber(draft.tier2Rate) },
      { maxKm: toNumber(draft.tier3MaxKm), ratePerKm: toNumber(draft.tier3Rate) },
    ],
    mediumGroupMultiplier: toNumber(draft.mediumGroupMultiplier),
    largeGroupMultiplier: toNumber(draft.largeGroupMultiplier),
    minimumFare: toNumber(draft.minimumFare),
  }
}

export function useCustomRoutePricingAdmin() {
  const container = useMemo(() => buildContainer(), [])

  const [draft, setDraft] = useState<PricingDraft | null>(null)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  // Loads once on mount; state is only set after the request resolves, and
  // ignored if the admin page unmounted meanwhile.
  useEffect(() => {
    let mounted = true

    container.getCustomRoutePricing
      .execute()
      .then((rules) => {
        if (!mounted) return
        setDraft(toDraft(rules))
        setUpdatedAt(rules.updatedAt ?? null)
      })
      .catch((loadError: unknown) => {
        if (!mounted) return
        setError(loadError instanceof Error ? loadError.message : 'Unable to load custom route pricing.')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [container])

  const setField = useCallback((field: PricingDraftField, value: string) => {
    setDraft((current) => (current ? { ...current, [field]: value } : current))
    setInfo(null)
  }, [])

  // Live preview: recomputed on every keystroke, only when the draft is valid.
  const draftRules = useMemo(() => (draft ? toRules(draft) : null), [draft])
  const validationError = useMemo(
    () => (draftRules ? validateCustomRoutePricing(draftRules) : null),
    [draftRules],
  )

  const save = useCallback(async () => {
    if (!draftRules) return

    setSaving(true)
    setError(null)
    setInfo(null)
    try {
      await container.updateCustomRoutePricing.execute(draftRules)
      setInfo('Pricing saved. New quotes use it within about a minute.')
      setUpdatedAt(new Date().toISOString())
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save custom route pricing.')
    } finally {
      setSaving(false)
    }
  }, [container, draftRules])

  return {
    draft,
    previewRules: validationError ? null : draftRules,
    validationError,
    updatedAt,
    loading,
    saving,
    error,
    info,
    setField,
    save,
  }
}
