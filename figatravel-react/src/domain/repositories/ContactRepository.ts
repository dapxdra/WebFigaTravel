import type { ContactMessage } from '../entities/ContactMessage'

export interface ContactRepository {
  // Delivers the enquiry to the Figa Travel inbox. Implementations decide the
  // transport (email, ticketing, etc.); the domain only cares that it is sent.
  send(message: ContactMessage): Promise<void>
}
