"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Calendar, Archive, MapPin } from "lucide-react"
import { InstallationModal } from "@/components/installation-modal"

interface Project {
  id: string
  title: string
  year: string
  category: string
  medium: string
  description: string
  detailedDescription?: string
  image: string
  location?: string
  status?: string
  tags: string[]
  photoCount?: number
  slidesLayout?: number[]
  instagramUrl?: string
  images?: string[]
}

const archiveProjects: Project[] = [
  {
    id: "msfts-ethiopia-skate-photos",
    title: "MSFTS x Ethiopia Skate",
    year: "2024",
    category: "Archive",
    medium: "Photography archive",
    description: "Comprehensive photographic archive from the MSFTS x Ethiopia skateboarding collaboration.",
    detailedDescription: "",
    image: "/images/webp/05_Archive/01_MSFTS x Ethiopia skate photos/c1.webp?height=600&width=800&text=MSFTS+Skate+Archive",
    location: "Studio Archive",
    status: "Digital Archive",
    tags: ["photography", "skateboarding", "behind-the-scenes", "collaboration"],
    photoCount: 24,
    images: [
      // 5 landscape photos (16:9 ratio)
      "/placeholder.svg?height=600&width=1067&text=MSFTS+Landscape+1",
      "/placeholder.svg?height=600&width=1067&text=MSFTS+Landscape+2",
      "/placeholder.svg?height=600&width=1067&text=MSFTS+Landscape+3",
      "/placeholder.svg?height=600&width=1067&text=MSFTS+Landscape+4",
      "/placeholder.svg?height=600&width=1067&text=MSFTS+Landscape+5",
      // 19 portrait photos (9:16 ratio)
      ...Array.from({ length: 19 }, (_, i) => `/placeholder.svg?height=1067&width=600&text=MSFTS+Portrait+${i + 1}`),
    ],
  },
  {
    id: "tilla-photoshoot",
    title: "Tilla Photoshoot",
    year: "2023",
    category: "Archive",
    medium: "Fashion photography",
    description:
      "Archive of a fashion photoshoot exploring traditional Ethiopian gold jewelry and contemporary styling.",
    detailedDescription:
      "Tilla, meaning gold in Amharic, was a photoshoot that explored the beauty and cultural significance of traditional Ethiopian gold jewelry, combining heritage pieces with contemporary fashion. This archive contains 4 carefully curated photographs that capture the intersection of traditional craftsmanship and modern aesthetic sensibilities.",
    image: "/images/webp/05_Archive/02_tilla photoshoot/a1.webp?height=600&width=800&text=Tilla+Photoshoot+Archive",
    location: "Studio Archive",
    status: "Fashion Archive",
    tags: ["fashion", "jewelry", "traditional", "gold"],
    photoCount: 4,
    images: Array.from({ length: 4 }, (_, i) => `/placeholder.svg?height=800&width=600&text=Tilla+Photo+${i + 1}`),
  },
  {
    id: "in-red-photos-archive",
    title: "In Red",
    year: "2022",
    category: "Archive",
    medium: "Artistic photography",
    description:
      "A photographic series exploring the color red in Ethiopian culture, from traditional clothing to landscapes.",
    detailedDescription:
      "This photographic series documents the significance of red in Ethiopian culture, capturing everything from traditional red clothing and ceremonial objects to natural red landscapes and architectural elements. Contains 7 striking photographs that reveal the deep cultural meanings and emotional associations of this powerful color.",
    image: "/images/webp/05_Archive/03_In red/a1.webp?height=600&width=800&text=In+Red+Archive",
    location: "Various locations",
    status: "Artistic Archive",
    tags: ["color study", "cultural significance", "photography", "red"],
    photoCount: 6,
    images: [
      // 3 small 9:16 images
      "/placeholder.svg?height=800&width=450&text=In+Red+Portrait+1",
      "/placeholder.svg?height=800&width=450&text=In+Red+Portrait+2",
      "/placeholder.svg?height=800&width=450&text=In+Red+Portrait+3",
      // 3 landscape images
      "/placeholder.svg?height=600&width=800&text=In+Red+Landscape+1",
      "/placeholder.svg?height=600&width=800&text=In+Red+Landscape+2",
      "/placeholder.svg?height=600&width=800&text=In+Red+Landscape+3",
    ],
  },
  {
    id: "portal-to-u-thiopia-archive",
    title: "Portal to U-thiopia",
    year: "2022",
    category: "Archive",
    medium: "Conceptual photography",
    description: "Conceptual photographs imagining alternative realities and utopian visions of Ethiopian society.",
    detailedDescription:
      "This conceptual series creates visual portals to imagined versions of Ethiopia, exploring themes of possibility, hope, and alternative futures through surreal and dreamlike imagery. Features 4 conceptual photographs that challenge viewers to imagine different possibilities for Ethiopian society and culture.",
    image: "/images/webp/05_Archive/04_Portal to Uthiopia/j.webp?height=600&width=800&text=Portal+U-thiopia+Archive",
    location: "Conceptual Archive",
    status: "Conceptual Archive",
    tags: ["conceptual", "utopia", "alternative reality", "surreal"],
    photoCount: 4,
    images: Array.from({ length: 4 }, (_, i) => `/placeholder.svg?height=800&width=450&text=Portal+U-thiopia+${i + 1}`),
  },
  {
    id: "decoding-legends-photos-archive",
    title: "Decoding Legends",
    year: "2021",
    category: "Archive",
    medium: "Documentary photography",
    description: "Photographic documentation supporting the Decoding Legends film series and installation work.",
    detailedDescription:
      "This archive contains 3 key photographs from the extensive research and documentation that supported the Decoding Legends project, including location scouting, cultural research, and process documentation that provided the foundation for the larger multimedia project.",
    image: "/images/webp/05_Archive/05_Decoding legends/a2.webp?height=600&width=800&text=Decoding+Legends+Archive",
    location: "Research Archive",
    status: "Research Collection",
    tags: ["documentary", "research", "legends", "cultural documentation"],
    photoCount: 3,
    images: Array.from({ length: 3 }, (_, i) => `/placeholder.svg?height=800&width=450&text=Decoding+Doc+${i + 1}`),
  },
  {
    id: "to-identify-photos-archive",
    title: "To Identify",
    year: "2021",
    category: "Archive",
    medium: "Identity exploration",
    description:
      "Personal photographic exploration of individual and collective identity within Ethiopian diaspora communities.",
    detailedDescription:
      "To Identify is a personal photographic project exploring questions of identity, belonging, and cultural connection within Ethiopian diaspora communities around the world. Contains 18 photographs arranged in a specific narrative sequence: 1 photo in the first carousel slide, 5 photos in the second carousel slide, 7 in the third, and 6 in the fourth, creating a visual journey through themes of identity and belonging.",
    image: "/images/webp/05_Archive/06_To identify/vnfn.webp?height=600&width=800&text=To+Identify+Archive",
    location: "Global locations",
    status: "Personal Archive",
    tags: ["identity", "diaspora", "personal", "belonging"],
    photoCount: 18,
    slidesLayout: [1, 5, 7, 6], // 1 photo in first slide, 5 in second slide, 7 in third, 6 in fourth
    images: [
      // 17 small 9:16 images
      ...Array.from(
        { length: 17 },
        (_, i) => `/placeholder.svg?height=800&width=450&text=To+Identify+Portrait+${i + 1}`,
      ),
      // 1 landscape image
      "/placeholder.svg?height=600&width=800&text=To+Identify+Landscape+1",
    ],
  },
  {
    id: "tibeb-be-adebabay-archive",
    title: "Tibeb Be Adebabay",
    year: "2021",
    category: "Archive",
    medium: "Cultural documentation",
    description:
      "Photographic documentation of traditional Ethiopian art forms and their contemporary interpretations.",
    detailedDescription:
      "Tibeb Be Adebabay (meaning 'art in Addis Ababa') documents the rich artistic traditions of Ethiopia's capital city, capturing both traditional art forms and their contemporary evolution. Features 4 documentary photographs that showcase the continuity and transformation of artistic practices in urban Ethiopian contexts.",
    image: "/images/webp/05_Archive/07_Tibeb be Abebabay/a1.webp?height=600&width=800&text=Tibeb+Be+Adebabay+Archive",
    location: "Addis Ababa, Ethiopia",
    status: "Cultural Archive",
    tags: ["cultural documentation", "traditional art", "contemporary", "addis ababa"],
    photoCount: 4,
    images: Array.from({ length: 4 }, (_, i) => `/placeholder.svg?height=800&width=450&text=Tibeb+${i + 1}`),
  },
  {
    id: "vibrant-hues-archive",
    title: "Vibrant Hues",
    year: "2020",
    category: "Archive",
    medium: "Color studies",
    description: "An exploration of color in Ethiopian culture, from traditional dyes to contemporary color palettes.",
    detailedDescription: "",
    image: "/images/webp/05_Archive/08_vibrant hues/expt 1/a2.webp?height=600&width=800&text=Vibrant+Hues+Archive",
    location: "Color Archive",
    status: "Study Collection",
    tags: ["color theory", "traditional dyes", "cultural meaning", "design"],
    photoCount: 18,
    images: [
      // 11 small 9:16 images
      ...Array.from({ length: 11 }, (_, i) => `/placeholder.svg?height=800&width=450&text=Vibrant+Portrait+${i + 1}`),
      // 7 landscape images
      ...Array.from({ length: 7 }, (_, i) => `/placeholder.svg?height=600&width=800&text=Vibrant+Landscape+${i + 1}`),
    ],
  },
  {
    id: "graphic-posters-illustrations-archive",
    title: "Graphic Posters",
    year: "2020",
    category: "Archive",
    medium: "Graphic design",
    description: "Collection of graphic design work including posters and visual identity projects.",
    detailedDescription:
      "This archive contains 5 graphic design projects including event posters and editorial work that explore Ethiopian cultural themes through contemporary design approaches. The collection demonstrates the application of traditional cultural elements within modern graphic design frameworks.",
    image: "/images/webp/05_Archive/09_Graphic posters/04_Hulet neteb.webp?height=600&width=800&text=Graphic+Posters+Archive",
    location: "Design Archive",
    status: "Design Collection",
    tags: ["graphic design", "posters", "visual identity", "cultural themes"],
    instagramUrl: "https://www.instagram.com/red_studyo/",
    photoCount: 5,
    images: Array.from({ length: 5 }, (_, i) => `/placeholder.svg?height=800&width=600&text=Graphic+Design+${i + 1}`),
  },
]

