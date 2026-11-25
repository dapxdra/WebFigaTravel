import {
  buildDestinationFaq,
  faqItems,
  fleet,
  priorities,
  topDestinations,
} from '../data/siteContent'
import type { Destination, FaqItem, Priority, Vehicle } from '../data/siteContent'
import type { ContentTranslations } from './contentTypes'
import type { Locale } from './locales'

export interface LocalizedContent {
  destinations: Destination[]
  fleet: Vehicle[]
  priorities: Priority[]
  faqItems: FaqItem[]
  findDestination: (slug: string) => Destination | undefined
  buildDestinationFaq: (destination: Destination) => FaqItem[]
}

const englishContent: LocalizedContent = {
  destinations: topDestinations,
  fleet,
  priorities,
  faqItems,
  findDestination: (slug) => topDestinations.find((item) => item.slug === slug),
  buildDestinationFaq,
}

// "A, B and C" with the right conjunction for each language.
function joinList(items: string[], locale: Locale) {
  return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(items)
}

/**
 * Overlays the translated text on the English data from siteContent.ts.
 * Images, slugs and galleries always come from the English source; a slug
 * missing from a translation simply stays in English.
 */
export function localizeContent(content: ContentTranslations | null, locale: Locale): LocalizedContent {
  if (!content) {
    return englishContent
  }

  const destinations = topDestinations.map((destination) => ({
    ...destination,
    ...content.destinations[destination.slug],
  }))

  const localizedFleet = fleet.map((vehicle) => ({ ...vehicle, ...content.fleet[vehicle.slug] }))

  // Same questions as the English builder in siteContent.ts, but written
  // from the translated templates.
  const buildLocalizedFaq = (destination: Destination): FaqItem[] => {
    const text = content.destinations[destination.slug]
    if (!text) {
      return buildDestinationFaq(destination)
    }

    const t = content.destinationFaq
    const { name } = destination
    // trim(): French writes "Nom : description" with a space before the colon.
    const attractionNames = text.attractions.map((item) => item.split(':')[0].trim())

    // Translations keep the English tip order, so the English label tells
    // which translated tip is the "best time to visit" one.
    const english = topDestinations.find((item) => item.slug === destination.slug)
    const bestTimeIndex = english?.travelTips.findIndex((tip) => tip.startsWith('Best Time to Visit')) ?? -1
    const bestTimeTip = bestTimeIndex >= 0 ? text.travelTips[bestTimeIndex] : undefined

    const items: FaqItem[] = [
      text.transferDuration
        ? { question: t.durationQuestion(name), answer: t.durationAnswer(name, text.transferDuration) }
        : { question: t.localQuestion(name), answer: t.localAnswer(name) },
      { question: t.bookQuestion(name), answer: t.bookAnswer(name) },
      {
        question: t.thingsQuestion(name),
        // German capitalizes nouns, so "Abenteuer und Natur" must keep its case.
        answer: t.thingsAnswer(
          name,
          joinList(attractionNames, locale),
          locale === 'de' ? text.bestFor : text.bestFor.toLowerCase(),
        ),
      },
    ]

    if (bestTimeTip) {
      // Drop the "Best time to visit:" label and capitalize what remains.
      const answer = bestTimeTip.replace(/^[^:]+:\s*/, '')
      items.push({ question: t.bestTimeQuestion(name), answer: answer.charAt(0).toLocaleUpperCase(locale) + answer.slice(1) })
    }

    return items
  }

  return {
    destinations,
    fleet: localizedFleet,
    priorities: content.priorities,
    faqItems: content.faq,
    findDestination: (slug) => destinations.find((item) => item.slug === slug),
    buildDestinationFaq: buildLocalizedFaq,
  }
}
