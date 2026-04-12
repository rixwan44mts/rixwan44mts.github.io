import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import AboutPage from './pages/AboutPage'
import CaseStudyPage from './pages/CaseStudyPage'
import ContactPage from './pages/ContactPage'
import HeroPage from './pages/HeroPage'
import ServicesPage from './pages/ServicesPage'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="page-shell">
          <PageTransition>
            <Routes>
              <Route path="/" element={<HeroPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/case-study" element={<CaseStudyPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
