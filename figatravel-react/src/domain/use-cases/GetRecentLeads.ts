import type { LeadRecord } from '../entities/LeadRecord'
import type { LeadRepository } from '../repositories/LeadRepository'

export class GetRecentLeads {
  private readonly repository: LeadRepository

  constructor(repository: LeadRepository) {
    this.repository = repository
  }

  async execute(limit = 10): Promise<LeadRecord[]> {
    return this.repository.listRecent(limit)
  }
}
