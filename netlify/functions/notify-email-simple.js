// Simple email notification handler for Netlify
exports.handler = async (event, context) => {
  console.log('=== EMAIL FUNCTION TRIGGERED ===');
  console.log('Method:', event.httpMethod);
  console.log('Path:', event.path);
  console.log('Headers:', JSON.stringify(event.headers, null, 2));
  console.log('Body:', event.body);
  
  // CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    let formData;
    
    // Parse form data from different sources
    console.log('Parsing form data...');
    
    if (event.headers['content-type']?.includes('application/json')) {
      console.log('Parsing JSON data');
      const jsonData = JSON.parse(event.body);
      formData = jsonData;
    } else if (event.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
      console.log('Parsing URL encoded data');
      const urlParams = new URLSearchParams(event.body);
      formData = Object.fromEntries(urlParams.entries());
    } else {
      console.log('Parsing as URL encoded (fallback)');
      const urlParams = new URLSearchParams(event.body);
      formData = Object.fromEntries(urlParams.entries());
    }
    
    console.log('Parsed form data:', formData);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      console.log('Missing required fields');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          received: formData 
        })
      };
    }

    // For now, just log the submission and return success
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('Name:', formData.name);
    console.log('Email:', formData.email);
    console.log('Project Type:', formData.projectType);
    console.log('Message:', formData.message);
    console.log('Timestamp:', new Date().toISOString());
    console.log('================================');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Email notification logged successfully',
        submission: {
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message,
          timestamp: new Date().toISOString()
        }
      })
    };

  } catch (error) {
    console.error('Error in email function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        details: error.message
      })
    };
  }
};
