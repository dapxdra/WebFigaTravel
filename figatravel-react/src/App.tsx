import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminGuard } from './presentation/auth/AdminGuard'
import { AuthProvider } from './presentation/auth/AuthProvider'
import { SiteLayout } from './presentation/components/SiteLayout'
import { AdminPage } from './presentation/pages/AdminPage'
import { AboutPage } from './presentation/pages/AboutPage'
import { BookOnlinePage } from './presentation/pages/BookOnlinePage'
import { ContactPage } from './presentation/pages/ContactPage'
import { DestinationDetailPage } from './presentation/pages/DestinationDetailPage'
import { DestinationsPage } from './presentation/pages/DestinationsPage'
import { FaqPage } from './presentation/pages/FaqPage'
import { HomePage } from './presentation/pages/HomePage'
import { ResetPasswordPage } from './presentation/pages/ResetPasswordPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ResetPasswordPage />} path="auth/reset-password" />
          <Route element={<SiteLayout />} path="/">
            <Route element={<HomePage />} index />
            <Route element={<DestinationsPage />} path="destinations" />
            <Route
              element={<DestinationDetailPage />}
              path="destinations/:slug"
            />
            <Route element={<BookOnlinePage />} path="book-online" />
            <Route element={<FaqPage />} path="faq" />
            <Route element={<AboutPage />} path="about-us" />
            <Route element={<ContactPage />} path="contact" />
            <Route
              element={
                <AdminGuard>
                  <AdminPage />
                </AdminGuard>
              }
              path="admin"
            />
            <Route element={<Navigate replace to="/" />} path="*" />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
