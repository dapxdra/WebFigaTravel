import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { RoutePlace } from '../../../domain/entities/CustomRoute'
import type { AutocompleteSessionToken, PlaceSuggestion } from '../../lib/googleMaps'
import { createSessionToken, fetchPlaceSuggestions } from '../../lib/googleMaps'
import { PinIcon } from './RouteIcons'

// Wait for a short pause in typing before asking Google, and only once there
// are enough characters to return useful results (each call is billed).
const DEBOUNCE_MS = 250
const MIN_QUERY_LENGTH = 3

interface PlaceAutocompleteInputProps {
  label: string
  placeholder: string
  value: RoutePlace | null
  onChange: (place: RoutePlace | null) => void
  dataCy: string
}

export function PlaceAutocompleteInput({
  label,
  placeholder,
  value,
  onChange,
  dataCy,
}: PlaceAutocompleteInputProps) {
  const listboxId = useId()
  const [text, setText] = useState(value?.label ?? '')
  // Only text the user typed triggers a search; picking a suggestion or a
  // parent update (e.g. the swap button) must not reopen the dropdown.
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([])
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [error, setError] = useState<string | null>(null)
  const sessionTokenRef = useRef<AutocompleteSessionToken | null>(null)
  // Increments on every request so slow, outdated responses are ignored.
  const requestIdRef = useRef(0)

  // Keep the visible text in sync when the parent changes the selected place
  // (swap button, prefilled search). Adjusting state during render is React's
  // recommended alternative to a syncing effect.
  const [syncedValue, setSyncedValue] = useState(value)
  if (value !== syncedValue) {
    setSyncedValue(value)
    setText(value?.label ?? '')
  }

  useEffect(() => {
    const trimmed = query.trim()
    if (trimmed.length < MIN_QUERY_LENGTH) {
      return
    }

    const requestId = ++requestIdRef.current
    const timer = window.setTimeout(async () => {
      try {
        sessionTokenRef.current ??= await createSessionToken()
        const results = await fetchPlaceSuggestions(trimmed, sessionTokenRef.current)
        if (requestId === requestIdRef.current) {
          setSuggestions(results)
          setActiveIndex(results.length > 0 ? 0 : -1)
          setOpen(true)
          setError(null)
        }
      } catch (caught) {
        if (requestId === requestIdRef.current) {
          setSuggestions([])
          setError(caught instanceof Error ? caught.message : 'Address search is unavailable.')
        }
      }
    }, DEBOUNCE_MS)

    return () => window.clearTimeout(timer)
  }, [query])

  const selectSuggestion = (suggestion: PlaceSuggestion) => {
    // A selection closes the Google billing session; the next search starts a new one.
    sessionTokenRef.current = null
    requestIdRef.current++
    setText(suggestion.label)
    setQuery('')
    setSuggestions([])
    setOpen(false)
    onChange({ placeId: suggestion.placeId, label: suggestion.label })
  }

  const handleTextChange = (nextText: string) => {
    setText(nextText)
    setQuery(nextText)
    if (nextText.trim().length < MIN_QUERY_LENGTH) {
      requestIdRef.current++
      setSuggestions([])
      setOpen(false)
    }
    // Free text no longer matches the selected place, so clear the selection.
    if (value) {
      onChange(null)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => (current - 1 + suggestions.length) % suggestions.length)
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      selectSuggestion(suggestions[activeIndex])
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const showList = open && suggestions.length > 0

  return (
    <div className="route-place-field" data-cy={dataCy}>
      <label className="route-place-input-wrap">
        <PinIcon className="route-icon route-icon-accent" />
        <span className="sr-only">{label}</span>
        <input
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={listboxId}
          aria-activedescendant={showList && activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
          autoComplete="off"
          spellCheck={false}
          maxLength={200}
          placeholder={placeholder}
          value={text}
          onChange={(event) => handleTextChange(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(suggestions.length > 0)}
          onBlur={() => setOpen(false)}
          data-cy={`${dataCy}-input`}
        />
      </label>

      {showList ? (
        <ul id={listboxId} role="listbox" className="route-place-suggestions" data-cy={`${dataCy}-suggestions`}>
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.placeId}
              id={`${listboxId}-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={
                index === activeIndex ? 'route-place-option route-place-option-active' : 'route-place-option'
              }
              // mousedown (not click) fires before the input's blur closes the list.
              onMouseDown={(event) => {
                event.preventDefault()
                selectSuggestion(suggestion)
              }}
              onMouseEnter={() => setActiveIndex(index)}
              data-cy={`${dataCy}-option`}
            >
              <PinIcon className="route-icon route-icon-muted" />
              <span>
                <strong>{suggestion.mainText}</strong>
                {suggestion.secondaryText ? <small>{suggestion.secondaryText}</small> : null}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {error ? (
        <small className="error-text route-place-error" data-cy={`${dataCy}-error`}>
          {error}
        </small>
      ) : null}
    </div>
  )
}
