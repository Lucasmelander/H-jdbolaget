import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const stats = [
  { label: 'Års erfarenhet', value: '20+' },
  { label: 'Genomförda projekt', value: '1000+' },
  { label: 'Nöjda kunder', value: '500+' },
  { label: 'Certifieringar', value: '15+' },
]

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:grid lg:grid-cols-2 lg:gap-16 items-center"
          >
            {/* Image section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mb-12 lg:mb-0"
            >
              <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Replace with actual image */}
                <div className="absolute inset-0 bg-[url('/about-image.jpg')] bg-cover bg-center" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-black/5 rounded-full" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-black/5 rounded-full" />
            </motion.div>

            {/* Content section */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-3xl font-extrabold text-secondary sm:text-4xl">
                  Din partner för säkra höjdarbeten
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Sedan 2003 har vi levererat professionella höjdarbetstjänster med högsta fokus på säkerhet och kvalitet. 
                  Vårt team består av erfarna och certifierade specialister som är redo att ta sig an de mest utmanande projekten.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  Vi investerar kontinuerligt i den senaste utrustningen och utbildning för att säkerställa att vi alltid 
                  levererar bästa möjliga resultat för våra kunder.
                </p>

                {/* Stats grid */}
                <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10">
                  {stats.map((stat) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="relative"
                    >
                      <dt className="text-base font-medium text-gray-500">
                        {stat.label}
                      </dt>
                      <dd className="mt-2 text-3xl font-extrabold text-primary">
                        {stat.value}
                      </dd>
                    </motion.div>
                  ))}
                </dl>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-10"
                >
                  <a
                    href="#contact"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
                  >
                    Kontakta oss
                    <svg
                      className="ml-2 h-5 w-5"
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
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About 