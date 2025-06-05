// Complete email system test
console.log('🔍 COMPREHENSIVE EMAIL SYSTEM TEST');
console.log('=====================================\n');

// Test 1: Check if Netlify function is deployed
async function testFunction() {
  console.log('1️⃣ Testing Netlify function deployment...');
  
  try {
    const response = await fetch('https://ramonescapulong.com/.netlify/functions/notify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Function Test',
        email: 'test@example.com',
        projectType: 'Logo Design',
        message: 'Testing email function deployment'
      })
    });
    
    const result = await response.text();
    console.log('Function status:', response.status);
    console.log('Function response:', result);
    
    if (response.status === 200) {
      console.log('✅ Email function is deployed and working');
      return true;
    } else {
      console.log('❌ Email function has issues');
      return false;
    }
  } catch (error) {
    console.log('❌ Email function not accessible:', error.message);
    return false;
  }
}

// Test 2: Submit actual form
async function testFormSubmission() {
  console.log('\n2️⃣ Testing form submission...');
  
  try {
    const formData = new URLSearchParams();
    formData.append('form-name', 'contact');
    formData.append('name', 'Email System Test');
    formData.append('email', 'test@example.com');
    formData.append('projectType', 'Brand Identity');
    formData.append('message', 'Testing complete email system after fixes. This should trigger both Netlify form capture AND email notification.');

    const response = await fetch('https://ramonescapulong.com/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });
    
    console.log('Form submission status:', response.status);
    
    if (response.status === 200 || response.status === 302) {
      console.log('✅ Form submission successful');
      return true;
    } else {
      console.log('❌ Form submission failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Form submission error:', error.message);
    return false;
  }
}

// Run tests
async function runTests() {
  const functionTest = await testFunction();
  const formTest = await testFormSubmission();
  
  console.log('\n📊 TEST RESULTS:');
  console.log('================');
  console.log('Email function:', functionTest ? '✅ WORKING' : '❌ NEEDS SETUP');
  console.log('Form submission:', formTest ? '✅ WORKING' : '❌ ISSUE');
  
  console.log('\n📧 EMAIL SETUP STATUS:');
  console.log('=====================');
  
  if (functionTest) {
    console.log('✅ Email function is deployed');
    console.log('⚠️  Emails will be logged until RESEND_API_KEY is configured');
    console.log('');
    console.log('TO RECEIVE ACTUAL EMAILS:');
    console.log('1. Sign up at https://resend.com (free)');
    console.log('2. Get API key from dashboard');
    console.log('3. Add RESEND_API_KEY to Netlify environment variables');
    console.log('4. Emails will work immediately!');
  } else {
    console.log('❌ Email function needs troubleshooting');
  }
  
  console.log('\n✉️  IMMEDIATE ACTION NEEDED:');
  console.log('===========================');
  console.log('📌 Check Gmail spam folder for any existing emails');
  console.log('📌 Set up Resend API for reliable email delivery');
  console.log('📌 Test by submitting form at: https://ramonescapulong.com/contact/');
}

runTests().catch(console.error);
