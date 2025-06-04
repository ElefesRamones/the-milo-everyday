import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Ramones Capulong",
  description: "Graphic design and content editing portfolio showcasing logo design, brand identity, digital graphics, and content projects.",
};

// Sample portfolio data - this would come from a CMS or database in a real application
const portfolioProjects = [
  {
    id: 1,
    title: "Modern Brand Identity",
    category: "Brand Identity",
    description: "Complete brand identity design for a tech startup including logo, color palette, and guidelines.",
    image: "/placeholder-project-1.jpg",
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
  },
  {
    id: 2,
    title: "Restaurant Logo Design",
    category: "Logo Design",
    description: "Clean and memorable logo design for a local restaurant focusing on fresh, organic ingredients.",
    image: "/placeholder-project-2.jpg",
    tools: ["Adobe Illustrator", "Adobe InDesign"],
  },
  {
    id: 3,
    title: "Social Media Graphics",
    category: "Digital Graphics",
    description: "Engaging social media content and graphics for various campaigns and promotional materials.",
    image: "/placeholder-project-3.jpg",
    tools: ["Adobe Photoshop", "Canva", "Adobe After Effects"],
  },
  {
    id: 4,
    title: "Editorial Content Project",
    category: "Content Editing",
    description: "Content editing and layout design for a quarterly magazine focusing on technology trends.",
    image: "/placeholder-project-4.jpg",
    tools: ["Adobe InDesign", "Grammarly", "Google Docs"],
  },
  {
    id: 5,
    title: "E-commerce Branding",
    category: "Brand Identity",
    description: "Comprehensive branding solution for an online retail store including packaging design.",
    image: "/placeholder-project-5.jpg",
    tools: ["Adobe Creative Suite", "Sketch", "Figma"],
  },
  {
    id: 6,
    title: "Event Poster Series",
    category: "Digital Graphics",
    description: "Eye-catching poster designs for a series of cultural events and festivals.",
    image: "/placeholder-project-6.jpg",
    tools: ["Adobe Photoshop", "Adobe Illustrator"],
  },
];

const categories = ["All", "Logo Design", "Brand Identity", "Digital Graphics", "Content Editing"];

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            My Work
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of my graphic design and content editing projects, showcasing 
            creative solutions across various industries and mediums.
          </p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Project Image */}
                <div className="h-64 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <span className="text-gray-600 text-sm">Project Image</span>
                  </div>
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Link
                      href={`/work/${project.id}`}
                      className="opacity-0 group-hover:opacity-100 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium transition-opacity"
                    >
                      View Project
                    </Link>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-medium">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tools.slice(0, 2).map((tool) => (
                      <span
                        key={tool}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{project.tools.length - 2} more
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/work/${project.id}`}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Like What You See?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let's discuss how we can work together to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Start a Project
            </Link>
            <Link href="/about" className="btn-secondary">
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
