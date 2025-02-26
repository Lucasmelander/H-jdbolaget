import { createClient } from '@supabase/supabase-js'

// Hardcoded values for testing
const supabaseUrl = 'https://reluxcsbuhaaedjwgmvc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlbHV4Y3NidWhhYWVkandnbXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1ODcwMDIsImV4cCI6MjA1NjE2MzAwMn0.LMF2MWGnQomhgcWJUbeneXotmH8saaeG_wS3YHEujEE'

console.log('Initializing Supabase with:', { supabaseUrl })

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test connection immediately
console.log('Testing connection...')
supabase.from('form_submissions')
  .select('id')
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error('Connection failed:', error)
    } else {
      console.log('Connection successful:', data)
    }
  })

// Type for the form submission data
export interface FormSubmission {
  id?: number
  created_at?: string
  name: string
  email: string
  phone: string
  company?: string
  message: string
  service_type: string
  project_start?: string
  status?: 'new' | 'in_progress' | 'completed'
}

// Helper function to submit form data
export const submitFormData = async (formData: Omit<FormSubmission, 'id' | 'created_at' | 'status'>) => {
  console.log('Submitting form:', formData)
  
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([{
        ...formData,
        status: 'new'
      }])

    if (error) {
      console.error('Submission failed:', error)
      throw error
    }

    console.log('Submission successful:', data)
    return { data, error: null }
  } catch (error) {
    console.error('Error:', error)
    return { data: null, error }
  }
}

// Helper function to check connection
export const checkConnection = async () => {
  try {
    console.log('Testing Supabase connection...')
    const { data, error } = await supabase
      .from('form_submissions')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Connection test failed:', error)
      throw error
    }

    console.log('Connection test successful:', data)
    return { success: true, error: null }
  } catch (error) {
    console.error('Connection test error:', error)
    return { success: false, error }
  }
}

// Export supabase instance for direct access if needed
export { supabase } 