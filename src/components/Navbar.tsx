import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

const Navbar = ({ isMenuOpen, setIsMenuOpen }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)

      // Update active section based on scroll position
      const sections = ['home', 'services', 'about', 'projects', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Hem', href: '#home' },
    { name: 'Tjänster', href: '#services' },
    { name: 'Om oss', href: '#about' },
    { name: 'Projekt', href: '#projects' },
    { name: 'Kontakt', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 shadow-lg backdrop-blur-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={scrolled ? '/logo.svg' : '/logo-light.svg'} 
                alt="Höjdbolaget" 
                className="h-10 w-auto transition-all duration-300"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <motion.div 
                key={item.name}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-base font-medium transition-all duration-300
                    ${scrolled 
                      ? activeSection === item.href.slice(1)
                        ? 'text-primary bg-primary/5'
                        : 'text-gray-700 hover:text-primary hover:bg-primary/5' 
                      : activeSection === item.href.slice(1)
                        ? 'text-white bg-white/20'
                        : 'text-white/90 hover:text-white hover:bg-white/20'
                    }
                  `}
                >
                  {item.name}
                </a>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/request-quote"
                className={`px-4 py-2 rounded-lg text-base font-medium transition-all duration-300
                  ${scrolled
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-white text-primary hover:bg-gray-100'
                  }
                `}
              >
                Begär offert
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}
          >
            <span className="sr-only">Öppna meny</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                    ${activeSection === item.href.slice(1)
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                    }
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/request-quote"
                  className="block px-4 py-3 rounded-lg text-base font-medium bg-primary text-white hover:bg-primary-dark transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Begär offert
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar 