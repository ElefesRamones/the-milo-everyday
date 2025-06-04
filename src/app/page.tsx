import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Hi, I'm <span className="text-blue-600">Ramones</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-4">
            Graphic Designer & Content Editor
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Creating compelling visual solutions and engaging content that tells your story effectively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/work" className="btn-primary">
              View My Work
            </Link>
            <Link href="/contact" className="btn-secondary">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-gray-600">
              Some of my recent projects in graphic design and content editing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project placeholders - these will be populated with real content */}
            {[1, 2, 3].map((project) => (
              <div key={project} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Project Image {project}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Project Title {project}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Brief description of this graphic design project and its objectives.
                  </p>
                  <Link 
                    href={`/work/project-${project}`}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    View Project →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/work" className="btn-secondary">
              View All Work
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                About Me
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                I'm a passionate graphic designer and content editor with expertise in creating 
                visual identities, digital graphics, and compelling content that resonates with audiences.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                My approach combines creativity with strategic thinking to deliver designs that 
                not only look great but also achieve your business goals.
              </p>
              <Link href="/about" className="btn-primary">
                Learn More About Me
              </Link>
            </div>
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Professional Photo</span>
            </div>
          </div>
        </div>
      </section>

            {/* Contact Section */}
      <section className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Ready to bring your vision to life? I'd love to hear about your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start a Project
            </Link>
            <a 
              href="mailto:Elefesramones51@gmail.com"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Elefesramones51@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
