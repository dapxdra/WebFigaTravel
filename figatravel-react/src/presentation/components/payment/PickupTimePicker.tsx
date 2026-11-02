import { useState } from 'react'

// 48 half-hour slots: 00:00 to 23:30
const ALL_TIME_SLOTS: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return `${String(h).padStart(2, '0')}:${m}`
})

// Groups the 48 slots into 4 tabs of 12 so the picker shows a manageable
// number of buttons at a time instead of all 48 at once.
interface TimeSegment {
  key: string
  label: string
  hourFrom: number
  hourTo: number
}

const TIME_SEGMENTS: TimeSegment[] = [
  { key: 'night', label: 'Night', hourFrom: 0, hourTo: 5 },
  { key: 'morning', label: 'Morning', hourFrom: 6, hourTo: 11 },
  { key: 'afternoon', label: 'Afternoon', hourFrom: 12, hourTo: 17 },
  { key: 'evening', label: 'Evening', hourFrom: 18, hourTo: 23 },
]

function timesInSegment(segment: TimeSegment): string[] {
  return ALL_TIME_SLOTS.filter((time) => {
    const hour = Number(time.slice(0, 2))
    return hour >= segment.hourFrom && hour <= segment.hourTo
  })
}

interface PickupTimePickerProps {
  value: string
  onChange: (time: string) => void
  dataCy?: string
}

// Tabbed half-hour time grid. Only rendered once a future date is chosen,
// so every slot is selectable.
export function PickupTimePicker({ value, onChange, dataCy = 'pickup-time-picker' }: PickupTimePickerProps) {
  const [activeSegment, setActiveSegment] = useState(TIME_SEGMENTS[1])

  return (
    <div data-cy={dataCy}>
      <div className="time-segment-tabs" role="tablist" aria-label="Time of day">
        {TIME_SEGMENTS.map((segment) => (
          <button
            key={segment.key}
            type="button"
            role="tab"
            aria-selected={activeSegment.key === segment.key}
            className={
              activeSegment.key === segment.key ? 'time-segment-tab time-segment-tab-active' : 'time-segment-tab'
            }
            onClick={() => setActiveSegment(segment)}
            data-cy={`${dataCy}-tab-${segment.key}`}
          >
            {segment.label}
          </button>
        ))}
      </div>

      <div className="time-grid" role="group" aria-label="Available times">
        {timesInSegment(activeSegment).map((time) => (
          <button
            key={time}
            type="button"
            className={value === time ? 'time-slot time-slot-active' : 'time-slot time-slot-open'}
            onClick={() => onChange(time)}
            aria-pressed={value === time}
            data-cy={`${dataCy}-slot`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  )
}
