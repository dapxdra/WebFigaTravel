import { env } from '../../shared/config/env'

// Minimal shape of the Tilopay SDK v2 global, based on Tilopay's own
// integration example (Tilopay.Init + Tilopay.startPayment).
//
// NOT Tilopay.InitTokenize(): that method is Tilopay's save-a-card-for-later
// flow (a real $1 authorization to verify and store a card for future
// charges) and is gated to production-only merchant accounts. It also
// ignores the `amount`/`orderNumber` passed to it, so it can never actually
// charge a reservation. Tilopay.Init() is the one-time-payment method and is
// what a checkout needs.
export interface TilopayInitConfig {
  token: string
  key: string
  amount: string
  currency: string
  orderNumber: string
  redirect: string
  capture: '0' | '1'
  language?: string
  billToFirstName: string
  billToLastName: string
  billToAddress: string
  billToAddress2?: string
  billToCity: string
  billToState: string
  billToZipPostCode: string
  billToCountry: string
  billToTelephone: string
  billToEmail: string
}

export interface TilopayStartPaymentResult {
  code?: string
  message?: string
  [key: string]: unknown
}

export interface TilopayMethod {
  id: string
  name: string
  type: string
}

export interface TilopaySavedCard {
  id: string
  name: string
  brand: string
}

// Response shape of Tilopay.Init(): on success `methods` lists the payment
// methods available to render in #tlpy_payment_method, and `cards` lists the
// customer's saved cards for #tlpy_saved_cards. On failure Tilopay resolves
// (does not reject) with an empty `methods` array and a `message` describing
// the error.
export interface TilopayInitResponse {
  message: string
  methods: TilopayMethod[]
  cards: TilopaySavedCard[]
  [key: string]: unknown
}

interface TilopaySdk {
  Init(config: TilopayInitConfig): Promise<TilopayInitResponse>
  startPayment(): Promise<TilopayStartPaymentResult>
}

declare global {
  interface Window {
    Tilopay?: TilopaySdk
    jQuery?: unknown
  }
}

let loadPromise: Promise<TilopaySdk> | null = null

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}

// Loads jQuery (if configured and not already present) and the Tilopay SDK
// script, then resolves with the window.Tilopay global. Safe to call more
// than once; the script tags are only injected the first time.
export function loadTilopaySdk(): Promise<TilopaySdk> {
  if (loadPromise) {
    return loadPromise
  }

  if (!env.tilopaySdkScriptUrl) {
    return Promise.reject(
      new Error(
        'VITE_TILOPAY_SDK_URL is not set. Add the Tilopay SDK script URL from your Tilopay dashboard to your .env file.',
      ),
    )
  }

  loadPromise = (async () => {
    if (!window.jQuery && env.tilopayJqueryScriptUrl) {
      await loadScript(env.tilopayJqueryScriptUrl)
    }

    await loadScript(env.tilopaySdkScriptUrl as string)

    if (!window.Tilopay) {
      throw new Error('Tilopay SDK script loaded but window.Tilopay is unavailable.')
    }

    return window.Tilopay
  })()

  return loadPromise
}
