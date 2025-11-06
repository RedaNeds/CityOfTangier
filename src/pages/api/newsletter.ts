import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    if (!email) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Email is required' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid email format' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Here you would typically:
    // 1. Save the email to your database
    // 2. Send a confirmation email
    // 3. Add to your newsletter service (Mailchimp, ConvertKit, etc.)
    
    // For now, we'll just log it and return success
    console.log('Newsletter signup:', email);

    // Redirect to a success page or return success response
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/?newsletter=success'
      }
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Something went wrong. Please try again.' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};


