const https = require('https');

console.log('Testing www subdomain environment check...');

const options = {
    hostname: 'www.ramonescapulong.com',
    path: '/api/env-check',
    method: 'GET',
    headers: {
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

req.end();
