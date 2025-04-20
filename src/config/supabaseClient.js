import { createClient } from "@supabase/supabase-js";

// import dotenv from 'dotenv';
// dotenv.config();

const supabaseUrl = import.meta.env.VITE_SUPERBASE_URL;
const supabaseKey = import.meta.env.VITE_SUPERBASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
