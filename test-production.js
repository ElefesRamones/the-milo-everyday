// Test script to send a contact form request to production
const formData = new FormData();
formData.append('name', 'Test User');
formData.append('email', 'test@example.com');
formData.append('message', 'This is a test message to debug the contact form issue');

fetch('https://www.ramonescapulong.com/api/contact', {
  method: 'POST',
  body: formData
})
.then(response => {
  console.log('Response status:', response.status);
  console.log('Response headers:', response.headers);
  return response.text();
})
.then(data => {
  console.log('Response data:', data);
})
.catch(error => {
  console.error('Error:', error);
});
