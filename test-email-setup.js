// Test email notifications setup
const https = require('https');
const { URLSearchParams } = require('url');

async function testFormAndCheckEmail() {
  console.log('🧪 Testing form submission and email setup...\n');
  
  const formData = new URLSearchParams();
  formData.append('form-name', 'contact');
  formData.append('name', 'Email Test User');
  formData.append('email', 'test@example.com');
  formData.append('projectType', 'Logo Design');
  formData.append('message', 'This is a test to verify email notifications are working. If you receive this email, the setup is successful!');

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
    const req = https.request(options, (res) => {
      console.log('✅ Form submission status:', res.statusCode);
      
      let data = '';
      res.on('data', (chunk) => data += chunk);
      
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 302) {
          console.log('✅ Form submitted successfully');
          console.log('📧 Check email: Elefesramones51@gmail.com');
          console.log('🎯 If no email received, follow setup instructions below');
          resolve(true);
        } else {
          console.log('❌ Form submission failed:', data);
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

// Run test and show setup instructions
testFormAndCheckEmail().then(() => {
  console.log('\n📧 EMAIL NOTIFICATION SETUP INSTRUCTIONS:');
  console.log('==========================================');
  console.log('');
  console.log('1. Go to your Netlify dashboard: https://app.netlify.com/');
  console.log('2. Select your site: "ramones-portfolio-new"');
  console.log('3. Go to Site settings → Forms');
  console.log('4. Under "Form notifications", click "Add notification"');
  console.log('5. Choose "Email notification"');
  console.log('6. Set:');
  console.log('   - Form: "contact"');
  console.log('   - Email: "Elefesramones51@gmail.com"');
  console.log('   - Subject: "New Contact Form Submission"');
  console.log('7. Save the notification');
  console.log('');
  console.log('Alternative: Use a third-party email service like:');
  console.log('- SendGrid (free tier: 100 emails/day)');
  console.log('- EmailJS (free tier: 200 emails/month)');
  console.log('- Resend (free tier: 3,000 emails/month)');
  console.log('');
  console.log('🔄 After setup, test again with this script!');
}).catch(err => {
  console.error('Test failed:', err);
});
