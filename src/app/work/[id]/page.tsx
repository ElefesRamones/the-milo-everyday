import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Sample project data - this would come from a CMS or database in a real application
const projectData: { [key: string]: any } = {
  "1": {
    id: 1,
    title: "Modern Brand Identity",
    category: "Brand Identity",
    client: "TechStart Inc.",
    year: "2024",
    description: "A comprehensive brand identity project for a technology startup focused on sustainable solutions. The challenge was to create a modern, trustworthy brand that appeals to both tech-savvy users and environmentally conscious consumers.",
    challenge: "TechStart needed a brand identity that would differentiate them in the crowded tech startup space while clearly communicating their commitment to sustainability and innovation.",
    solution: "I developed a clean, modern visual identity featuring a custom logo that incorporates subtle environmental elements. The color palette combines tech-forward blues with earth-inspired greens, creating a unique but professional appearance.",
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Adobe InDesign"],
    images: [
      "/placeholder-project-1-1.jpg",
      "/placeholder-project-1-2.jpg",
      "/placeholder-project-1-3.jpg",
      "/placeholder-project-1-4.jpg",
    ],
    deliverables: [
      "Logo design and variations",
      "Color palette and typography",
      "Business card design",
      "Letterhead template",
      "Brand guidelines document",
      "Social media templates",
    ],
  },
  "2": {
    id: 2,
    title: "Restaurant Logo Design",
    category: "Logo Design",
    client: "Fresh Garden Bistro",
    year: "2024",
    description: "Logo design for a local restaurant specializing in fresh, organic ingredients and farm-to-table dining experiences.",
    challenge: "The restaurant needed a logo that would convey freshness, quality, and a connection to local farming while being versatile enough for various applications.",
    solution: "I created a custom logo featuring hand-drawn elements that evoke freshness and artisanal quality. The design balances rustic charm with modern readability.",
    tools: ["Adobe Illustrator", "Adobe InDesign"],
    images: [
      "/placeholder-project-2-1.jpg",
      "/placeholder-project-2-2.jpg",
      "/placeholder-project-2-3.jpg",
    ],
    deliverables: [
      "Primary logo design",
      "Logo variations and lockups",
      "Color and monochrome versions",
      "Usage guidelines",
      "Menu header design",
    ],
  },
  // Add more projects as needed
};

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projectData[id];
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Ramones Capulong`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projectData[id];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Project Header */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/work" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            ← Back to Portfolio
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {project.description}
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Category
                </h3>
                <p className="text-gray-600">{project.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Client
                </h3>
                <p className="text-gray-600">{project.client}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Year
                </h3>
                <p className="text-gray-600">{project.year}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Tools Used
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tools.map((tool: string) => (
                    <span
                      key={tool}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Images */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.images.map((image: string, index: number) => (
              <div key={index} className="bg-gray-200 h-64 md:h-80 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Project Image {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                The Challenge
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {project.challenge}
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                The Solution
              </h2>
              <p className="text-lg text-gray-600">
                {project.solution}
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Deliverables
              </h2>
              <ul className="space-y-3">
                {project.deliverables.map((deliverable: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <span className="text-gray-600">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to Other Projects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Interested in working together?
              </h3>
              <p className="text-gray-600">
                Let's discuss your next project
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/work" className="btn-secondary">
                View More Work
              </Link>
              <Link href="/contact" className="btn-primary">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
