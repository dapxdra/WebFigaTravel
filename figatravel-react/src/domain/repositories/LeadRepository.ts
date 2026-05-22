import type { LeadRequest } from '../entities/LeadRequest'
import type { LeadRecord } from '../entities/LeadRecord'

export interface LeadRepository {
  create(lead: LeadRequest): Promise<void>
  listRecent(limit: number): Promise<LeadRecord[]>
}
