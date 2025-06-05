// Final test - forms should now work since Netlify detected them
const https = require('https');
const { URLSearchParams } = require('url');

function testFormSubmission() {
  return new Promise((resolve, reject) => {
    const formData = new URLSearchParams();
    formData.append('form-name', 'contact');
    formData.append('name', 'Test User - Final Check');
    formData.append('email', 'test@example.com');
    formData.append('projectType', 'Logo Design');
    formData.append('message', 'Final test after Netlify detected the forms. This should work now!');

    const postData = formData.toString();

    const options = {
      hostname: 'ramonescapulong.com',
      port: 443,
      path: '/contact/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'FormTest/1.0'
      }
    };

    const req = https.request(options, (res) => {
      console.log('Response status:', res.statusCode);
      console.log('Response headers:', res.headers);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Check for successful submission (redirect to success page)
        if (res.statusCode === 302 || res.statusCode === 301) {
          const location = res.headers.location;
          console.log('✅ SUCCESS! Form submitted and redirected to:', location);
          
          if (location && location.includes('/success')) {
            console.log('🎉 Perfect! Redirected to success page as expected.');
            resolve(true);
          } else {
            console.log('⚠️  Redirected but not to success page');
            resolve(false);
          }
        } else if (res.statusCode === 200 && data.includes('Thank you')) {
          console.log('✅ SUCCESS! Received success page directly.');
          resolve(true);
        } else {
          console.log('❌ Unexpected response:', res.statusCode);
          console.log('Response body preview:', data.substring(0, 300));
          resolve(false);
        }
      });
    });

    req.on('error', (err) => {
      console.error('❌ Request failed:', err);
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

// Run the test
console.log('🧪 Testing form submission after Netlify form detection...\n');
testFormSubmission()
  .then(success => {
    if (success) {
      console.log('\n🎉 FORM SUBMISSION TEST PASSED!');
      console.log('✅ Your contact form is now working correctly!');
      console.log('✅ Form submissions will be captured in your Netlify dashboard');
      console.log('✅ Users will be redirected to the success page after submission');
    } else {
      console.log('\n💔 Form submission test failed. Check the output above for details.');
    }
  })
  .catch(err => {
    console.error('\n💥 Test failed with error:', err);
  });
