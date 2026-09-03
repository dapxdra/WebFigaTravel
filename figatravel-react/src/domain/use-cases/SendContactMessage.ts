import type { ContactMessage } from '../entities/ContactMessage'
import type { ContactRepository } from '../repositories/ContactRepository'

// Basic RFC-5322-ish check: enough to reject obvious typos without fighting
// every valid edge case (the real validation is the reply bouncing).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export class SendContactMessage {
  private readonly repository: ContactRepository

  constructor(repository: ContactRepository) {
    this.repository = repository
  }

  async execute(input: ContactMessage): Promise<void> {
    const name = input.name.trim()
    const email = input.email.trim()
    const subject = input.subject.trim()
    const message = input.message.trim()

    if (name === '') {
      throw new Error('Name is required.')
    }

    if (!EMAIL_PATTERN.test(email)) {
      throw new Error('Enter a valid email address.')
    }

    if (subject === '') {
      throw new Error('Subject is required.')
    }

    if (message.length < 10) {
      throw new Error('Please add a few more details to your message.')
    }

    await this.repository.send({
      name,
      email,
      phone: input.phone?.trim() || undefined,
      subject,
      message,
    })
  }
}
