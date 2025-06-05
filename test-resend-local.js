const https = require('http'); // Using http for localhost

console.log('Testing Resend contact form locally...');

const postData = JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    message: 'Test message using Resend API - this should work!'
});

const options = {
    hostname: 'localhost',
    port: 3004,
    path: '/api/contact',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Node.js Test Client'
    }
};

const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('\nResponse:');
        try {
            const parsed = JSON.parse(data);
            console.log(JSON.stringify(parsed, null, 2));
        } catch (e) {
            console.log(data);
        }
    });
});

req.on('error', (e) => {
    console.error(`Request error: ${e.message}`);
});

req.write(postData);
req.end();
