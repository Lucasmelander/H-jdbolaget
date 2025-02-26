import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

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

// Type for the enquiry form data
export interface Enquiry {
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