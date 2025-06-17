import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import React, { useState, useMemo } from 'react'
import { submitFormData } from '../lib/supabase'
import type { FormSubmission } from '../lib/supabase'
import { Link } from 'react-router-dom'

// Validation functions
const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

const validatePhone = (phone: string) => {
  // Allow numbers, spaces, hyphens, plus sign, and parentheses
  // Must have at least 8 digits (including country code)
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{4,6}$/
  return phoneRegex.test(phone.replace(/\s+/g, ''))
}

const validateName = (name: string) => {
  // Allow letters, spaces, hyphens, and common special characters for names
  const nameRegex = /^[a-zA-ZåäöÅÄÖ\s-]{2,50}$/
  return nameRegex.test(name)
}

const validateMessage = (message: string) => {
  // Message should be at least 20 characters
  return message.trim().length >= 20
}

const getFieldError = (field: string, value: string): string | null => {
  switch (field) {
    case 'email':
      return !validateEmail(value) ? 'Vänligen ange en giltig e-postadress (exempel@domain.com)' : null
    case 'phone':
      return !validatePhone(value) ? 'Vänligen ange ett giltigt telefonnummer (minst 8 siffror)' : null
    case 'name':
      return !validateName(value) ? 'Vänligen ange ett giltigt namn (2-50 bokstäver)' : null
    case 'message':
      return !validateMessage(value) ? 'Meddelandet måste vara minst 20 tecken långt' : null
    default:
      return null
  }
}

const RequestQuote = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Omit<FormSubmission, 'id' | 'created_at' | 'updated_at' | 'status'>>({
    name: '',
    company: '',
    email: '',
    phone: '',
    service_type: '',
    project_start: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  // Memoize the validation result
  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 1: {
        const nameError = getFieldError('name', formData.name)
        const emailError = getFieldError('email', formData.email)
        const phoneError = getFieldError('phone', formData.phone)
        return !(nameError || emailError || phoneError)
      }
      case 2:
        return !!formData.service_type?.trim()
      case 3: {
        const messageError = getFieldError('message', formData.message)
        return !messageError
      }
      default:
        return false
    }
  }, [currentStep, formData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    console.log(`📝 Field "${name}" changed to:`, value)
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Only show validation errors if there was a previous error
    if (submitStatus.message) {
      const error = getFieldError(name, value)
      setSubmitStatus({
        success: false,
        message: error || ''
      })
    }
  }

  const handleNext = () => {
    console.log(`🔄 Attempting to move to next step from step ${currentStep}`)
    if (isStepValid) {
      console.log(`✅ Step ${currentStep} validated successfully`)
      setCurrentStep(prev => prev + 1)
    } else {
      console.error(`❌ Step ${currentStep} validation failed`)
    }
  }

  const handlePrevious = () => {
    console.log(`⬅️ Moving back from step ${currentStep} to ${currentStep - 1}`)
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('📤 Form submission started')
    console.log('Current step:', currentStep)
    console.log('Form data:', formData)

    if (!isStepValid) {
      console.log('❌ Form validation failed')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company?.trim() || '',
        message: formData.message.trim(),
        service_type: formData.service_type.trim(),
        project_start: formData.project_start || new Date().toISOString().split('T')[0],
      }

      console.log('📝 Attempting to submit data:', submissionData)

      const { data, error } = await submitFormData(submissionData)

      if (error) {
        console.error('❌ Submission error:', error)
        let errorMessage = 'Ett fel uppstod vid skickandet av formuläret.'
        
        if (error.message?.includes('duplicate')) {
          errorMessage = 'En förfrågan med denna e-postadress finns redan.'
        } else if (error.message?.includes('permission')) {
          errorMessage = 'Behörighetsproblem. Vänligen försök igen.'
        } else if (error.message?.includes('network')) {
          errorMessage = 'Nätverksfel. Kontrollera din internetanslutning.'
        }

        setSubmitStatus({
          success: false,
          message: errorMessage
        })
        return
      }

      console.log('✅ Submission successful:', data)
      setSubmitStatus({
        success: true,
        message: 'Tack för din förfrågan! Vi återkommer så snart som möjligt.'
      })
      
      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service_type: '',
        project_start: '',
        message: '',
      })
      setCurrentStep(1)
    } catch (error: any) {
      console.error('❌ Unexpected error:', error)
      setSubmitStatus({
        success: false,
        message: 'Ett oväntat fel uppstod. Vänligen försök igen senare.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Namn *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Företag
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-post *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service_type" className="block text-sm font-medium text-gray-700 mb-1">
                  Tjänst *
                </label>
                <select
                  id="service_type"
                  name="service_type"
                  required
                  value={formData.service_type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Välj tjänst</option>
                  <option value="Ställningar">Ställningar</option>
                  <option value="Mobila Hissar">Mobila Hissar</option>
                  <option value="Byggnadstält">Byggnadstält</option>
                  <option value="Väderskydd">Väderskydd</option>
                  <option value="Industriställningar">Industriställningar</option>
                  <option value="Fasadställningar">Fasadställningar</option>
                </select>
              </div>

              <div>
                <label htmlFor="project_start" className="block text-sm font-medium text-gray-700 mb-1">
                  Önskat startdatum
                </label>
                <input
                  type="date"
                  id="project_start"
                  name="project_start"
                  value={formData.project_start}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Projektbeskrivning *
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Beskriv ditt projekt i detalj. Till exempel:
                • Projektets omfattning och mått
                • Specifika krav eller utmaningar
                • Önskad tidsram
                • Platsens förutsättningar
                • Eventuella säkerhetskrav
              </p>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Beskriv ditt projekt här..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tillbaka till startsidan
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <h1 className="text-3xl font-bold text-secondary mb-2">Begär offert</h1>
            <p className="text-gray-600 mb-8">
              Fyll i formuläret nedan så återkommer vi med en offert inom 24 timmar.
            </p>

            {/* Progress bar */}
            <div className="relative mb-8">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span className={currentStep >= 1 ? 'text-primary' : ''}>Kontaktuppgifter</span>
                <span className={currentStep >= 2 ? 'text-primary' : ''}>Tjänst</span>
                <span className={currentStep >= 3 ? 'text-primary' : ''}>Meddelande</span>
              </div>
            </div>

            {submitStatus.message && (
              <div
                className={`p-4 mb-6 rounded-lg ${
                  submitStatus.success
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {renderStep()}

              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-gray-500">* Obligatoriska fält</p>
                <div className="flex space-x-4">
                  {currentStep > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handlePrevious}
                      className="px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Tillbaka
                    </motion.button>
                  )}
                  
                  {currentStep < 3 ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid}
                      className={`px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors duration-200 ${
                        !isStepValid ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Nästa
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting || !isStepValid}
                      className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors duration-200 ${
                        isSubmitting || !isStepValid ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Skickar...
                        </>
                      ) : (
                        'Skicka förfrågan'
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RequestQuote 