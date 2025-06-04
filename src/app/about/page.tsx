import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Ramones Capulong",
  description: "Learn more about Ramones Capulong, a professional graphic designer and content editor with expertise in visual identity and brand storytelling.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                About Me
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                I'm Ramones (Elefes Ramones Capulong), a passionate graphic designer 
                and content editor dedicated to creating compelling visual stories.
              </p>
              <p className="text-lg text-gray-600">
                With expertise in both visual design and content creation, I help 
                businesses and individuals communicate their message effectively 
                through thoughtful design solutions.
              </p>
            </div>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Professional Photo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Approach */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                My Approach
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                I believe great design starts with understanding. Before diving into 
                any project, I take time to understand your goals, audience, and the 
                story you want to tell.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                My process combines creative exploration with strategic thinking, 
                ensuring that every design decision serves a purpose and contributes 
                to your overall objectives.
              </p>
              <p className="text-lg text-gray-600">
                Whether it's crafting a brand identity or editing content for clarity 
                and impact, I'm committed to delivering work that not only looks 
                exceptional but also achieves results.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What I Do
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Graphic Design
                  </h3>
                  <p className="text-gray-600">
                    Logo design, brand identity, marketing materials, and digital graphics
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Content Editing
                  </h3>
                  <p className="text-gray-600">
                    Content strategy, copywriting, editing for clarity and engagement
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Brand Strategy
                  </h3>
                  <p className="text-gray-600">
                    Visual identity development, brand guidelines, and consistency
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Tools */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Skills & Tools
            </h2>
            <p className="text-lg text-gray-600">
              The creative tools and skills I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Design Tools */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Design Tools
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Adobe Creative Suite</li>
                <li>Adobe Illustrator</li>
                <li>Adobe Photoshop</li>
                <li>Adobe InDesign</li>
                <li>Figma</li>
                <li>Canva</li>
                <li>Sketch</li>
              </ul>
            </div>

            {/* Content Tools */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Content Tools
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Google Workspace</li>
                <li>Microsoft Office</li>
                <li>Grammarly</li>
                <li>Hemingway Editor</li>
                <li>WordPress</li>
                <li>Content Management Systems</li>
                <li>Social Media Platforms</li>
              </ul>
            </div>

            {/* Core Skills */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Core Skills
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Brand Identity Design</li>
                <li>Logo Design</li>
                <li>Typography</li>
                <li>Color Theory</li>
                <li>Content Strategy</li>
                <li>Copy Editing</li>
                <li>Project Management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Touch */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Beyond Design
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            When I'm not designing, I enjoy exploring new creative techniques, 
            staying updated with design trends, and finding inspiration in everyday 
            life. I believe that great design comes from a curious mind and a 
            passion for continuous learning.
          </p>
          <p className="text-lg text-gray-600 mb-12">
            I'm always excited to take on new challenges and collaborate with 
            like-minded individuals and businesses who value the power of good design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/work" className="btn-primary">
              View My Portfolio
            </Link>
            <Link href="/contact" className="btn-secondary">
              Let's Work Together
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
