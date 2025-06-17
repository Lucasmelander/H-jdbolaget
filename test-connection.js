import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://stcmpqlvvkcqjjyclnsg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Y21wcWx2dmtjcWpqeWNsbnNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTQ0MjAsImV4cCI6MjA2MjM5MDQyMH0._9AAQbcuX3zMi7NUjyQRO138LokX5h08FK4szeMFegY'

console.log('Testing Supabase connection with:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey
})

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    // Test 1: Basic connection
    console.log('\n🔍 Test 1: Testing basic connection...')
    const { data: testData, error: testError } = await supabase
      .from('form_submissions')
      .select('count')
      .limit(1)
    
    if (testError) {
      throw new Error(`Connection test failed: ${testError.message}`)
    }
    console.log('✅ Connection successful!')

    // Test 2: Check table structure
    console.log('\n🔍 Test 2: Checking table structure...')
    const { data: tableData, error: tableError } = await supabase
      .from('form_submissions')
      .select('*')
      .limit(1)
    
    if (tableError) {
      throw new Error(`Table structure check failed: ${tableError.message}`)
    }
    console.log('✅ Table structure verified!')
    console.log('Current data:', tableData)

    // Test 3: Test insert
    console.log('\n🔍 Test 3: Testing insert capability...')
    const testSubmission = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '123-456-7890',
      message: 'This is a test submission',
      service_type: 'Test Service',
      status: 'new'
    }

    const { data: insertData, error: insertError } = await supabase
      .from('form_submissions')
      .insert([testSubmission])
      .select()

    if (insertError) {
      throw new Error(`Insert test failed: ${insertError.message}`)
    }
    console.log('✅ Insert test successful!')
    console.log('Inserted data:', insertData)

    // Test 4: Clean up test data
    console.log('\n🔍 Test 4: Cleaning up test data...')
    const { error: deleteError } = await supabase
      .from('form_submissions')
      .delete()
      .eq('email', 'test@example.com')

    if (deleteError) {
      throw new Error(`Cleanup failed: ${deleteError.message}`)
    }
    console.log('✅ Test data cleaned up successfully!')

    console.log('\n✨ All tests passed successfully!')
  } catch (error) {
    console.error('\n❌ Test failed:', error.message)
    process.exit(1)
  }
}

testConnection() 