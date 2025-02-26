import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

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

// Helper function to check if Supabase is configured correctly
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('count(*)')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection error:', error)
      return false
    }
    
    console.log('Supabase connection successful')
    return true
  } catch (err) {
    console.error('Failed to connect to Supabase:', err)
    return false
  }
}

// Helper function to submit form data
export const submitFormData = async (formData: Omit<FormSubmission, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([{ ...formData, status: 'new' }])
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error submitting form:', error)
    return { data: null, error }
  }
} 