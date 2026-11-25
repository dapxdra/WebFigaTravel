import type { FaqItem, Priority } from '../data/siteContent'

// Translated copy for the content that lives in data/siteContent.ts. The
// English originals stay in siteContent.ts (they also feed the prerender,
// sitemap and llms.txt); a translation only overrides the visible text.

/** Text fields of a destination, keyed by its slug. */
export interface DestinationText {
  /** Localized place name; omit to keep the English one. */
  name?: string
  summary: string
  /** Shown on cards, e.g. "3h from San Jose". */
  transferTime: string
  /** Used inside FAQ answers, e.g. "3 hours". null for local destinations. */
  transferDuration: string | null
  bestFor: string
  intro: string
  bookLabel: string
  /** Same order as English, "Name: description". */
  attractions: string[]
  /** Same order as English, "Label: tip". */
  travelTips: string[]
}

/** Text fields of a fleet vehicle, keyed by its slug. */
export interface VehicleText {
  category: string
  capacity: string
  summary: string
  features: string[]
}

/** Sentence templates for the per-destination FAQ block. */
export interface DestinationFaqTemplates {
  localQuestion: (name: string) => string
  localAnswer: (name: string) => string
  durationQuestion: (name: string) => string
  durationAnswer: (name: string, duration: string) => string
  bookQuestion: (name: string) => string
  bookAnswer: (name: string) => string
  thingsQuestion: (name: string) => string
  thingsAnswer: (name: string, attractions: string, bestFor: string) => string
  bestTimeQuestion: (name: string) => string
}

export interface ContentTranslations {
  destinations: Record<string, DestinationText>
  fleet: Record<string, VehicleText>
  priorities: Priority[]
  faq: FaqItem[]
  destinationFaq: DestinationFaqTemplates
}
