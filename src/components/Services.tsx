import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const services = [
  {
    title: 'Ställningar',
    description: 'Vi bygger ställningslösningar till fasader, nybyggnader och industrier. Vi använder oss utav ett ställningssystem i stål från Layher med högsta säkerhet och kvalitet.',
    icon: (
      <svg className="h-10 w-10 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    features: [
      'Material från Layher',
      'Särskild utbildning och yrkesbevis',
      'Skräddarsydda lösningar',
    ]
  },
  {
    title: 'Mobila Hissar',
    description: 'Våra mobila plattformar är en helt unik lösning som är under ständig utveckling. Ekonomiskt lönsamma och ergonomiska, anpassade för både arbetsplats och arbetare.',
    icon: (
      <svg className="h-10 w-10 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
      </svg>
    ),
    features: [
      'Ekonomiskt lönsamma',
      'Unik anpassning',
      'Snabb installation',
    ]
  },
  {
    title: 'Byggnadstält',
    description: 'Vi erbjuder byggnadstält och väderskydd som en komplett lösning för din byggnad. Skyddar effektivt mot väder och vind under byggprocessen.',
    icon: (
      <svg className="h-10 w-10 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    features: [
      'Komplett väderskydd',
      'Anpassade lösningar',
      'Professionell installation',
    ]
  }
]

const Services = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="services" className="relative py-16 sm:py-24 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">
            Våra Tjänster
          </h2>
          <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Professionella lösningar för alla typer av höjdarbeten
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mt-12 sm:mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-4 sm:p-8">
                <motion.div 
                  className="text-primary mb-4 sm:mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.icon}
                </motion.div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
                
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                    >
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.div 
                  className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/request-quote"
                    className="inline-flex items-center text-sm sm:text-base text-primary hover:text-primary-dark transition-colors duration-300"
                  >
                    Läs mer
                    <svg className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <Link
            to="/request-quote"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-xl text-white bg-primary hover:bg-primary-dark transition-all duration-300 hover:shadow-lg"
          >
            Begär offert nu
            <svg
              className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 transform transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 