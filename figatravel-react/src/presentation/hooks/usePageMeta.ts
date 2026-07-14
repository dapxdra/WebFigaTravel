import { useEffect } from 'react'

const defaultTitle = 'Figa Travel Costa Rica'
const defaultDescription =
  'Private transfers and curated travel routes in Costa Rica. Safe, punctual, and comfortable transportation.'

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} | ${defaultTitle}`

    const existingDescription = document.querySelector('meta[name="description"]')

    if (existingDescription) {
      existingDescription.setAttribute('content', description)
      return
    }

    const metaDescription = document.createElement('meta')
    metaDescription.setAttribute('name', 'description')
    metaDescription.setAttribute('content', description)
    document.head.appendChild(metaDescription)
  }, [title, description])
}

export const defaultSeoDescription = defaultDescription