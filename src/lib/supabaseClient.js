import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mbhdhaogojrkmzqrzptg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iaGRoYW9nb2pya216cXJ6cHRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjY3MjgsImV4cCI6MjA3MDg0MjcyOH0.tttRFyu8zo6R_UEZRiRs1xrkJagl8m8MrSrwEUdb8TY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
