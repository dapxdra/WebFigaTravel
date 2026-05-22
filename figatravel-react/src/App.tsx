import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './presentation/components/SiteLayout'
import { AdminPage } from './presentation/pages/AdminPage'
import { AboutPage } from './presentation/pages/AboutPage'
import { BookOnlinePage } from './presentation/pages/BookOnlinePage'
import { ContactPage } from './presentation/pages/ContactPage'
import { DestinationDetailPage } from './presentation/pages/DestinationDetailPage'
import { DestinationsPage } from './presentation/pages/DestinationsPage'
import { FaqPage } from './presentation/pages/FaqPage'
import { HomePage } from './presentation/pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />} path="/">
          <Route element={<HomePage />} index />
          <Route element={<DestinationsPage />} path="destinations" />
          <Route element={<DestinationDetailPage />} path="destinations/:slug" />
          <Route element={<BookOnlinePage />} path="book-online" />
          <Route element={<FaqPage />} path="faq" />
          <Route element={<AboutPage />} path="about-us" />
          <Route element={<ContactPage />} path="contact" />
          <Route element={<AdminPage />} path="admin" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
