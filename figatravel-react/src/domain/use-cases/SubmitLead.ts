import type { LeadRequest } from '../entities/LeadRequest'
import type { LeadRepository } from '../repositories/LeadRepository'

export class SubmitLead {
  private readonly repository: LeadRepository

  constructor(repository: LeadRepository) {
    this.repository = repository
  }

  async execute(input: LeadRequest): Promise<void> {
    if (input.name.trim() === '') {
      throw new Error('Name is required.')
    }

    if (input.email.trim() === '') {
      throw new Error('Email is required.')
    }

    if (!input.packageId) {
      throw new Error('Select a package to continue.')
    }

    await this.repository.create(input)
  }
}
