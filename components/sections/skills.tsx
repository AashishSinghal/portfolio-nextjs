"use client"

import Image from "next/image"
import { Section } from "@/types/sections"
import { getSectionHeading } from "@/lib/utils/heading"
import { useState } from "react"
import { cn } from "@/lib/utils"

type Skill = {
  id: number
  icon: string
  name: string
  technologies: string[]
  proficiency?: "beginner" | "intermediate" | "advanced" | "expert"
}

const skills: Skill[] = [
  {
    id: 1,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-pKuFEHpMVw2z27U4BoSC4W0ZsDcYmZ.png",
    name: "Programming Languages",
    technologies: ["JavaScript", "TypeScript", "Python", "Java", "SQL", "Bash"],
    proficiency: "advanced",
  },
  {
    id: 2,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/react-ierWww6kGflEbop5LJEocb5MGahTpC.png",
    name: "Frontend Frameworks & Libraries",
    technologies: ["React", "NextJS", "Redux", "TailwindCSS", "React Native"],
    proficiency: "expert",
  },
  {
    id: 3,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nodejs-CdR5e5MqJbkh3BF1dCCEpGaPSMj4WM.png",
    name: "Backend Technologies",
    technologies: ["Node.js", "Express.js", "GraphQL", "Spring Boot", "REST APIs"],
    proficiency: "advanced",
  },
  {
    id: 4,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/database-EMukDmcyEt4SAb6eo4fVoKGthPeDy8.png",
    name: "Database Systems",
    technologies: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "PlanetScale"],
    proficiency: "advanced",
  },
  {
    id: 5,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/electron-cvZCghYouoOt6ynP5F2mgQcFJTtqTQ.png",
    name: "Cross Platform Development",
    technologies: ["React Native", "Electron", "Firebase", "Cordova"],
    proficiency: "intermediate",
  },
  {
    id: 6,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/figma-ocwWpmXxkbyNiHkNALKiBgycS840HI.png",
    name: "UI/UX Design",
    technologies: ["Adobe XD", "Figma", "UI Component Libraries"],
    proficiency: "intermediate",
  },
  {
    id: 7,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-pKuFEHpMVw2z27U4BoSC4W0ZsDcYmZ.png",
    name: "DevOps & Cloud",
    technologies: ["AWS", "Docker", "LocalStack", "PM2", "Nginx", "Git", "GitHub"],
    proficiency: "intermediate",
  },
  {
    id: 8,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photography-K9vcKPxNT4GP3Yr2YYO1bCD7upI4JZ.png",
    name: "Creative Tools",
    technologies: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe InDesign",
      "Adobe After Effects",
      "Adobe Premier Pro",
    ],
    proficiency: "intermediate",
  },
]

const Skills = () => {
  const [expandedSkill, setExpandedSkill] = useState<number | null>(null)

  const toggleSkill = (id: number) => {
    setExpandedSkill(expandedSkill === id ? null : id)
  }

  const getProficiencyColor = (proficiency?: string) => {
    switch (proficiency) {
      case "beginner":
        return "bg-blue-200 dark:bg-blue-900"
      case "intermediate":
        return "bg-green-200 dark:bg-green-900"
      case "advanced":
        return "bg-purple-200 dark:bg-purple-900"
      case "expert":
        return "bg-orange-200 dark:bg-orange-900"
      default:
        return "bg-gray-200 dark:bg-gray-800"
    }
  }

  return (
    <div id={Section.Skills}>
      {getSectionHeading(Section.Skills)}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={cn(
              "px-4 py-3 border border-neutral-900/10 dark:border-neutral-50/10 hover:border-neutral-900/30 dark:hover:border-neutral-50/30 rounded-lg transition-all duration-300 hover:duration-100 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm",
              expandedSkill === skill.id ? "col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4" : "",
            )}
          >
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleSkill(skill.id)}>
              <div className="w-10 h-10 flex-shrink-0 relative">
                <Image
                  src={skill.icon || "/placeholder.svg"}
                  alt={skill.name}
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>

              <div className="min-w-0 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <strong className="truncate text-sm">{skill.name}</strong>
                  {skill.proficiency && (
                    <span className={cn("text-xs px-2 py-0.5 rounded-full", getProficiencyColor(skill.proficiency))}>
                      {skill.proficiency}
                    </span>
                  )}
                </div>
                <small
                  className="truncate text-neutral-600 dark:text-neutral-400"
                  title={skill.technologies.join(", ")}
                >
                  {skill.technologies.join(", ")}
                </small>
              </div>
            </div>

            {expandedSkill === skill.id && (
              <div className="mt-4 pl-14">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {skill.technologies.map((tech, index) => (
                    <div key={index} className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-md text-sm">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills

