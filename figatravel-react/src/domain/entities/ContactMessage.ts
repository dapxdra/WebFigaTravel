// A general enquiry sent from the public Contact page. Intentionally has
// nothing to do with bookings: no package, date, or traveler count.
export interface ContactMessage {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}
