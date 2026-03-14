import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Check if Supabase is configured (vs demo mode)
export const isSupabaseConfigured = () =>
  supabaseUrl.includes('supabase.co') && supabaseKey.length > 20
