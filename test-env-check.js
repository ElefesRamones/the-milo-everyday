const https = require('https');

const url = 'https://ramonescapulong.com/api/env-check';

console.log('Testing comprehensive environment check endpoint...');
console.log('URL:', url);

https.get(url, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log('Headers:', res.headers);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log('Environment check data:');
      console.log(JSON.stringify(jsonData, null, 2));
    } catch (error) {
      console.log('Raw response:', data);
    }
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
});
