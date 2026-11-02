import type { CustomRoutePricingRules } from '../../../domain/entities/CustomRoutePricing'
import {
  PASSENGER_GROUPS,
  calculateCustomRoutePrice,
  groupMultiplier,
} from '../../../domain/entities/CustomRoutePricing'
import type { PricingDraftField } from '../../hooks/useCustomRoutePricingAdmin'
import { useCustomRoutePricingAdmin } from '../../hooks/useCustomRoutePricingAdmin'

const PREVIEW_DISTANCES_KM = [50, 120, 200, 250, 280, 400]

const TIER_FIELDS: { maxKm: PricingDraftField; rate: PricingDraftField }[] = [
  { maxKm: 'tier1MaxKm', rate: 'tier1Rate' },
  { maxKm: 'tier2MaxKm', rate: 'tier2Rate' },
  { maxKm: 'tier3MaxKm', rate: 'tier3Rate' },
]


function PricingPreview({ rules }: { rules: CustomRoutePricingRules }) {
  return (
    <>
      <h3>Resulting rate per km (full vehicle)</h3>
      <div className="lead-table-wrap">
        <table className="lead-table" data-cy="admin-pricing-rates-table">
          <thead>
            <tr>
              <th>Vehicle</th>
              {rules.tiers.map((tier, index) => (
                <th key={index}>
                  {index === 0 ? 0 : rules.tiers[index - 1].maxKm}-{tier.maxKm} km
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PASSENGER_GROUPS.map((group) => (
              <tr key={group.key} data-cy={`admin-pricing-rates-${group.key}`}>
                <td>{group.label}</td>
                {rules.tiers.map((tier, index) => (
                  <td key={index}>
                    USD {(tier.ratePerKm * groupMultiplier(rules, group.key)).toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Price preview (USD)</h3>
      <div className="lead-table-wrap">
        <table className="lead-table" data-cy="admin-pricing-preview-table">
          <thead>
            <tr>
              <th>Distance</th>
              {PASSENGER_GROUPS.map((group) => (
                <th key={group.key}>{group.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PREVIEW_DISTANCES_KM.map((km) => (
              <tr key={km} data-cy={`admin-pricing-preview-${km}`}>
                <td>{km} km</td>
                {PASSENGER_GROUPS.map((group) => (
                  <td key={group.key}>{calculateCustomRoutePrice(rules, km, group.maxPassengers)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export function CustomRoutePricingEditor() {
  const {
    draft,
    previewRules,
    validationError,
    updatedAt,
    loading,
    saving,
    error,
    info,
    setField,
    save,
  } = useCustomRoutePricingAdmin()

  const numberInput = (field: PricingDraftField, step: string) => (
    <input
      type="number"
      min="0"
      step={step}
      value={draft?.[field] ?? ''}
      onChange={(event) => setField(field, event.target.value)}
      disabled={saving}
      required
      data-cy={`admin-pricing-${field}`}
    />
  )

  return (
    <section className="section" aria-labelledby="admin-pricing-title" data-cy="admin-pricing-section">
      <div className="section-head">
        <h2 id="admin-pricing-title">Custom route pricing</h2>
        <p>
          Prices for &quot;Where are you headed?&quot; routes. Rates are set for the 5-passenger
          vehicle; bigger vehicles are calculated from them.
          {updatedAt ? ` Last updated ${updatedAt.slice(0, 16).replace('T', ' ')}.` : ''}
        </p>
      </div>

      {loading ? <p data-cy="admin-pricing-loading">Loading pricing...</p> : null}
      {error ? <p className="error-text" data-cy="admin-pricing-error">{error}</p> : null}

      {draft ? (
        <form
          className="admin-pricing-form"
          data-cy="admin-pricing-form"
          onSubmit={(event) => {
            event.preventDefault()
            void save()
          }}
        >
          <fieldset className="priority-card">
            <legend>Distance tiers (5 passengers, USD per km)</legend>
            {TIER_FIELDS.map((tier, index) => (
              <div key={tier.maxKm} className="admin-pricing-row">
                <label>
                  Tier {index + 1} up to km
                  {numberInput(tier.maxKm, '1')}
                </label>
                <label>
                  USD / km
                  {numberInput(tier.rate, '0.01')}
                </label>
              </div>
            ))}
            <p className="auth-form-note">
              After tier 3 the price stops growing (top fare).
            </p>
          </fieldset>

          <fieldset className="priority-card">
            <legend>Bigger vehicles (x 5-passenger price)</legend>
            <div className="admin-pricing-row">
              <label>
                6-8 passengers multiplier
                {numberInput('mediumGroupMultiplier', '0.001')}
              </label>
              <label>
                9-18 passengers multiplier
                {numberInput('largeGroupMultiplier', '0.001')}
              </label>
            </div>
            <label>
              Minimum fare (USD, 0 = none)
              {numberInput('minimumFare', '1')}
            </label>
          </fieldset>

          {validationError ? (
            <p className="error-text" data-cy="admin-pricing-validation">{validationError}</p>
          ) : null}

          <button
            type="submit"
            className="admin-save-price"
            disabled={saving || validationError !== null}
            data-cy="admin-pricing-save"
          >
            {saving ? 'Saving...' : 'Save pricing'}
          </button>
          {info ? <p className="success-text" data-cy="admin-pricing-info">{info}</p> : null}
        </form>
      ) : null}

      {previewRules ? <PricingPreview rules={previewRules} /> : null}
    </section>
  )
}
