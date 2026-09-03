import { useState } from 'react'
import type { FormEvent } from 'react'
import { useContactFormViewModel } from '../hooks/useContactFormViewModel'

interface ContactFormProps {
  title: string
  subtitle: string
}

// Public "just get in touch" form. Unlike the booking flow it has no package,
// date, or traveler fields; on submit it triggers an email to the Figa Travel
// inbox via the send-contact-email Edge Function.
export function ContactForm({ title, subtitle }: ContactFormProps) {
  const { submit, submitState } = useContactFormViewModel()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  // Honeypot: real users never see this field, so any value means a bot.
  const [company, setCompany] = useState('')

  const canSubmit =
    name.trim() !== '' &&
    email.trim() !== '' &&
    subject.trim() !== '' &&
    message.trim().length >= 10

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit || submitState.loading || company !== '') {
      return
    }

    const sent = await submit({
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
    })

    if (!sent) {
      return
    }

    setName('')
    setEmail('')
    setPhone('')
    setSubject('')
    setMessage('')
  }

  return (
    <section className="section contact" aria-labelledby="contact-form-title" data-cy="contact-form-section">
      <div className="section-head">
        <h2 id="contact-form-title">{title}</h2>
        <p>{subtitle}</p>
      </div>

      <form className="lead-form" onSubmit={onSubmit} data-cy="contact-form">
        <label>
          Full name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            data-cy="contact-name"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            data-cy="contact-email"
          />
        </label>

        <label>
          Phone
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            data-cy="contact-phone"
          />
        </label>

        <label>
          Subject
          <input
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
            data-cy="contact-subject"
          />
        </label>

        <label className="full-width">
          Message
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={5}
            required
            placeholder="Tell us how we can help you."
            data-cy="contact-message"
          />
        </label>

        {/* Honeypot field: hidden from users, ignored by the backend if filled. */}
        <label className="sr-only" aria-hidden="true">
          Company
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </label>

        <button disabled={!canSubmit || submitState.loading} type="submit" data-cy="contact-submit">
          {submitState.loading ? 'Sending...' : 'Send message'}
        </button>

        {submitState.error ? (
          <p className="error-text" data-cy="contact-error">
            {submitState.error}
          </p>
        ) : null}
        {submitState.success ? (
          <p className="success-text" data-cy="contact-success">
            Thanks for reaching out. We will reply by email soon.
          </p>
        ) : null}
      </form>
    </section>
  )
}
