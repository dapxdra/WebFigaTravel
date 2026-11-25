import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminGuard } from './presentation/auth/AdminGuard'
import { AuthProvider } from './presentation/auth/AuthProvider'
import { I18nProvider } from './presentation/i18n/I18nProvider'
import { useI18n } from './presentation/i18n/useI18n'
import { SiteLayout } from './presentation/components/SiteLayout'
import { AboutPage } from './presentation/pages/AboutPage'
import { ContactPage } from './presentation/pages/ContactPage'
import { DestinationDetailPage } from './presentation/pages/DestinationDetailPage'
import { DestinationsPage } from './presentation/pages/DestinationsPage'
import { FaqPage } from './presentation/pages/FaqPage'
import { FleetPage } from './presentation/pages/FleetPage'
import { HomePage } from './presentation/pages/HomePage'
import { NotFoundPage } from './presentation/pages/NotFoundPage'
import { PrivacyPolicyPage } from './presentation/pages/PrivacyPolicyPage'
import { ResetPasswordPage } from './presentation/pages/ResetPasswordPage'
import { TermsConditionsPage } from './presentation/pages/TermsConditionsPage'

// Code-split the admin dashboard and the payment/checkout flow: both pull in
// extra weight (Tilopay SDK + jQuery, admin data grids) that most visitors
// never load, so keep them out of the initial bundle.
const AdminPage = lazy(() =>
  import('./presentation/pages/AdminPage').then((m) => ({ default: m.AdminPage })),
)
const BookOnlinePage = lazy(() =>
  import('./presentation/pages/BookOnlinePage').then((m) => ({ default: m.BookOnlinePage })),
)
const PaymentResponsePage = lazy(() =>
  import('./presentation/pages/PaymentResponsePage').then((m) => ({
    default: m.PaymentResponsePage,
  })),
)

function RouteLoading() {
  const { m } = useI18n()
  return (
    <div className="route-loading" aria-live="polite" data-cy="route-loading">
      {m.common.loading}
    </div>
  )
}

// Route tree without a router, so the same routes render in the browser
// (BrowserRouter, below) and in the build-time prerender (StaticRouter, see
// entry-server.tsx).
export function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        <Route element={<ResetPasswordPage />} path="auth/reset-password" />
        <Route element={<SiteLayout />} path="/">
          <Route element={<HomePage />} index />
          <Route element={<DestinationsPage />} path="destinations" />
          <Route
            element={<DestinationDetailPage />}
            path="destinations/:slug"
          />
          <Route element={<FleetPage />} path="fleet" />
          <Route element={<BookOnlinePage />} path="book-online" />
          <Route element={<PaymentResponsePage />} path="pago/respuesta" />
          <Route element={<FaqPage />} path="faq" />
          <Route element={<AboutPage />} path="about-us" />
          <Route element={<ContactPage />} path="contact" />
          <Route element={<PrivacyPolicyPage />} path="privacy-policy" />
          <Route element={<TermsConditionsPage />} path="terms-and-conditions" />
          <Route
            element={
              <AdminGuard>
                <AdminPage />
              </AdminGuard>
            }
            path="admin"
          />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </Suspense>
  )
}

function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </I18nProvider>
  )
}

export default App
