import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const projects = [
  {
    title: 'Fasadrenovering Centralen',
    category: 'Fasadarbete',
    description: 'Omfattande fasadrenovering av historisk byggnad i centrala Stockholm.',
    image: '/project1.jpg',
  },
  {
    title: 'Industriklättring Vattenfall',
    category: 'Industriklättring',
    description: 'Inspektion och underhåll av höga industristrukturer.',
    image: '/project2.jpg',
  },
  {
    title: 'Takarbete Moderna Museet',
    category: 'Takarbete',
    description: 'Omfattande takrenovering och säkerhetsinstallationer.',
    image: '/project3.jpg',
  },
  {
    title: 'Fönsterputsning Turning Torso',
    category: 'Fönsterputsning',
    description: 'Professionell fönsterputsning av Sveriges högsta byggnad.',
    image: '/project4.jpg',
  },
  {
    title: 'Besiktning Globen',
    category: 'Besiktning',
    description: 'Omfattande säkerhetsbesiktning av takkonstruktion.',
    image: '/project5.jpg',
  },
  {
    title: 'Vinterunderhåll Arenastaden',
    category: 'Snöskottning',
    description: 'Säker snöröjning av tak på flera kommersiella fastigheter.',
    image: '/project6.jpg',
  },
]

const categories = ['Alla', ...new Set(projects.map((project) => project.category))]

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('Alla')
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const filteredProjects = selectedCategory === 'Alla'
    ? projects
    : projects.filter((project) => project.category === selectedCategory)

  return (
    <section id="projects" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-secondary sm:text-4xl">
            Våra Projekt
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Utforska några av våra senaste projekt och se hur vi har hjälpt våra kunder
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:opacity-75 transition-opacity duration-300" />
                {/* Replace with actual image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>
              <div className="p-6">
                <span className="text-sm font-medium text-primary">
                  {project.category}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-secondary">
                  {project.title}
                </h3>
                <p className="mt-2 text-gray-500">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
          >
            Starta ditt projekt
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
      </div>
    </section>
  )
}

export default Projects 