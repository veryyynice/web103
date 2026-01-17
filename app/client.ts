import { createClient, type SupabaseClient } from '@supabase/supabase-js';
const URL = 'https://rmwvrzurmsjnqqeiwjlm.supabase.co';
const API_KEY = 'sb_publishable_pvLJ2wLquZkJWuyMQsAGHQ_hfIj601k'; // sb secret


export const supabase: SupabaseClient = createClient(URL, API_KEY);
//
//createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);