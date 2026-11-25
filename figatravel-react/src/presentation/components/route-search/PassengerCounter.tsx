import { useI18n } from '../../i18n/useI18n'
import { MinusIcon, PlusIcon } from './RouteIcons'

interface PassengerCounterProps {
  label: string
  hint: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  dataCy: string
}

export function PassengerCounter({ label, hint, value, min, max, onChange, dataCy }: PassengerCounterProps) {
  const { m } = useI18n()
  return (
    <div className="passenger-counter" data-cy={dataCy}>
      <span className="passenger-counter-label">
        {label}
        <small>{hint}</small>
      </span>
      <button
        type="button"
        className="passenger-counter-button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={m.routeSearch.removeOne(label)}
        data-cy={`${dataCy}-decrement`}
      >
        <MinusIcon />
      </button>
      <output className="passenger-counter-value" aria-live="polite" data-cy={`${dataCy}-value`}>
        {value}
      </output>
      <button
        type="button"
        className="passenger-counter-button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={m.routeSearch.addOne(label)}
        data-cy={`${dataCy}-increment`}
      >
        <PlusIcon />
      </button>
    </div>
  )
}
