// Test script to submit the contact form
const submitForm = async () => {
  const formData = new FormData();
  formData.append('form-name', 'contact');
  formData.append('name', 'Test User');
  formData.append('email', 'test@example.com');
  formData.append('projectType', 'Logo Design');
  formData.append('message', 'This is a test message to verify form submission works.');
  
  try {
    const response = await fetch('https://ramonescapulong.com/contact/', {
      method: 'POST',
      body: formData
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);
    console.log('Response URL:', response.url);
    
    const text = await response.text();
    console.log('Response body:', text.substring(0, 500));
    
    if (response.ok) {
      console.log('✅ Form submission successful!');
    } else {
      console.log('❌ Form submission failed');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

submitForm();
