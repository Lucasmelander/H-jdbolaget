import { createClient } from '@supabase/supabase-js'

// Hardcoded values for testing
const supabaseUrl = 'https://reluxcsbuhaaedjwgmvc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlbHV4Y3NidWhhYWVkandnbXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1ODcwMDIsImV4cCI6MjA1NjE2MzAwMn0.LMF2MWGnQomhgcWJUbeneXotmH8saaeG_wS3YHEujEE'

console.log('Supabase Configuration:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey
})

// Create Supabase client with additional options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
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

// Test connection and table access
console.log('Testing Supabase connection and table access...')
Promise.all([
  // Test basic connection
  supabase.from('form_submissions').select('count').limit(1),
  // Test insert permission
  supabase.from('form_submissions').insert([{ 
    name: 'test',
    email: 'test@test.com',
    phone: '123456',
    message: 'test',
    service_type: 'test',
    status: 'new'
  }]).select()
]).then(([selectResult, insertResult]) => {
  console.log('Connection test results:', {
    select: {
      success: !selectResult.error,
      error: selectResult.error
    },
    insert: {
      success: !insertResult.error,
      error: insertResult.error
    }
  })
}).catch(error => {
  console.error('Connection test failed:', error)
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
  console.log('Submitting form data:', formData)
  
  try {
    // First, verify connection
    const { error: testError } = await supabase
      .from('form_submissions')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('Connection test failed before submission:', testError)
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
      console.error('Form submission failed:', {
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      throw error
    }

    console.log('Form submission successful:', data)
    return { data, error: null }
  } catch (error: any) {
    console.error('Form submission error:', {
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
      console.error('Connection check failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      throw error
    }

    console.log('Connection check successful:', data)
    return { success: true, error: null }
  } catch (error: any) {
    console.error('Connection check error:', {
      message: error?.message,
      details: error?.details,
      hint: error?.hint,
      code: error?.code
    })
    return { success: false, error }
  }
}

// Export supabase instance for direct access if needed
export { supabase } 