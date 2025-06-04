// Test script to check comprehensive environment test endpoint
const https = require('https');

const url = 'https://www.ramonescapulong.com/api/env-test';

https.get(url, (res) => {
  console.log('Env test response status:', res.statusCode);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log('Env test response data:', JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log('Raw response data:', data);
    }
  });
}).on('error', (err) => {
  console.error('Env test error:', err);
});
