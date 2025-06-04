import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Ramones Capulong",
  description: "Get in touch with Ramones Capulong for graphic design and content editing projects. Ready to discuss your next creative project.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Let's Work Together
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind? I'd love to hear about it. Whether you need 
            graphic design, content editing, or brand development, let's discuss 
            how we can bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send Me a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Get In Touch
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Email
                  </h3>
                  <p className="text-gray-600 mb-2">
                    For project inquiries and collaborations:
                  </p>
                  <a 
                    href="mailto:Elefesramones51@gmail.com"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Elefesramones51@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Response Time
                  </h3>
                  <p className="text-gray-600">
                    I typically respond to project inquiries within 24-48 hours. 
                    For urgent requests, please mention it in your message.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Project Types
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Logo Design & Brand Identity</li>
                    <li>• Marketing Materials & Graphics</li>
                    <li>• Content Editing & Strategy</li>
                    <li>• Digital Design Projects</li>
                    <li>• Brand Guidelines & Systems</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Current Availability
                  </h3>
                  <p className="text-gray-600">
                    I'm currently accepting new projects. Project timelines 
                    typically range from 1-4 weeks depending on scope and complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What's your design process like?
              </h3>
              <p className="text-gray-600">
                My process begins with understanding your goals and requirements. 
                I then move through research, concept development, design iterations, 
                and final refinements. I keep you involved throughout to ensure 
                the final result exceeds your expectations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How long do projects typically take?
              </h3>
              <p className="text-gray-600">
                Project timelines vary based on scope and complexity. Logo designs 
                typically take 1-2 weeks, while comprehensive brand identity projects 
                may take 3-4 weeks. I'll provide a detailed timeline during our 
                initial consultation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Do you offer revisions?
              </h3>
              <p className="text-gray-600">
                Yes, I include a reasonable number of revisions in all my projects. 
                The exact number depends on the project scope, which we'll discuss 
                upfront. My goal is to ensure you're completely satisfied with the 
                final result.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What file formats do you provide?
              </h3>
              <p className="text-gray-600">
                I provide all necessary file formats for your project needs, 
                including high-resolution files for print (PDF, AI, EPS) and 
                web-optimized formats (PNG, JPG, SVG). You'll receive a complete 
                package with everything you need.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
