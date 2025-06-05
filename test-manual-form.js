// Test manual form submission from website
console.log('🧪 TESTING MANUAL FORM SUBMISSION');
console.log('=====================================\n');

// Wait for deployment to complete
console.log('⏳ Waiting for deployment to complete...');

setTimeout(async () => {
  console.log('🚀 Testing form submission that should trigger emails...\n');
  
  try {
    // Test the email function directly first
    console.log('1️⃣ Testing email function directly...');
    const emailTest = await fetch('https://ramonescapulong.com/.netlify/functions/notify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Manual Form Test',
        email: 'test@example.com',
        projectType: 'Logo Design',
        message: 'This is a test from the updated contact form. You should receive this email at elefesramones51@gmail.com if the manual form submission is working correctly.',
        'form-name': 'contact'
      })
    });
    
    const emailResult = await emailTest.text();
    console.log('Email function status:', emailTest.status);
    console.log('Email function response:', emailResult);
    
    if (emailTest.ok) {
      console.log('✅ Email function is working!');
      console.log('📧 Check elefesramones51@gmail.com for the test email');
    } else {
      console.log('❌ Email function failed');
    }
    
    console.log('\n📝 NEXT STEPS:');
    console.log('==============');
    console.log('1. Go to: https://ramonescapulong.com/contact/');
    console.log('2. Fill out the contact form');
    console.log('3. Submit the form');
    console.log('4. Check browser console for logs');
    console.log('5. Check elefesramones51@gmail.com for email notification');
    console.log('');
    console.log('🔍 The form now:');
    console.log('   ✅ Sends email notification FIRST');
    console.log('   ✅ Then submits to Netlify forms');
    console.log('   ✅ Shows detailed logging in console');
    console.log('   ✅ Redirects to success page');
    console.log('');
    console.log('📊 Expected behavior:');
    console.log('   1. Form shows "Sending Email & Submitting..."');
    console.log('   2. Email is sent to elefesramones51@gmail.com');
    console.log('   3. Form is submitted to Netlify');
    console.log('   4. User is redirected to success page');
    
  } catch (error) {
    console.error('Test error:', error);
  }
}, 5000); // Wait 5 seconds for deployment
