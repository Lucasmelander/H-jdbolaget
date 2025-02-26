import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'

// Component imports
import Navbar from './components/Navbar'
import Loading from './components/Loading'

// Lazy load components
const Hero = lazy(() => import('./components/Hero'))
const Services = lazy(() => import('./components/Services'))
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const RequestQuote = lazy(() => import('./pages/RequestQuote'))

// Layout component for the main page
const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="overflow-hidden">
        <Suspense fallback={<Loading />}>
          <Hero />
          <Services />
          <About />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </>
  )
}

// ScrollToTop component to handle scroll behavior
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route 
            path="/request-quote" 
            element={
              <Suspense fallback={<Loading />}>
                <RequestQuote />
              </Suspense>
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App 