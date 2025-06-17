import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://stcmpqlvvkcqjjyclnsg.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Y21wcWx2dmtjcWpqeWNsbnNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTQ0MjAsImV4cCI6MjA2MjM5MDQyMH0._9AAQbcuX3zMi7NUjyQRO138LokX5h08FK4szeMFegY'

console.log('🔄 Initializing Supabase connection...', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
  isUsingEnvVars: !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
})

// Create Supabase client with additional options
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    }
  }
})

// Test connection and table access immediately
;(async () => {
  try {
    console.log('🔍 Testing Supabase connection...')
    const { data: tableData, error: tableError } = await supabase
      .from('form_submissions')
      .select('count')
      .limit(1)

    if (tableError) {
      console.error('❌ Connection test failed:', tableError)
      return
    }

    console.log('✅ Successfully connected to Supabase!')
    console.log('📊 Current form submissions count:', tableData)

  } catch (error) {
    console.error('❌ Connection test failed:', error)
  }
})()

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
  console.log('📝 Submitting form data:', formData)
  
  try {
    // First, verify connection
    const { error: testError } = await supabase
      .from('form_submissions')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ Connection test failed before submission:', testError)
      throw new Error('Database connection failed')
    }

    // Attempt to insert data
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([{
        ...formData,
        status: 'new'
      }])
      .select()

    if (error) {
      console.error('❌ Form submission failed:', {
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      throw error
    }

    console.log('✅ Form submission successful:', data)
    return { data, error: null }
  } catch (error: any) {
    console.error('❌ Form submission error:', {
      message: error?.message,
      details: error?.details,
      hint: error?.hint,
      code: error?.code
    })
    return { data: null, error }
  }
}

// Helper function to check connection
export const checkConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Connection check failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      throw error
    }

    console.log('✅ Connection check successful:', data)
    return { success: true, error: null }
  } catch (error: any) {
    console.error('❌ Connection check error:', {
      message: error?.message,
      details: error?.details,
      hint: error?.hint,
      code: error?.code
    })
    return { success: false, error }
  }
}

export { supabase } 