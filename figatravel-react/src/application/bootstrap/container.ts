import { GetAllPackages } from '../../domain/use-cases/GetAllPackages'
import { GetAvailabilityByPackage } from '../../domain/use-cases/GetAvailabilityByPackage'
import { GetFeaturedPackages } from '../../domain/use-cases/GetFeaturedPackages'
import { GetRecentLeads } from '../../domain/use-cases/GetRecentLeads'
import { SendContactMessage } from '../../domain/use-cases/SendContactMessage'
import { UpdatePackageFeatured } from '../../domain/use-cases/UpdatePackageFeatured'
import { UpdatePackagePrice } from '../../domain/use-cases/UpdatePackagePrice'
import { CreatePendingReservation } from '../../domain/use-cases/CreatePendingReservation'
import { GetTilopaySdkToken } from '../../domain/use-cases/GetTilopaySdkToken'
import { VerifyTilopayPayment } from '../../domain/use-cases/VerifyTilopayPayment'
import { SupabaseAvailabilityRepository } from '../../infrastructure/supabase/SupabaseAvailabilityRepository'
import { SupabaseContactRepository } from '../../infrastructure/supabase/SupabaseContactRepository'
import { SupabaseLeadRepository } from '../../infrastructure/supabase/SupabaseLeadRepository'
import { SupabaseTravelPackageRepository } from '../../infrastructure/supabase/SupabaseTravelPackageRepository'
import { SupabaseReservationRepository } from '../../infrastructure/supabase/SupabaseReservationRepository'

export function buildContainer() {
  const travelPackageRepository = new SupabaseTravelPackageRepository()
  const leadRepository = new SupabaseLeadRepository()
  const availabilityRepository = new SupabaseAvailabilityRepository()
  const reservationRepository = new SupabaseReservationRepository()
  const contactRepository = new SupabaseContactRepository()

  return {
    getFeaturedPackages: new GetFeaturedPackages(travelPackageRepository),
    getAllPackages: new GetAllPackages(travelPackageRepository),
    getAvailabilityByPackage: new GetAvailabilityByPackage(availabilityRepository),
    getRecentLeads: new GetRecentLeads(leadRepository),
    updatePackageFeatured: new UpdatePackageFeatured(travelPackageRepository),
    updatePackagePrice: new UpdatePackagePrice(travelPackageRepository),
    sendContactMessage: new SendContactMessage(contactRepository),
    createPendingReservation: new CreatePendingReservation(reservationRepository),
    getTilopaySdkToken: new GetTilopaySdkToken(reservationRepository),
    verifyTilopayPayment: new VerifyTilopayPayment(reservationRepository),
  }
}
