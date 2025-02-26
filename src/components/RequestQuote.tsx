import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import React, { useState } from 'react'
import { submitFormData } from '../lib/supabase'
import type { FormSubmission } from '../lib/supabase'

const RequestQuote = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

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
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })

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
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      console.log('Submitting form data:', formData)
      
      const { data, error } = await submitFormData(formData)

      if (error) {
        console.error('Submission error:', error)
        throw error
      }

      console.log('Submission successful:', data)

      // Clear form and show success message
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service_type: '',
        project_start: '',
        message: '',
      })

      setSubmitStatus({
        type: 'success',
        message: 'Tack för din förfrågan! Vi återkommer inom kort.',
      })
    } catch (error: any) {
      console.error('Full error object:', error)
      setSubmitStatus({
        type: 'error',
        message: `Ett fel uppstod: ${error.message || 'Okänt fel'}. Vänligen försök igen eller kontakta oss direkt.`,
      })
    } finally {
      setIsSubmitting(false)
    }
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

  return (
    <section id="request-quote" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-secondary sm:text-4xl">
            Begär offert
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Fyll i formuläret nedan så återkommer vi med en offert inom 24 timmar
          </p>
        </motion.div>

        {submitStatus.type && (
          <div
            className={`mb-6 p-4 rounded-md ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Namn *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Företag
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-post *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Telefon *
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service_type" className="block text-sm font-medium text-gray-700">
                  Typ av tjänst *
                </label>
                <select
                  name="service_type"
                  id="service_type"
                  required
                  value={formData.service_type}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:opacity-50"
                >
                  <option value="">Välj tjänst</option>
                  {serviceTypes.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="project_start" className="block text-sm font-medium text-gray-700">
                  Önskat startdatum
                </label>
                <input
                  type="date"
                  name="project_start"
                  id="project_start"
                  value={formData.project_start}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Meddelande *
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:opacity-50"
                placeholder="Beskriv ditt projekt..."
              />
            </div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Skickar...' : 'Skicka förfrågan'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default RequestQuote 