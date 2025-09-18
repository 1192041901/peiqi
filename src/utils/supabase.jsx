import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_APP_API;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhzb2tpem5rcGdqZnRyc3Vvamp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjIzMTAsImV4cCI6MjA3MzczODMxMH0.NfcUa-3WtyRFZQ8C0NooBwHWTldMsshhPBU1flwKH9o";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
