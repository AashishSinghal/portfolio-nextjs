"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "@/types/sections"
import { getSectionHeading } from "@/lib/utils/sections"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"

type SkillCategory = {
  id: number
  icon: string
  name: string
  description: string
}

type SkillItem = {
  id: string
  name: string
  level: number // 1-5 scale
  categoryId: number
}

const skillCategories: SkillCategory[] = [
  {
    id: 1,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-pKuFEHpMVw2z27U4BoSC4W0ZsDcYmZ.png",
    name: "Programming Languages",
    description: "Core programming languages used across various projects and applications",
  },
  {
    id: 2,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/react-ierWww6kGflEbop5LJEocb5MGahTpC.png",
    name: "Frontend Development",
    description: "Technologies for building responsive, interactive user interfaces",
  },
  {
    id: 3,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nodejs-CdR5e5MqJbkh3BF1dCCEpGaPSMj4WM.png",
    name: "Backend Development",
    description: "Server-side technologies and frameworks for building robust applications",
  },
  {
    id: 4,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/database-EMukDmcyEt4SAb6eo4fVoKGthPeDy8.png",
    name: "Databases & Storage",
    description: "Database systems and data storage technologies",
  },
  {
    id: 5,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-pKuFEHpMVw2z27U4BoSC4W0ZsDcYmZ.png",
    name: "DevOps & Cloud",
    description: "Tools and platforms for deployment, scaling, and infrastructure management",
  },
  {
    id: 6,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/figma-ocwWpmXxkbyNiHkNALKiBgycS840HI.png",
    name: "Design & Creative",
    description: "Design tools and creative software for UI/UX and graphic design",
  },
]

const skillItems: SkillItem[] = [
  // Programming Languages
  { id: "js", name: "JavaScript", level: 5, categoryId: 1 },
  { id: "ts", name: "TypeScript", level: 5, categoryId: 1 },
  { id: "python", name: "Python", level: 3, categoryId: 1 },
  { id: "java", name: "Java", level: 3, categoryId: 1 },
  { id: "sql", name: "SQL", level: 4, categoryId: 1 },
  { id: "bash", name: "Bash", level: 3, categoryId: 1 },

  // Frontend
  { id: "react", name: "React", level: 5, categoryId: 2 },
  { id: "nextjs", name: "Next.js", level: 5, categoryId: 2 },
  { id: "redux", name: "Redux", level: 4, categoryId: 2 },
  { id: "tailwind", name: "TailwindCSS", level: 5, categoryId: 2 },
  { id: "reactnative", name: "React Native", level: 3, categoryId: 2 },
  { id: "html", name: "HTML5", level: 5, categoryId: 2 },
  { id: "css", name: "CSS3", level: 5, categoryId: 2 },

  // Backend
  { id: "nodejs", name: "Node.js", level: 4, categoryId: 3 },
  { id: "express", name: "Express.js", level: 4, categoryId: 3 },
  { id: "graphql", name: "GraphQL", level: 3, categoryId: 3 },
  { id: "springboot", name: "Spring Boot", level: 3, categoryId: 3 },
  { id: "restapi", name: "REST APIs", level: 4, categoryId: 3 },

  // Databases
  { id: "mongodb", name: "MongoDB", level: 4, categoryId: 4 },
  { id: "postgres", name: "PostgreSQL", level: 4, categoryId: 4 },
  { id: "mysql", name: "MySQL", level: 3, categoryId: 4 },
  { id: "redis", name: "Redis", level: 3, categoryId: 4 },
  { id: "planetscale", name: "PlanetScale", level: 3, categoryId: 4 },

  // DevOps & Cloud
  { id: "aws", name: "AWS", level: 3, categoryId: 5 },
  { id: "docker", name: "Docker", level: 3, categoryId: 5 },
  { id: "localstack", name: "LocalStack", level: 3, categoryId: 5 },
  { id: "pm2", name: "PM2", level: 4, categoryId: 5 },
  { id: "nginx", name: "Nginx", level: 3, categoryId: 5 },
  { id: "git", name: "Git", level: 5, categoryId: 5 },
  { id: "github", name: "GitHub", level: 5, categoryId: 5 },

  // Design & Creative
  { id: "figma", name: "Figma", level: 4, categoryId: 6 },
  { id: "adobexd", name: "Adobe XD", level: 4, categoryId: 6 },
  { id: "photoshop", name: "Adobe Photoshop", level: 3, categoryId: 6 },
  { id: "illustrator", name: "Adobe Illustrator", level: 3, categoryId: 6 },
  { id: "aftereffects", name: "Adobe After Effects", level: 2, categoryId: 6 },
]

const SkillsAlternative = () => {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)

  const toggleCategory = (id: number) => {
    setExpandedCategory(expandedCategory === id ? null : id)
  }

  return (
    <div id={Section.Skills}>
      {getSectionHeading(Section.Skills)}

      <div className="space-y-6">
        {skillCategories.map((category) => (
          <div
            key={category.id}
            className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 relative">
                  <Image
                    src={category.icon || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-contain"
                    sizes="32px"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{category.description}</p>
                </div>
              </div>
              <div>
                {expandedCategory === category.id ? (
                  <ChevronUp className="h-5 w-5 text-neutral-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-neutral-500" />
                )}
              </div>
            </div>

            {expandedCategory === category.id && (
              <div className="p-4 bg-white dark:bg-neutral-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {skillItems
                    .filter((item) => item.categoryId === category.id)
                    .map((skill) => (
                      <div key={skill.id} className="flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-neutral-500">
                            {skill.level === 5
                              ? "Expert"
                              : skill.level === 4
                                ? "Advanced"
                                : skill.level === 3
                                  ? "Intermediate"
                                  : skill.level === 2
                                    ? "Basic"
                                    : "Beginner"}
                          </span>
                        </div>
                        <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              skill.level === 5
                                ? "bg-teal-500 dark:bg-teal-400"
                                : skill.level === 4
                                  ? "bg-blue-500 dark:bg-blue-400"
                                  : skill.level === 3
                                    ? "bg-purple-500 dark:bg-purple-400"
                                    : skill.level === 2
                                      ? "bg-orange-500 dark:bg-orange-400"
                                      : "bg-red-500 dark:bg-red-400",
                            )}
                            style={{ width: `${skill.level * 20}%` }}
                          />
                        </div>
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

export default SkillsAlternative

