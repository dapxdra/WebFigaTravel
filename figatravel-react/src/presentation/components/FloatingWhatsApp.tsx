const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=%2B50672271058&text=Hello%20Figa%20Travel%2C%20I%20want%20to%20book%20a%20transfer&type=phone_number&app_absent=0'

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      className="floating-whatsapp"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      data-cy="floating-whatsapp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="floating-whatsapp-icon">
        <path d="M20 4.1A10 10 0 0 0 4 18.7L2.8 22l3.4-1.1A10 10 0 1 0 20 4.1ZM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-2 .7.7-2-.2-.3A8 8 0 1 1 12 20Zm4.3-5.9c-.2-.1-1.4-.7-1.6-.7-.2-.1-.3-.1-.5.1l-.7.8c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.3-.4.1-.1.1-.3 0-.4 0-.1-.5-1.3-.7-1.7-.2-.4-.4-.3-.5-.3h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.1 1.6 2.5 3.9 3.4 1.6.7 2.3.7 2.8.6.3-.1 1.1-.5 1.3-1 .2-.5.2-.9.1-1Z" />
      </svg>
    </a>
  )
}
