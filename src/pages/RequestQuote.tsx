import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RequestQuote = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceType: '',
    projectLocation: '',
    startDate: '',
    description: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
  }

  const serviceTypes = [
    'Ställningar',
    'Mobila Hissar',
    'Byggnadstält',
    'Väderskydd',
    'Industriställningar',
    'Fasadställningar',
    'Annat',
  ]

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderField = (fieldName: string) => {
    const fields = {
      name: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
            Namn *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="Ditt namn"
          />
        </motion.div>
      ),
      company: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="company" className="block text-lg font-medium text-gray-700 mb-2">
            Företag
          </label>
          <input
            type="text"
            name="company"
            id="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="Ditt företag (valfritt)"
          />
        </motion.div>
      ),
      email: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
            E-post *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="din.epost@exempel.se"
          />
        </motion.div>
      ),
      phone: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
            Telefon *
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="070-123 45 67"
          />
        </motion.div>
      ),
      serviceType: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="serviceType" className="block text-lg font-medium text-gray-700 mb-2">
            Typ av tjänst *
          </label>
          <select
            name="serviceType"
            id="serviceType"
            required
            value={formData.serviceType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          >
            <option value="">Välj tjänst</option>
            {serviceTypes.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </motion.div>
      ),
      projectLocation: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="projectLocation" className="block text-lg font-medium text-gray-700 mb-2">
            Projektplats *
          </label>
          <input
            type="text"
            name="projectLocation"
            id="projectLocation"
            required
            value={formData.projectLocation}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="Ange projektets adress"
          />
        </motion.div>
      ),
      startDate: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="startDate" className="block text-lg font-medium text-gray-700 mb-2">
            Önskat startdatum
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
        </motion.div>
      ),
      description: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
            Projektbeskrivning *
          </label>
          <textarea
            name="description"
            id="description"
            rows={6}
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="Beskriv ditt projekt, omfattning, och eventuella specifika krav eller önskemål..."
          />
        </motion.div>
      ),
    }
    return fields[fieldName as keyof typeof fields]
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      >
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-20 h-20 mx-auto mb-8 bg-primary rounded-full flex items-center justify-center"
          >
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tack för din förfrågan!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Vi återkommer med en offert inom 24 timmar.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Tillbaka till startsidan
            </Link>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Begär offert
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Låt oss hjälpa dig med ditt projekt. Fyll i formuläret nedan så återkommer vi med en 
            skräddarsydd offert inom 24 timmar.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Progress bar */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <motion.div
                    animate={{
                      scale: currentStep === step ? 1.2 : 1,
                      backgroundColor: currentStep >= step ? '#FF0000' : '#E5E7EB',
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                  >
                    {step}
                  </motion.div>
                  {step < 3 && (
                    <div
                      className={`w-24 h-1 mx-2 rounded ${
                        currentStep > step ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Personlig information</h2>
                      <p className="text-gray-600">Berätta lite om dig själv så vi vet vem vi ska kontakta.</p>
                    </div>
                    {renderField('name')}
                    {renderField('company')}
                    {renderField('email')}
                    {renderField('phone')}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Projektdetaljer</h2>
                      <p className="text-gray-600">Hjälp oss förstå ditt projekt bättre.</p>
                    </div>
                    {renderField('serviceType')}
                    {renderField('projectLocation')}
                    {renderField('startDate')}
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Projektbeskrivning</h2>
                      <p className="text-gray-600">Beskriv ditt projekt så detaljerat som möjligt så kan vi ge dig en mer precis offert.</p>
                    </div>
                    {renderField('description')}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Föregående
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type={currentStep === 3 ? 'submit' : 'button'}
                onClick={currentStep === 3 ? undefined : nextStep}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors duration-200 ml-auto"
              >
                {currentStep === 3 ? 'Skicka förfrågan' : 'Nästa'}
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default RequestQuote 