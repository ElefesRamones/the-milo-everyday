'use client';

import { useState } from 'react';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default to handle submission manually
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus('submitting');
    
    try {
      // Get form data
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      
      console.log('Form submission started...', data);      // Step 1: Send email notification first
      try {
        console.log('Sending email notification...');
        const emailResponse = await fetch('/api/notify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        const emailResult = await emailResponse.text();
        console.log('Email function response:', emailResponse.status, emailResult);
        
        if (emailResponse.ok) {
          console.log('✅ Email notification sent successfully');
        } else {
          console.log('⚠️ Email function failed, but continuing with form submission');
        }
      } catch (emailError) {
        console.log('⚠️ Email function error (continuing anyway):', emailError);
      }
      
      // Step 2: Submit to Netlify forms
      console.log('Submitting to Netlify forms...');
      const netlifyFormData = new URLSearchParams();
      formData.forEach((value, key) => {
        netlifyFormData.append(key, value.toString());
      });
      
      const netlifyResponse = await fetch('/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: netlifyFormData.toString()
      });
      
      console.log('Netlify form response:', netlifyResponse.status);
      
      if (netlifyResponse.ok || netlifyResponse.status === 302) {
        console.log('✅ Form submitted to Netlify successfully');
        setSubmitStatus('success');
        
        // Redirect to success page
        window.location.href = '/success/';
      } else {
        console.log('❌ Netlify form submission failed');
        setSubmitStatus('error');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <form 
        name="contact" 
        method="POST" 
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        action="/success/"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Hidden form name field */}
        <input type="hidden" name="form-name" value="contact" />
        
        {/* Hidden honeypot field */}
        <div style={{ display: 'none' }}>
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </div>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
            placeholder="Your full name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Project Type Field */}
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
            Project Type *
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
          >
            <option value="">Select a project type</option>
            <option value="Logo Design">Logo Design</option>
            <option value="Brand Identity">Brand Identity</option>
            <option value="Digital Graphics">Digital Graphics</option>
            <option value="Content Editing">Content Editing</option>
            <option value="Marketing Materials">Marketing Materials</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors resize-vertical"
            placeholder="Tell me about your project, timeline, and any specific requirements..."
          />
        </div>        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : submitStatus === 'error'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isSubmitting 
              ? 'Sending Email & Submitting...' 
              : submitStatus === 'error'
              ? 'Try Again'
              : 'Send Message'
            }
          </button>
          
          {submitStatus === 'error' && (
            <p className="mt-2 text-sm text-red-600">
              There was an error submitting your form. Please try again or email directly.
            </p>
          )}
        </div>
      </form>

      {/* Alternative Contact */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Prefer Email?
        </h3>
        <p className="text-gray-600 mb-3">
          You can also reach me directly at:
        </p>
        <a 
          href="mailto:Elefesramones51@gmail.com"
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Elefesramones51@gmail.com
        </a>
      </div>
    </div>
  );
};

export default ContactForm;
