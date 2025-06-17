import { useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Component imports
import Navbar from './components/Navbar'
import Loading from './components/Loading'
import ScrollToTop from './components/ScrollToTop'
import RequestQuote from './components/RequestQuote'

// Lazy load components
const Hero = lazy(() => import('./components/Hero'))
const Services = lazy(() => import('./components/Services'))
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Footer = lazy(() => import('./components/Footer'))

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
        </Suspense>
      </main>
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </>
  )
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