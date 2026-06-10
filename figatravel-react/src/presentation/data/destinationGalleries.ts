const galleryModules = import.meta.glob('../../assets/destinations/details/*/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const galleriesBySlug = Object.entries(galleryModules).reduce<Record<string, string[]>>(
  (accumulator, [modulePath, imagePath]) => {
    const segments = modulePath.split('/')
    const slug = segments[segments.length - 2]

    if (!slug) {
      return accumulator
    }

    if (!accumulator[slug]) {
      accumulator[slug] = []
    }

    accumulator[slug].push(imagePath)
    accumulator[slug].sort((left, right) =>
      left.localeCompare(right, undefined, {
        numeric: true,
        sensitivity: 'base',
      }),
    )

    return accumulator
  },
  {},
)

export function getDestinationGallery(slug: string) {
  return galleriesBySlug[slug] ?? []
}
