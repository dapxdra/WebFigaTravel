import { useId } from 'react'
import { SUPPORTED_LOCALES, isLocale } from '../i18n/locales'
import { useI18n } from '../i18n/useI18n'

// Compact pill that only shows the 3-letter code ("ENG"). A transparent native
// <select> is stretched over it, so clicking opens the real dropdown with the
// full language names, and keyboard / screen-reader support comes for free.
export function LanguageSwitcher() {
  const { m, locale, setLocale, isLoadingLocale } = useI18n()
  const selectId = useId()
  const current = SUPPORTED_LOCALES.find((option) => option.code === locale) ?? SUPPORTED_LOCALES[0]

  return (
    <div className="language-switcher" title={current.label} data-cy="language-switcher">
      <label htmlFor={selectId} className="sr-only">
        {m.language.label}
      </label>
      <span className="language-switcher-code" aria-hidden="true" data-cy="language-switcher-code">
        {current.short}
      </span>
      <select
        id={selectId}
        className="language-switcher-select"
        value={locale}
        aria-busy={isLoadingLocale}
        onChange={(event) => {
          const next = event.target.value
          if (isLocale(next)) {
            setLocale(next)
          }
        }}
        data-cy="language-switcher-select"
      >
        {SUPPORTED_LOCALES.map((option) => (
          <option key={option.code} value={option.code} lang={option.code} data-cy={`language-option-${option.code}`}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
