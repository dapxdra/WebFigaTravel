import { useState } from 'react'
import type { FormEvent } from 'react'
import type { CustomRouteSearch, RoutePlace } from '../../../domain/entities/CustomRoute'
import { MAX_ROUTE_PASSENGERS } from '../../../domain/entities/CustomRoute'
import { PassengerCounter } from './PassengerCounter'
import { PlaceAutocompleteInput } from './PlaceAutocompleteInput'
import { BoltIcon, CheckCircleIcon, DoorIcon, SwapIcon, UsersIcon } from './RouteIcons'

interface RouteSearchCardProps {
  initialSearch?: CustomRouteSearch | null
  submitLabel: string
  busy?: boolean
  onSubmit: (search: CustomRouteSearch) => void | Promise<void>
}

export function RouteSearchCard({ initialSearch, submitLabel, busy = false, onSubmit }: RouteSearchCardProps) {
  const [origin, setOrigin] = useState<RoutePlace | null>(initialSearch?.origin ?? null)
  const [destination, setDestination] = useState<RoutePlace | null>(initialSearch?.destination ?? null)
  const [adults, setAdults] = useState(initialSearch?.passengers.adults ?? 2)
  const [children, setChildren] = useState(initialSearch?.passengers.children ?? 0)

  const canSubmit = origin !== null && destination !== null && !busy

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!origin || !destination || busy) {
      return
    }
    void onSubmit({ origin, destination, passengers: { adults, children } })
  }

  return (
    <form className="route-search-card" onSubmit={handleSubmit} data-cy="route-search-card">
      <h2 className="route-search-title">Where are you headed?</h2>

      <div className="route-search-places">
        <PlaceAutocompleteInput
          label="Pickup location"
          placeholder="Where from?"
          value={origin}
          onChange={setOrigin}
          dataCy="route-search-origin"
        />
        <button
          type="button"
          className="route-swap-button"
          onClick={() => {
            setOrigin(destination)
            setDestination(origin)
          }}
          aria-label="Swap pickup and drop-off"
          title="Swap pickup and drop-off"
          data-cy="route-search-swap"
        >
          <SwapIcon />
        </button>
        <PlaceAutocompleteInput
          label="Drop-off location"
          placeholder="Where to?"
          value={destination}
          onChange={setDestination}
          dataCy="route-search-destination"
        />
      </div>

      <fieldset className="route-passengers" data-cy="route-search-passengers">
        <legend className="sr-only">Passengers</legend>
        <span className="route-passengers-title">
          <UsersIcon className="route-icon route-icon-accent" />
          How many passengers?
        </span>
        <div className="route-passengers-counters">
          {/* Adults + children share the fleet's seat limit. */}
          <PassengerCounter
            label="Adults"
            hint="12+"
            value={adults}
            min={1}
            max={MAX_ROUTE_PASSENGERS - children}
            onChange={setAdults}
            dataCy="route-search-adults"
          />
          <PassengerCounter
            label="Children"
            hint="0-11"
            value={children}
            min={0}
            max={MAX_ROUTE_PASSENGERS - adults}
            onChange={setChildren}
            dataCy="route-search-children"
          />
        </div>
      </fieldset>

      <button type="submit" className="home-book-now route-search-submit" disabled={!canSubmit} data-cy="route-search-submit">
        {busy ? 'Calculating price...' : submitLabel}
      </button>

      <ul className="route-search-perks" aria-label="Booking benefits">
        <li>
          <BoltIcon className="route-icon route-icon-accent" /> Instant pricing
        </li>
        <li>
          <DoorIcon className="route-icon route-icon-accent" /> Door-to-door
        </li>
        <li>
          <CheckCircleIcon className="route-icon route-icon-accent" /> No hidden fees
        </li>
      </ul>
    </form>
  )
}
