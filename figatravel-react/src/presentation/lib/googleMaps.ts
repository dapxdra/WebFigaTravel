import { env } from '../../shared/config/env'

// Minimal typings for the slice of the Maps JavaScript API we use: the
// Places API (New) data API (AutocompleteSuggestion), which returns plain
// suggestions so we can render our own dropdown styled like the rest of the
// site, instead of Google's prebuilt widget.
interface FormattableText {
  text: string
}

interface PlacePrediction { 
  placeId: string
  text: FormattableText
  mainText?: FormattableText | null
  secondaryText?: FormattableText | null
}

interface AutocompleteRequest {
  input: string
  sessionToken?: AutocompleteSessionToken
  includedRegionCodes?: string[]
  language?: string
  region?: string
}

// Opaque token that groups the keystrokes of one search into a single
// billable Google "session".
export type AutocompleteSessionToken = object

interface PlacesLibrary {
  AutocompleteSuggestion: {
    fetchAutocompleteSuggestions(
      request: AutocompleteRequest,
    ): Promise<{ suggestions: { placePrediction: PlacePrediction | null }[] }>
  }
  AutocompleteSessionToken: new () => AutocompleteSessionToken
}

declare global {
  interface Window {
    google?: { maps?: { importLibrary?: (name: 'places') => Promise<unknown> } }
    __figaGoogleMapsReady?: () => void
  }
}

export interface PlaceSuggestion {
  placeId: string
  label: string
  mainText: string
  secondaryText: string
}

const MAPS_SCRIPT_ID = 'google-maps-js'
let placesPromise: Promise<PlacesLibrary> | null = null

// Loads the Maps JS API once and resolves the "places" library. The promise
// is cached so every autocomplete input on the page shares one script tag;
// on failure the cache is cleared so a later attempt can retry.
export function loadPlacesLibrary(): Promise<PlacesLibrary> {
  if (placesPromise) {
    return placesPromise
  }

  const apiKey = env.googleMapsApiKey
  if (!apiKey) {
    return Promise.reject(new Error('Address search is not configured (missing G_M_A_K).'))
  }

  placesPromise = new Promise<PlacesLibrary>((resolve, reject) => {
    const resolveLibrary = () => {
      const importLibrary = window.google?.maps?.importLibrary
      if (!importLibrary) {
        reject(new Error('Google Maps did not initialize.'))
        return
      }
      importLibrary('places').then((library) => resolve(library as PlacesLibrary), reject)
    }

    if (window.google?.maps?.importLibrary) {
      resolveLibrary()
      return
    }

    window.__figaGoogleMapsReady = resolveLibrary

    const params = new URLSearchParams({
      key: apiKey,
      v: 'weekly',
      loading: 'async',
      libraries: 'places',
      language: 'en',
      region: 'CR',
      callback: '__figaGoogleMapsReady',
    })

    const script = document.createElement('script')
    script.id = MAPS_SCRIPT_ID
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`
    script.async = true
    script.onerror = () => {
      script.remove()
      reject(new Error('Unable to load Google address search.'))
    }
    document.head.appendChild(script)
  }).catch((error: unknown) => {
    placesPromise = null
    throw error
  })

  return placesPromise
}

export async function createSessionToken(): Promise<AutocompleteSessionToken> {
  const places = await loadPlacesLibrary()
  return new places.AutocompleteSessionToken()
}

// Returns up to 5 Costa Rica suggestions (Google's default page size) for
// the typed text.
export async function fetchPlaceSuggestions(
  input: string,
  sessionToken: AutocompleteSessionToken,
): Promise<PlaceSuggestion[]> {
  const places = await loadPlacesLibrary()
  const { suggestions } = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
    input,
    sessionToken,
    includedRegionCodes: ['cr'],
    language: 'en',
    region: 'cr',
  })

  return suggestions.flatMap(({ placePrediction }) => {
    if (!placePrediction) {
      return []
    }
    return [
      {
        placeId: placePrediction.placeId,
        label: placePrediction.text.text,
        mainText: placePrediction.mainText?.text ?? placePrediction.text.text,
        secondaryText: placePrediction.secondaryText?.text ?? '',
      },
    ]
  })
}
