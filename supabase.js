// supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mwuuzxdmjdzgmrfoqzye.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dXV6eGRtamR6Z21yZm9xenllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczMzg5MzAsImV4cCI6MjAzMjkxNDkzMH0.cmpiTo-RVCqJuT1P7GJetoc6yxNh7q10ND_Xor1GX1k';

export const supabase = createClient(supabaseUrl, supabaseKey);
