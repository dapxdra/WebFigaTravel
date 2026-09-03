import type { LeadRecord } from '../entities/LeadRecord'

export interface LeadRepository {
  listRecent(limit: number): Promise<LeadRecord[]>
}
