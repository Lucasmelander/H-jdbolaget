import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

console.log('Initializing Supabase client with:', {
  url: supabaseUrl,
  hasAnonKey: !!supabaseAnonKey
})

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: true,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    }
  }
})

// Type for the form submission data
export interface FormSubmission {
  id?: number
  created_at?: string
  updated_at?: string
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
export const submitFormData = async (formData: Omit<FormSubmission, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
  try {
    console.log('Validating form data...')
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'service_type', 'message'] as const
    const missingFields = requiredFields.filter(field => !formData[field]?.trim())
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
    }

    console.log('Preparing data for submission...')
    const dataToSubmit = {
      ...formData,
      status: 'new' as const,
      // Ensure dates are in ISO format
      project_start: formData.project_start ? new Date(formData.project_start).toISOString() : null,
      // Trim all string fields
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company?.trim() || null,
      message: formData.message.trim(),
      service_type: formData.service_type.trim(),
    }

    console.log('Submitting to Supabase:', dataToSubmit)
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([dataToSubmit])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    console.log('Submission successful:', data)
    return { data, error: null }
  } catch (error) {
    console.error('Error in submitFormData:', error)
    return { data: null, error }
  }
}

// Helper function to check connection
export const checkConnection = async () => {
  try {
    console.log('Checking Supabase connection...')
    const { data, error } = await supabase
      .from('form_submissions')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Connection check failed:', error)
      throw error
    }

    console.log('Connection successful:', data)
    return { success: true, error: null }
  } catch (error) {
    console.error('Connection error:', error)
    return { success: false, error }
  }
}

// Test function to verify data insertion
export const testInsert = async () => {
  try {
    console.log('Testing data insertion...')
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '123-456-7890',
      message: 'This is a test submission',
      service_type: 'Ställningar',
    }

    const { data, error } = await supabase
      .from('form_submissions')
      .insert([{ ...testData, status: 'new' }])
      .select()

    if (error) {
      console.error('Test insert error:', error)
      return false
    }

    console.log('Test insert successful:', data)
    return true
  } catch (err) {
    console.error('Test insert failed:', err)
    return false
  }
} 