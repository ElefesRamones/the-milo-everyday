// Simple test script to test the contact form API
const testContactForm = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com", 
    projectType: "Logo Design",
    message: "This is a test message to verify the contact form is working."
  };

  try {
    console.log('Testing contact form...');
    const response = await fetch('https://ramonescapulong.com/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    const responseData = await response.json();
    console.log('Response data:', responseData);

    if (response.ok) {
      console.log('✅ Contact form is working!');
    } else {
      console.log('❌ Contact form failed:', responseData.error);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
};

testContactForm();
