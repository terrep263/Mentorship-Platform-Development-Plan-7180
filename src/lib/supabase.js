import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://yotibvexwnrrohsokzom.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdGlidmV4d25ycm9oc29rem9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTYyODEsImV4cCI6MjA2NjI3MjI4MX0.W5ByPUSLV4aDjiVosQn1zJDtQq-2w112cvyOLRMdSSQ'

if (SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY === '<ANON_KEY>') {
  throw new Error('Missing Supabase variables');
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})