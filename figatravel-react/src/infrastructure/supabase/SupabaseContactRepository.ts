import type { ContactMessage } from '../../domain/entities/ContactMessage'
import type { ContactRepository } from '../../domain/repositories/ContactRepository'
import { supabaseClient } from './supabaseClient'

// Calls the `send-contact-email` Edge Function, which holds the email-provider
// secret and does the actual sending server-side. The browser never sees that
// key (same pattern as the Tilopay functions).
export class SupabaseContactRepository implements ContactRepository {
  async send(message: ContactMessage): Promise<void> {
    if (!supabaseClient) {
      throw new Error(
        'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to send contact messages.',
      )
    }

    const { data, error } = await supabaseClient.functions.invoke('send-contact-email', {
      body: {
        name: message.name,
        email: message.email,
        phone: message.phone ?? null,
        subject: message.subject,
        message: message.message,
      },
    })

    if (error) {
      throw new Error(`Unable to send your message: ${error.message}`)
    }

    const result = data as { ok?: boolean; error?: string } | null
    if (!result?.ok) {
      throw new Error(result?.error ?? 'The message could not be delivered. Please try again.')
    }
  }
}
