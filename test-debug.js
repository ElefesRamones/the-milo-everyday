// Test script to check debug endpoint
const https = require('https');

const url = 'https://www.ramonescapulong.com/api/debug';

https.get(url, (res) => {
  console.log('Debug response status:', res.statusCode);
  console.log('Debug response headers:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log('Debug response data:', JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log('Raw response data:', data);
    }
  });
}).on('error', (err) => {
  console.error('Debug error:', err);
});
