import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Tjänster',
      links: [
        { name: 'Ställningar', href: '#services' },
        { name: 'Mobila Hissar', href: '#services' },
        { name: 'Byggnadstält', href: '#services' },
        { name: 'Väderskydd', href: '#services' },
        { name: 'Industriställningar', href: '#services' },
        { name: 'Fasadställningar', href: '#services' },
      ],
    },
    {
      title: 'Företaget',
      links: [
        { name: 'Om oss', href: '#about' },
        { name: 'Projekt', href: '#projects' },
        { name: 'Kontakt', href: '#contact' },
        { name: 'Begär offert', href: '/request-quote' },
        { name: 'Certifieringar', href: '#about' },
      ],
    },
    {
      title: 'Kontakt',
      links: [
        { name: 'Kristianstad', href: '#contact' },
        { name: '08-123 45 67', href: 'tel:08-123-45-67' },
        { name: 'info@hojdbolaget.se', href: 'mailto:info@hojdbolaget.se' },
        { name: 'Akut jour 24/7', href: 'tel:070-123-45-67' },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <footer className="bg-gradient-to-br from-secondary to-secondary-dark relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8"
        >
          {/* Company Info */}
          <motion.div
            variants={itemVariants}
            className="col-span-2 md:col-span-1"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <Link to="/" className="block">
                <img
                  src="/logo-light.svg"
                  alt="Höjdbolaget"
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-base text-gray-300">
                Professionella ställningslösningar med fokus på säkerhet och kvalitet sedan 2003.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/request-quote"
                  className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  Begär offert
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              className="col-span-1"
            >
              <motion.h3
                whileHover={{ x: 5 }}
                className="text-sm font-semibold text-white tracking-wider uppercase mb-4"
              >
                {section.title}
              </motion.h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              variants={itemVariants}
              className="text-base text-gray-400"
            >
              &copy; {currentYear} Höjdbolaget AB. Alla rättigheter förbehållna.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex space-x-6"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 