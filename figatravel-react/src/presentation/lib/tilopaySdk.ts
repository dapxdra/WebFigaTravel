import { env } from '../../shared/config/env'

// Minimal shape of the Tilopay SDK v2 global, based on Tilopay's own
// integration example (Tilopay.InitTokenize + Tilopay.startPayment).
export interface TilopayInitTokenizeConfig {
  token: string
  key: string
  amount: string
  currency: string
  orderNumber: string
  redirect: string
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

interface TilopaySdk {
  InitTokenize(config: TilopayInitTokenizeConfig): Promise<unknown>
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
