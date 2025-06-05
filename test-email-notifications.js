// Test the email notification function directly
const https = require('https');

async function testEmailFunction() {
  console.log('🧪 Testing email notification function...\n');
  
  const testData = {
    name: 'Email Test User',
    email: 'test@example.com',
    projectType: 'Logo Design',
    message: 'This is a test email notification. If you receive this email at elefesramones51@gmail.com, the email system is working correctly!',
    'form-name': 'contact'
  };

  const postData = JSON.stringify(testData);

  const options = {
    hostname: 'ramonescapulong.com',
    port: 443,
    path: '/.netlify/functions/notify-email',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    console.log('📧 Sending test email via function...');
    
    const req = https.request(options, (res) => {
      console.log('Function response status:', res.statusCode);
      console.log('Function response headers:', res.headers);
      
      let data = '';
      res.on('data', (chunk) => data += chunk);
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('Function response:', response);
          
          if (res.statusCode === 200) {
            console.log('✅ Email function executed successfully!');
            console.log('📧 Check elefesramones51@gmail.com for test email');
            resolve(true);
          } else {
            console.log('❌ Email function failed:', response);
            resolve(false);
          }
        } catch (e) {
          console.log('Raw response:', data);
          if (res.statusCode === 200) {
            console.log('✅ Function may have worked (check email)');
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });

    req.on('error', (err) => {
      console.error('❌ Request error:', err);
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

// Also test regular form submission
async function testFormSubmission() {
  console.log('\n🧪 Testing regular form submission...\n');
  
  const formData = new URLSearchParams();
  formData.append('form-name', 'contact');
  formData.append('name', 'Form Test User');
  formData.append('email', 'test@example.com');
  formData.append('projectType', 'Brand Identity');
  formData.append('message', 'This is a test of the regular form submission. Both Netlify and email function should process this.');

  const postData = formData.toString();

  const options = {
    hostname: 'ramonescapulong.com',
    port: 443,
    path: '/contact/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    console.log('📝 Submitting form...');
    
    const req = https.request(options, (res) => {
      console.log('Form submission status:', res.statusCode);
      
      let data = '';
      res.on('data', (chunk) => data += chunk);
      
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 302) {
          console.log('✅ Form submitted successfully');
          resolve(true);
        } else {
          console.log('❌ Form submission failed');
          resolve(false);
        }
      });
    });

    req.on('error', (err) => {
      console.error('❌ Request error:', err);
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

// Run both tests
async function runAllTests() {
  try {
    console.log('🚀 COMPREHENSIVE EMAIL TESTING\n');
    console.log('===============================\n');
    
    // Test 1: Direct email function
    const emailTest = await testEmailFunction();
    
    // Test 2: Regular form submission
    const formTest = await testFormSubmission();
    
    console.log('\n📊 TEST RESULTS:');
    console.log('================');
    console.log('Email function:', emailTest ? '✅ PASSED' : '❌ FAILED');
    console.log('Form submission:', formTest ? '✅ PASSED' : '❌ FAILED');
    
    if (emailTest && formTest) {
      console.log('\n🎉 ALL TESTS PASSED!');
      console.log('📧 Check elefesramones51@gmail.com for test emails');
      console.log('⚠️  If no emails received, check setup instructions below');
    } else {
      console.log('\n⚠️  Some tests failed - check setup needed');
    }
    
    console.log('\n📋 NEXT STEPS IF NO EMAIL RECEIVED:');
    console.log('1. Set up Resend API key for reliable email delivery');
    console.log('2. Check Netlify dashboard form notifications');
    console.log('3. Verify Gmail spam folder');
    
  } catch (error) {
    console.error('Test suite error:', error);
  }
}

runAllTests();
