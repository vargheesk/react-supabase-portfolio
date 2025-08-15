import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// CORS headers to allow requests from the browser
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Replace with your domain for production
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle preflight requests for CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { subject, body } = await req.json();

    // Create a Supabase client with the service_role key to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1. Fetch the recipient email from the database
    const { data, error } = await supabaseAdmin
      .from('site_config')
      .select('value')
      .eq('key', 'contact_email')
      .single();

    if (error || !data) {
      throw new Error('Could not retrieve contact email from config.');
    }

    const recipientEmail = data.value;

    // 2. Mock sending the email.
    // In a real-world scenario, you would integrate a service like Resend,
    // SendGrid, or Postmark here.
    console.log('--- NEW CONTACT FORM SUBMISSION ---');
    console.log('Recipient:', recipientEmail);
    console.log('Subject:', subject);
    console.log('Body:', body);
    console.log('--- END OF SUBMISSION ---');

    // Example with Resend (would require an API key set as an environment variable)
    /*
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact Form <onboarding@resend.dev>', // Or a custom domain
        to: recipientEmail,
        subject: subject,
        html: `<p>${body}</p>`,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send email: ${await res.text()}`);
    }
    */

    return new Response(JSON.stringify({ message: 'Message sent successfully!' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    return new Response(String(err?.message ?? err), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
