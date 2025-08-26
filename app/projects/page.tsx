"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import ProjectTimeline from "@/components/project-timeline"

const allProjectsData = [
  // 2025 Projects
  {
    id: "skins-dire-dawa",
    title: "sKINs: Dire Dawa",
    year: 2025,
    category: "Films",
    medium: "Documentary Film",
    description: "A documentary exploring the textile traditions and cultural identity of Dire Dawa, Ethiopia.",
    detailedDescription:
      "sKINs: Dire Dawa is a documentary that delves into the intricate relationship between skin, fabric, and cultural memory in Eastern Ethiopia. This film explores how traditional textile practices continue to shape contemporary identity in Dire Dawa, examining the connections between personal and cultural narratives through the lens of textile heritage. Available through private Google Drive link.",
    image: "/placeholder.svg?height=600&width=800&text=sKINs+Dire+Dawa",
    featured: true,
    awards: ["Best Documentary - Addis Film Festival 2025"],
    visitors: "15K",
    tags: ["documentary", "textile", "culture", "ethiopia"],
    videoUrl: "Private Google Drive link",
    location: "Dire Dawa, Ethiopia",
  },
  {
    id: "skins-east-ethiopia",
    title: "sKINs: East Ethiopia Textile Installation",
    year: 2025,
    category: "Installation",
    medium: "Large-scale textile installation",
    description:
      "An immersive textile installation exploring the relationship between skin, fabric, and cultural identity in Eastern Ethiopia.",
    detailedDescription:
      "This large-scale installation features traditional textiles from Eastern Ethiopia arranged in a contemporary gallery context, creating dialogue between historical textile practices and modern artistic expression. The work transforms gallery space into a meditation on cultural memory and material heritage. Currently available for sale, this installation represents the culmination of extensive research into Ethiopian textile traditions.",
    image: "/images/webp/02_Installations/01_sKINs_East_Ethiopia_textile_installation/01_front.webp",
    featured: true,
    awards: ["Installation of the Year 2025"],
    visitors: "25K",
    tags: ["textile", "identity", "cultural heritage", "for sale"],
    materials: ["Traditional textiles", "Contemporary display systems", "Lighting", "Sound"],
    photoCount: 4,
    imageDescriptions: [
      "Front side view/suspended tent structure incapsulating the sKins film screening within/, hand dyed and embroidered textile mixed with traditional garment fabrics of Dire Dawa, 2025",
      "Right side view, black textile, silver string textile knotted, love letter of the artists' parents from the 80's encapsulated, 2025",
      "Left side view, hand printed yellow floral textile with cutouts, and embroidery mixed with traditional garment fabrics of Dire Dawa, 2025.",
      "Back side view, black tea dyed textile with hand embroidery, Image of artists' mother form 80's, henna paste hand painted decorative art, 2025.",
    ],
    images: Array.from({ length: 4 }, (_, i) => `/placeholder.svg?height=800&width=600&text=sKINs+East+${i + 1}`),
    position: "Textile Artist, Director, Producer, Cinematographer, Writer",
  },
  {
    id: "yal-exhibition",
    title: "YAL Exhibition",
    year: 2025,
    category: "Installation",
    medium: "Mixed media exhibition",
    description: "YAL / Ye Abayn Lij explores ritual and design, named for the paradox of lacking one's own abundance.",
    detailedDescription:
      "The YAL (Young African Leaders) exhibition features multimedia installations that examine leadership, youth culture, and artistic innovation in modern Ethiopia. The exhibition includes 17 distinct photographic works alongside an immersive walkthrough video experience that guides viewers through the conceptual framework of contemporary Ethiopian artistic practice.",
    image: "/images/webp/02_Installations/02_YAL_exhibition_photos_2025/IMG_2859.webp",
    featured: false,
    awards: [],
    visitors: "18K",
    tags: ["contemporary", "multimedia", "youth", "leadership"],
    materials: ["Photography", "Video installations", "Interactive displays", "Sound systems"],
    photoCount: 17,
    videoUrl: "https://drive.google.com/file/d/1AV8mLySkKCYWztSNfcE5uOuKVSwCGzb7/view?usp=sharing",
    images: Array.from({ length: 17 }, (_, i) => `/placeholder.svg?height=800&width=600&text=YAL+Exhibition+${i + 1}`),
    position: "Textile Artist and curator",
  },
  {
    id: "heart-of-a-child",
    title: "Heart of a Child",
    year: 2025,
    category: "Commissioned",
    medium: "Commercial film",
    description:
      "A heartwarming commercial film exploring childhood innocence and dreams through Ethiopian cultural lens.",
    detailedDescription:
      "Heart of a Child is a heartwarming commercial film that captures the universal experience of childhood while celebrating specifically Ethiopian cultural values, family structures, and community relationships. The film combines professional commercial production values with authentic cultural storytelling, creating an emotionally resonant piece that speaks to both local and international audiences.",
    image: "/placeholder.svg?height=600&width=800&text=Heart+of+a+Child",
    featured: false,
    awards: [],
    visitors: "10K",
    tags: ["commercial", "childhood", "cultural values", "emotional"],
    type: "film",
    videoUrl: "https://youtu.be/bLUtlsYxqpU?si=eU5MdCaaTsTjOGsJ",
    position: "Art director",
    duration: "3:45",
  },
  {
    id: "skins-north-ethiopia",
    title: "sKINs: North Ethiopia",
    year: 2025,
    category: "In Studio",
    medium: "Photography and documentation",
    description:
      "This sub-collection honors ancestral skin markings as symbols of protection, beauty, and spirituality. Inspired by the artist's late great-grandmother, transforms these sacred symbols into garments that carry memory, meaning, and resilience.",
    detailedDescription:
      "This studio-based work involves extensive field research and documentation of cultural practices related to body modification, traditional scarification, and ceremonial body art in Northern Ethiopian communities. The project serves as both artistic exploration and cultural preservation, creating a visual archive of practices that connect contemporary Ethiopian identity to ancestral traditions.",
    image: "/images/webp/03_In studyo/sKINs_ North Ethiopia/skins-all_04.webp",
    featured: false,
    awards: [],
    visitors: "6K",
    tags: ["documentation", "photography", "cultural practices", "preservation"],
    images: Array.from({ length: 4 }, (_, i) => `/placeholder.svg?height=800&width=600&text=sKINs+North+${i + 1}`),
    position: "Director, cinematographer, writer, and Textile Artist",
  },
  {
    id: "yal-studio",
    title: "YAL",
    year: 2025,
    category: "In Studio",
    medium: "Mixed media studio work",
    description: "YAL / Ye Abayn Lij explores ritual and design, named for the paradox of lacking one's own abundance.",
    detailedDescription:
      "This studio-based work involves extensive field research and documentation of cultural practices related to body modification, traditional scarification, and ceremonial body art in Northern Ethiopian communities. The project serves as both artistic exploration and cultural preservation, creating a visual archive of practices that connect contemporary Ethiopian identity to ancestral traditions.",
    image: "images/webp/03_In studyo/YAL/YAL project photo.webp?height=600&width=800&text=YAL+Studio",
    featured: false,
    awards: [],
    visitors: "8K",
    tags: ["documentation", "photography", "cultural practices", "preservation"],
    videoUrl: "/placeholder.svg?height=1080&width=1920&text=YAL+Video",
    position: "Textile Artist and curator",
  },
  {
    id: "sheret-project",
    title: "Sheret Project",
    year: 2025,
    category: "In Studio",
    medium: "Textile research",
    description:
      "The Sheret/Sarong is a tubular textile from Indonesia, used in East Africa for hot climates, rituals, and protection, and to wrap fallen soldiers.",
    detailedDescription:
      "This studio-based work involves extensive field research and documentation of cultural practices related to body modification, traditional scarification, and ceremonial body art in Northern Ethiopian communities. The project serves as both artistic exploration and cultural preservation, creating a visual archive of practices that connect contemporary Ethiopian identity to ancestral traditions.",
    image: "/images/webp/03_In studyo/Sheret Projects/b.webp?height=600&width=800&text=Sheret+Project",
    featured: false,
    awards: [],
    visitors: "5K",
    tags: ["documentation", "photography", "cultural practices", "preservation"],
    images: Array.from({ length: 6 }, (_, i) => `/placeholder.svg?height=800&width=600&text=Sheret+${i + 1}`),
    position: "Textile Artist and researcher",
  },

  // 2024 Projects
  {
    id: "the-river",
    title: "The River",
    year: 2024,
    category: "Films",
    medium: "Short Documentary",
    description:
      "A contemplative short documentary about the relationship between communities and water sources in Ethiopia.",
    detailedDescription:
      "The River explores environmental conservation and water rights through intimate storytelling, examining how rivers shape both landscape and culture in Ethiopian communities. This film captures the essential role of water in Ethiopian life through compelling cinematography and personal narratives.",
    image: "/placeholder.svg?height=600&width=800&text=The+River",
    featured: false,
    awards: [],
    visitors: "8K",
    tags: ["documentary", "environment", "community", "water"],
    videoUrl: "https://youtu.be/z_ijqn0ewM0?si=mbFQK0oZc8tatslH",
    location: "Ethiopia",
  },
  {
    id: "msfts-ethiopia-skate-film",
    title: "MSFTS x Ethiopia Skate",
    year: 2024,
    category: "Films",
    medium: "Brand Collaboration Documentary",
    description:
      "A dynamic documentary capturing the emerging skateboarding culture in Ethiopia through the lens of fashion and youth expression.",
    detailedDescription:
      "This collaborative film captures the vibrant skateboarding scene in Ethiopia, showcasing how young Ethiopians are embracing and redefining skateboarding culture within their own cultural context. The film follows several skaters as they navigate urban landscapes and create their own unique style.",
    image: "/placeholder.svg?height=600&width=800&text=MSFTS+Ethiopia+Skate",
    featured: false,
    awards: [],
    visitors: "30K",
    tags: ["skateboarding", "youth culture", "fashion", "collaboration"],
    videoUrl: "https://drive.google.com/file/d/1EguZ8WEBDYJItUhAVcpyyAoVgcxfwnMA/view?usp=sharing",
    location: "Addis Ababa, Ethiopia",
  },
  {
    id: "arada-easter-commercial",
    title: "Arada Easter Commercial",
    year: 2024,
    category: "Commissioned",
    medium: "Commercial advertisement",
    description:
      "A vibrant commercial celebrating Ethiopian Easter traditions in the historic Arada district of Addis Ababa.",
    detailedDescription:
      "A vibrant commercial celebrating Ethiopian Easter traditions in the historic Arada district of Addis Ababa. This commissioned work captures the energy and spiritual significance of Ethiopian Orthodox Easter celebrations, featuring authentic community participation and traditional ceremonial elements. The commercial successfully balances commercial objectives with cultural authenticity.",
    image: "/placeholder.svg?height=600&width=800&text=Arada+Easter+Commercial",
    featured: false,
    awards: [],
    visitors: "20K",
    tags: ["commercial", "easter", "traditions", "community"],
    type: "film",
    videoUrl: "https://youtu.be/gHnCjF4GLHk?si=X7Zleobndl873NaO",
    position: "Director, producer, stylist",
    duration: "2:30",
  },
  {
    id: "the-river-commission",
    title: "The River",
    year: 2024,
    category: "Commissioned",
    medium: "Documentary trailer",
    description:
      "A commissioned documentary trailer exploring water rights and environmental conservation along Ethiopian rivers.",
    detailedDescription:
      "A commissioned documentary trailer that demonstrates sophisticated understanding of both documentary filmmaking and environmental advocacy, creating compelling visual narratives that highlight the urgent need for water conservation in Ethiopia. The piece serves as both artistic expression and environmental activism, using cinematic techniques to draw attention to critical environmental issues.",
    image: "/placeholder.svg?height=600&width=800&text=The+River+Commission",
    featured: false,
    awards: [],
    visitors: "15K",
    tags: ["environmental", "water rights", "conservation", "documentary"],
    type: "film",
    videoUrl: "https://youtu.be/z_ijqn0ewM0?si=CwfuWOyAfWqHjDK6",
    position: "Production designer and set designer",
    duration: "4:20",
  },
  {
    id: "msfts-ethiopia-skate-commission",
    title: "MSFTS x Ethiopia Skate",
    year: 2024,
    category: "Commissioned",
    medium: "Brand collaboration video",
    description:
      "A creative collaboration documenting the emerging skateboarding culture in Ethiopia through fashion and lifestyle perspectives.",
    detailedDescription:
      "A commissioned work for MSFTS that captures the intersection of global skateboarding culture with Ethiopian urban youth expression, featuring authentic documentation of skate culture development in Ethiopian cities. The project demonstrates how global youth movements adapt and transform within local cultural contexts.",
    image: "/placeholder.svg?height=600&width=800&text=MSFTS+Ethiopia+Skate+Commission",
    featured: false,
    awards: [],
    visitors: "30K",
    tags: ["skateboarding", "youth culture", "fashion", "collaboration"],
    type: "photo",
    videoUrl: "https://drive.google.com/file/d/1EguZ8WEBDYJItUhAVcpyyAoVgcxfwnMA/view?usp=sharing",
    position: "Creative director",
    photoCount: 8,
    images: Array.from({ length: 8 }, (_, i) => `/placeholder.svg?height=800&width=600&text=MSFTS+Commission+${i + 1}`),
  },
  {
    id: "msfts-ethiopia-skate-photos",
    title: "MSFTS x Ethiopia Skate",
    year: 2024,
    category: "Archive",
    medium: "Photography archive",
    description: "Comprehensive photographic archive from the MSFTS x Ethiopia skateboarding collaboration.",
    detailedDescription:
      "This archive contains 24 photographs from the MSFTS collaboration, including 5 landscape format images (16:9 ratio) and 19 portrait format images (9:16 ratio), capturing candid moments, alternative shots, and process documentation that didn't make it into the final campaign. The archive provides insight into the creative process and cultural exchange that occurred during this unique collaboration.",
    image: "/images/webp/05_Archive/01_MSFTS x Ethiopia skate photos/c1.webp",
    featured: false,
    awards: [],
    visitors: "4K",
    tags: ["photography", "skateboarding", "behind-the-scenes", "collaboration"],
    location: "Studio Archive",
    status: "Digital Archive",
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

  // 2023 Projects
  {
    id: "ashes-modeling-commission",
    title: "Except this time nothing returns from the ashes",
    year: 2023,
    category: "Commissioned",
    medium: "Fashion photography",
    description:
      "A high-fashion modeling project exploring themes of transformation, renewal, and resilience through Ethiopian aesthetic frameworks.",
    detailedDescription:
      "This commissioned work challenges conventional fashion photography by incorporating cultural narratives of rebirth and transformation, using modeling and styling to explore how individuals and communities emerge from difficult circumstances. The project's title suggests themes of permanent change and growth, moving beyond cycles of destruction and renewal to embrace lasting transformation.",
    image: "/images/webp/04_Commisions/Except this time nothing returns from the ashes modeling/a6.webp",
    featured: false,
    awards: [],
    visitors: "8K",
    tags: ["fashion", "modeling", "transformation", "resilience"],
    type: "photo",
    position: "modeling",
    photoCount: 8,
    images: Array.from({ length: 8 }, (_, i) => `/placeholder.svg?height=800&width=600&text=Ashes+Photo+${i + 1}`),
  },
  {
    id: "tilla-photoshoot",
    title: "Tilla Photoshoot",
    year: 2023,
    category: "Archive",
    medium: "Fashion photography",
    description:
      "Archive of a fashion photoshoot exploring traditional Ethiopian gold jewelry and contemporary styling.",
    detailedDescription:
      "Tilla, meaning gold in Amharic, was a photoshoot that explored the beauty and cultural significance of traditional Ethiopian gold jewelry, combining heritage pieces with contemporary fashion. This archive contains 4 carefully curated photographs that capture the intersection of traditional craftsmanship and modern aesthetic sensibilities.",
    image: "/images/webp/05_Archive/02_tilla photoshoot/a1.webp",
    featured: false,
    awards: [],
    visitors: "4K",
    tags: ["fashion", "jewelry", "traditional", "gold"],
    location: "Studio Archive",
    status: "Fashion Archive",
    photoCount: 4,
    images: Array.from({ length: 4 }, (_, i) => `/placeholder.svg?height=800&width=450&text=Tilla+Photo+${i + 1}`),
  },

  // 2022 Projects
  {
    id: "hulet-neteb",
    title: "Hulet Neteb",
    year: 2022,
    category: "Films",
    medium: "Experimental Film",
    description: "An experimental film exploring the philosophical concept of duality in Ethiopian culture.",
    detailedDescription:
      "Hulet Neteb (meaning 'two things' in Amharic) examines the tensions and harmonies between tradition and modernity, individual and collective identity, past and present. Through innovative cinematographic techniques and thoughtful narrative structure, the film creates a meditative exploration of Ethiopian philosophical concepts.",
    image: "/placeholder.svg?height=600&width=800&text=Hulet+Neteb",
    featured: false,
    awards: [],
    visitors: "5K",
    tags: ["experimental", "philosophy", "duality", "culture"],
    videoUrl: "https://drive.google.com/file/d/1mF4sGEPb7YrYdEeUFYA2vZERRdR9F7G5/view?usp=sharing",
    location: "Ethiopia",
  },
  {
    id: "bet-bota",
    title: "Bet Bota",
    year: 2022,
    category: "Installation",
    medium: "Architectural intervention",
    description:
      "Bet/Bota reimagines the Ethiopian home, exploring memory and history through immersive sets and everyday objects.",
    detailedDescription:
      "Bet/Bota reimagines the Ethiopian home as a space where memory and history intersect with imagination. Set against 1970s Addis Ababa, the project unfolds through eight immersive sets ranging from elemental abstractions to reconstructed living spaces. At its heart, a dining room unites these worlds, revealing the quiet power of everyday objects. Both house and archive, Bet/Bota invites reflection on how space shapes us, and how we, in turn, shape space.",
    image:
      "/images/webp/02_Installations/03_Bet_Bota_photos_2022/a4a.webp?height=600&width=800&text=Bet+Bota+1",
    featured: false,
    awards: [],
    visitors: "12K",
    tags: ["architecture", "domestic", "cultural memory", "space"],
    materials: ["Traditional textiles", "Architectural elements", "Lighting systems", "Interactive spaces"],
    photoCount: 18,
    slidesLayout: [2, 2, 2, 2, 2, 2, 2, 2, 2], // 2 photos per carousel slide
    images: Array.from({ length: 18 }, (_, i) => `/placeholder.svg?height=800&width=600&text=Bet+Bota+${i + 1}`),
    position: "Model, Director",
  },
  {
    id: "hulet-neteb-installation",
    title: "Hulet Neteb Installation",
    year: 2022,
    category: "Installation",
    medium: "Interactive installation",
    description:
      "Hulet Neteb / Two Dots uses the Ethiopian ':' to explore identity and heritage through hand-painted and pre-owned garments.",
    detailedDescription:
      "Building on the themes from the experimental film of the same name, this installation creates an immersive environment where visitors can physically engage with the concept of 'Hulet Neteb' (two things). The work demonstrates how philosophical concepts can be experienced through spatial and tactile engagement, documented through 7 comprehensive photographs.",
    image: "/images/webp/02_Installations/04_Hulet_Neteb_Photos_2022/IMG_4342.webp?height=600&width=800&text=Hulet+Neteb+Installation+1",
    featured: false,
    awards: [],
    visitors: "8K",
    tags: ["interactive", "philosophy", "duality", "digital"],
    materials: ["Interactive sensors", "Digital displays", "Physical objects", "Sound design"],
    photoCount: 7,
    images: Array.from(
      { length: 7 },
      (_, i) => `/placeholder.svg?height=800&width=600&text=Hulet+Neteb+Install+${i + 1}`,
    ),
    position: "Director, Producer, Curator, and Textile Artist",
  },
  {
    id: "hulet-neteb-project",
    title: "Hulet neteb project",
    year: 2022,
    category: "In Studio",
    medium: "Studio documentation",
    description:
      "Hulet Neteb / Two Dots uses the Ethiopian ':' to explore identity and heritage through hand-painted and pre-owned garments.",
    detailedDescription:
      "This studio-based work involves extensive field research and documentation of cultural practices related to body modification, traditional scarification, and ceremonial body art in Northern Ethiopian communities. The project serves as both artistic exploration and cultural preservation, creating a visual archive of practices that connect contemporary Ethiopian identity to ancestral traditions.",
    image: "/images/webp/03_In studyo/Hulet neteb project photos/FUA10675.webp?height=600&width=800&text=Hulet+Neteb+Project",
    featured: false,
    awards: [],
    visitors: "7K",
    tags: ["identity", "heritage", "garments", "cultural practices"],
    images: Array.from({ length: 16 }, (_, i) => `/placeholder.svg?height=800&width=600&text=Hulet+Neteb+${i + 1}`),
    position: "Director, Producer, Curator, and Textile Artist",
  },
  {
    id: "to-identify-photos-archive",
    title: "To Identify",
    year: 2022,
    category: "Archive",
    medium: "Identity exploration",
    description:
      "Personal photographic exploration of individual and collective identity within Ethiopian diaspora communities.",
    detailedDescription:
      "To Identify is a personal photographic project exploring questions of identity, belonging, and cultural connection within Ethiopian diaspora communities around the world. Contains 19 photographs arranged in a specific narrative sequence: 1 photo in the first carousel slide, 5 photos in the second carousel slide, 7 in the third, and 6 in the fourth, creating a visual journey through themes of identity and belonging.",
    image: "/images/webp/05_Archive/06_To identify/vnfn.webp?height=600&width=800&text=To+Identify+Archive",
    featured: false,
    awards: [],
    visitors: "7K",
    tags: ["identity", "diaspora", "personal", "belonging"],
    location: "Global locations",
    status: "Personal Archive",
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
    year: 2022,
    category: "Archive",
    medium: "Cultural documentation",
    description:
      "Photographic documentation of traditional Ethiopian art forms and their contemporary interpretations.",
    detailedDescription:
      "Tibeb Be Adebabay (meaning 'art in Addis Ababa') documents the rich artistic traditions of Ethiopia's capital city, capturing both traditional art forms and their contemporary evolution. Features 4 documentary photographs that showcase the continuity and transformation of artistic practices in urban Ethiopian contexts.",
    image: "/images/webp/05_Archive/07_Tibeb be Abebabay/a1.webp",
    featured: false,
    awards: [],
    visitors: "4K",
    tags: ["cultural documentation", "traditional art", "contemporary", "addis ababa"],
    location: "Addis Ababa, Ethiopia",
    status: "Cultural Archive",
    photoCount: 4,
    images: Array.from({ length: 4 }, (_, i) => `/placeholder.svg?height=800&width=450&text=Tibeb+${i + 1}`),
  },
  {
    id: "in-red-photos-archive",
    title: "In Red",
    year: 2022,
    category: "Archive",
    medium: "Artistic photography",
    description:
      "A photographic series exploring the color red in Ethiopian culture, from traditional clothing to landscapes.",
    detailedDescription:
      "This photographic series documents the significance of red in Ethiopian culture, capturing everything from traditional red clothing and ceremonial objects to natural red landscapes and architectural elements. Contains 7 striking photographs that reveal the deep cultural meanings and emotional associations of this powerful color.",
    image: "/images/webp/05_Archive/03_In_red/a1.webp?height=600&width=800&text=In+Red+Archive",
    featured: false,
    awards: [],
    visitors: "6K",
    tags: ["color study", "cultural significance", "photography", "red"],
    location: "Various locations",
    status: "Artistic Archive",
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
    year: 2022,
    category: "Archive",
    medium: "Conceptual photography",
    description: "Conceptual photographs imagining alternative realities and utopian visions of Ethiopian society.",
    detailedDescription:
      "This conceptual series creates visual portals to imagined versions of Ethiopia, exploring themes of possibility, hope, and alternative futures through surreal and dreamlike imagery. Features 4 conceptual photographs that challenge viewers to imagine different possibilities for Ethiopian society and culture.",
    image: "/images/webp/05_Archive/04_Portal to Uthiopia/j.webp?height=600&width=800&text=Portal+U-thiopia+Archive",
    featured: false,
    awards: [],
    visitors: "5K",
    tags: ["conceptual", "utopia", "alternative reality", "surreal"],
    location: "Conceptual Archive",
    status: "Conceptual Archive",
    photoCount: 4,
    images: Array.from({ length: 4 }, (_, i) => `/placeholder.svg?height=800&width=450&text=Portal+U-thiopia+${i + 1}`),
  },
  {
    id: "vibrant-hues-archive",
    title: "Vibrant Hues",
    year: 2022,
    category: "Archive",
    medium: "Color studies",
    description: "An exploration of color in Ethiopian culture, from traditional dyes to contemporary color palettes.",
    detailedDescription:
      "This archive explores the rich color traditions of Ethiopian culture, documenting traditional dyeing techniques, ceremonial color usage, and contemporary interpretations of cultural color palettes. Contains 18 photographs that showcase the vibrant spectrum of Ethiopian artistic expression through color.",
    image: "/images/webp/05_Archive/08_vibrant hues/expt 1/a2.webp?height=600&width=800&text=Vibrant+Hues+Archive",
    featured: false,
    awards: [],
    visitors: "7K",
    tags: ["color theory", "traditional dyes", "cultural meaning", "design"],
    location: "Color Archive",
    status: "Study Collection",
    photoCount: 18,
    images: [
      // 11 small 9:16 images
      ...Array.from({ length: 11 }, (_, i) => `/placeholder.svg?height=800&width=450&text=Vibrant+Portrait+${i + 1}`),
      // 7 landscape images
      ...Array.from({ length: 7 }, (_, i) => `/placeholder.svg?height=600&width=800&text=Vibrant+Landscape+${i + 1}`),
    ],
  },

  // 2021 Projects
  {
    id: "decoding-legends",
    title: "Decoding Legends",
    year: 2021,
    category: "Films",
    medium: "Documentary Series",
    description:
      "A documentary series that decodes ancient Ethiopian legends through contemporary perspectives, examining how traditional stories continue to influence modern Ethiopian identity.",
    detailedDescription:
      "Decoding Legends is a documentary series that delves into the rich tapestry of Ethiopian folklore and mythology, examining how these ancient stories continue to shape contemporary Ethiopian identity and culture. Through interviews with elders, historians, and cultural practitioners, the series reveals the hidden meanings and enduring wisdom embedded in traditional legends.",
    image: "/placeholder.svg?height=600&width=800&text=Decoding+Legends",
    featured: false,
    awards: [],
    visitors: "12K",
    tags: ["documentary", "legends", "storytelling", "heritage"],
    videoUrl: "https://youtu.be/0v1vwgnqHRU?si=uJkjUumPFlwMwHJy",
    location: "Ethiopia",
  },
  {
    id: "decoding-legends-installation",
    title: "Decoding Legends Installation",
    year: 2021,
    category: "Installation",
    medium: "Multimedia installation",
    description:
      "Ete'ya reimagines traditional Ethiopian attire with a blue cloak, red pants, and headscarf, honoring the legendary queen.",
    detailedDescription:
      "Created during the prestigious Gojo residency program, this immersive work combines video, sound, textile, and sculptural elements to create an environment where visitors can experience legendary narratives through multiple sensory channels. The installation demonstrates how traditional storytelling can be transformed through contemporary artistic methodologies, documented through 9 comprehensive photographs.",
    image:
      "/images/webp/02_Installations/05_Decoding_legends/IMG_5082.webp?height=600&width=800&text=Decoding+Legends+1",
    featured: false,
    awards: [],
    visitors: "15K",
    tags: ["legends", "multimedia", "storytelling", "gojo residency"],
    materials: ["Video screens", "Traditional artifacts", "Audio systems", "Lighting", "Textiles"],
    photoCount: 9,
    images: Array.from({ length: 9 }, (_, i) => `/placeholder.svg?height=800&width=600&text=Decoding+Install+${i + 1}`),
    position: "Creative director, costume design",
  },
  {
    id: "decoding-legends-photos-archive",
    title: "Decoding Legends",
    year: 2021,
    category: "Archive",
    medium: "Documentary photography",
    description: "Photographic documentation supporting the Decoding Legends film series and installation work.",
    detailedDescription:
      "This archive contains 3 key photographs from the extensive research and documentation that supported the Decoding Legends project, including location scouting, cultural research, and process documentation that provided the foundation for the larger multimedia project.",
    image: "/images/webp/05_Archive/05_Decoding legends/a2.webp",
    featured: false,
    awards: [],
    visitors: "3K",
    tags: ["documentary", "research", "legends", "cultural documentation"],
    location: "Research Archive",
    status: "Research Collection",
    photoCount: 3,
    images: Array.from({ length: 3 }, (_, i) => `/placeholder.svg?height=800&width=450&text=Decoding+Doc+${i + 1}`),
  },

  // 2020 Projects
  {
    id: "graphic-posters-illustrations-archive",
    title: "Graphic Posters",
    year: 2020,
    category: "Archive",
    medium: "Graphic design",
    description: "Collection of graphic design work including posters and visual identity projects.",
    detailedDescription:
      "This archive contains 5 graphic design projects including event posters and editorial work that explore Ethiopian cultural themes through contemporary design approaches. The collection demonstrates the application of traditional cultural elements within modern graphic design frameworks.",
    image: "/images/webp/05_Archive/09_Graphic posters/04_Hulet neteb.webp?height=600&width=800&text=Graphic+Posters+Archive",
    featured: false,
    awards: [],
    visitors: "5K",
    tags: ["graphic design", "posters", "visual identity", "cultural themes"],
    location: "Design Archive",
    status: "Design Collection",
    photoCount: 5,
    instagramUrl: "https://www.instagram.com/red_studyo/",
    images: Array.from({ length: 5 }, (_, i) => `/placeholder.svg?height=800&width=600&text=Graphic+Design+${i + 1}`),
  },
]

export default function AllProjectsPage() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects" />

      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="px-12 lg:px-20 mb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-stardom text-black mb-6 pt-7">All Projects</h1>
          </div>
        </div>

        {/* Projects Timeline */}
        <div className="px-12 lg:px-20">
          <ProjectTimeline projects={allProjectsData} isDark={isDark} />
        </div>
      </div>
    </div>
  )
}
