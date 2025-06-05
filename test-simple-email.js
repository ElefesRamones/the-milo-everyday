// Simple email function test
const https = require('https');

console.log('🧪 Testing email function...');

const testData = {
  name: 'Test User',
  email: 'test@example.com',
  projectType: 'Logo Design',
  message: 'Test email notification'
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

const req = https.request(options, (res) => {
  console.log('Status:', res.statusCode);
  
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Response:', data);
    
    if (res.statusCode === 200) {
      console.log('✅ Function works! Check elefesramones51@gmail.com');
    } else {
      console.log('❌ Function error - check setup');
    }
  });
});

req.on('error', (err) => {
  console.error('Error:', err.message);
});

req.write(postData);
req.end();
