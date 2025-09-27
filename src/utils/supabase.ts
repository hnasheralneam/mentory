import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://asyuffwwgteelixgoczt.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey || "");

export default supabase;
