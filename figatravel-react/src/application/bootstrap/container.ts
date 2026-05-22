import { GetAllPackages } from '../../domain/use-cases/GetAllPackages'
import { GetAvailabilityByPackage } from '../../domain/use-cases/GetAvailabilityByPackage'
import { GetFeaturedPackages } from '../../domain/use-cases/GetFeaturedPackages'
import { GetRecentLeads } from '../../domain/use-cases/GetRecentLeads'
import { SubmitLead } from '../../domain/use-cases/SubmitLead'
import { UpdatePackageFeatured } from '../../domain/use-cases/UpdatePackageFeatured'
import { SupabaseAvailabilityRepository } from '../../infrastructure/supabase/SupabaseAvailabilityRepository'
import { SupabaseLeadRepository } from '../../infrastructure/supabase/SupabaseLeadRepository'
import { SupabaseTravelPackageRepository } from '../../infrastructure/supabase/SupabaseTravelPackageRepository'

export function buildContainer() {
  const travelPackageRepository = new SupabaseTravelPackageRepository()
  const leadRepository = new SupabaseLeadRepository()
  const availabilityRepository = new SupabaseAvailabilityRepository()

  return {
    getFeaturedPackages: new GetFeaturedPackages(travelPackageRepository),
    getAllPackages: new GetAllPackages(travelPackageRepository),
    getAvailabilityByPackage: new GetAvailabilityByPackage(availabilityRepository),
    getRecentLeads: new GetRecentLeads(leadRepository),
    updatePackageFeatured: new UpdatePackageFeatured(travelPackageRepository),
    submitLead: new SubmitLead(leadRepository),
  }
}