export default function ArchivePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const getCategoryColor = (category: string) => {
    return "text-neutral-500"
  }

  const getCategoryBg = (category: string) => {
    return "bg-neutral-500/10 border-neutral-500/20"
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects/archive" />

      <main className="pt-32 pb-20">
        <div className="w-full px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6">Archive</h1>
          </div>

          {/* Projects Grid - Full width with proper alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {archiveProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
                onClick={() => handleProjectClick(project)}
              >
                <div className="rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Category Badge */}
                    <div
                      className={`absolute top-4 left-4 flex items-center space-x-2 px-3 py-1 rounded-full border backdrop-blur-sm ${getCategoryBg(project.category)}`}
                    >
                      <Archive className={`h-4 w-4 ${getCategoryColor(project.category)}`} />
                      <span className={`text-xs font-medium capitalize ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Status Badge */}
                    {project.status && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-neutral-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {project.status}
                        </div>
                      </div>
                    )}

                    {/* Instagram Badge for Graphic Posters */}
                    {project.instagramUrl && (
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="text-center space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="text-white text-sm font-medium">View Archive</div>
                        <div className="w-8 h-px bg-white/50 mx-auto" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-light leading-tight text-black group-hover:text-neutral-600 transition-colors duration-300">
                        {project.title}
                      </h3>

                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1 text-neutral-500">
                          <Calendar className="h-3 w-3" />
                          <span>{project.year}</span>
                        </div>
                        {project.location && (
                          <div className="flex items-center space-x-1 text-neutral-500">
                            <MapPin className="h-3 w-3" />
                            <span>{project.location}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-neutral-400">{project.medium}</p>
                    </div>

                    <p className="text-sm leading-relaxed text-neutral-600 line-clamp-3">
                      {project.description}
                      {project.instagramUrl && (
                        <span className="inline-flex items-center ml-2 text-purple-600">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                          Instagram
                        </span>
                      )}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs rounded-full bg-neutral-100 text-neutral-600">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Photo Count */}
                    <div className="text-xs text-neutral-400">
                      {project.photoCount && `${project.photoCount} photos`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram link at bottom */}
          <div className="mt-16 text-center">
            <a
              href="https://www.instagram.com/red_studyo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-neutral-600 hover:text-black transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>@red_studyo</span>
            </a>
          </div>
        </div>
      </main>

      {/* Archive Modal */}
      {selectedProject && <InstallationModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  )
}
