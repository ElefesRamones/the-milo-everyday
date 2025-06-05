// Test form submission after enabling form detection
async function testFormSubmission() {
  console.log('Testing form submission to:', 'https://ramonescapulong.com/contact/');
  
  const formData = new FormData();
  formData.append('form-name', 'contact');
  formData.append('name', 'Test User - Form Detection Enabled');
  formData.append('email', 'test@example.com');
  formData.append('projectType', 'Logo Design');
  formData.append('message', 'Test message after enabling form detection in Netlify dashboard.');
  
  try {
    const response = await fetch('https://ramonescapulong.com/contact/', {
      method: 'POST',
      body: formData,
      redirect: 'manual' // Don't follow redirects automatically
    });
    
    console.log('Response status:', response.status);
    console.log('Response type:', response.type);
    console.log('Response redirected:', response.redirected);
    console.log('Response URL:', response.url);
    
    // Check for redirect
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      console.log('✅ Form submitted successfully! Redirect to:', location);
      return true;
    }
    
    // Check if we got a success response
    if (response.status === 200) {
      const text = await response.text();
      if (text.includes('Thank you') || text.includes('success')) {
        console.log('✅ Form submitted successfully! Success page returned.');
        return true;
      }
    }
    
    console.log('❌ Unexpected response status:', response.status);
    const text = await response.text();
    console.log('Response body preview:', text.substring(0, 200));
    return false;
    
  } catch (error) {
    console.error('❌ Error submitting form:', error);
    return false;
  }
}

// Run the test
testFormSubmission().then(success => {
  if (success) {
    console.log('\n🎉 Form submission test PASSED!');
  } else {
    console.log('\n💔 Form submission test FAILED. Check the logs above.');
  }
});
