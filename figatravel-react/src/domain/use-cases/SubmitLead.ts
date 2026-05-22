import type { LeadRequest } from '../entities/LeadRequest'
import type { LeadRepository } from '../repositories/LeadRepository'

export class SubmitLead {
  private readonly repository: LeadRepository

  constructor(repository: LeadRepository) {
    this.repository = repository
  }

  async execute(input: LeadRequest): Promise<void> {
    if (input.name.trim() === '') {
      throw new Error('El nombre es obligatorio.')
    }

    if (input.email.trim() === '') {
      throw new Error('El correo es obligatorio.')
    }

    if (!input.packageId) {
      throw new Error('Selecciona un paquete para continuar.')
    }

    await this.repository.create(input)
  }
}
