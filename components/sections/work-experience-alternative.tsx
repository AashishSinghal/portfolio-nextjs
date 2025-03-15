"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { FaLocationArrow, FaCalendarAlt, FaBriefcase, FaChevronDown, FaChevronUp } from "react-icons/fa"
import { Section } from "@/types/sections"
import { getSectionHeading } from "@/lib/utils/sections"
import { Badge } from "@/components/ui/badge"

type WorkExperience = {
  id: number
  logo: string
  name: string
  period: { start: string; end: string }
  position: string
  location: string
  summary: string
  keyFocus: string[]
  achievements: string[]
  technologies: string[]
}

const workExperiences: WorkExperience[] = [
  {
    id: 1,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nutanix-bDZGHr93KhOanIOmpWaNEuQyBsPL29.png", // Nutanix logo
    name: "Nutanix Technologies Pvt. Ltd.",
    period: { start: "Jan 2022", end: "Present" },
    position: "Member of Technical Staff 2",
    location: "Bangalore, Karnataka, India",
    summary:
      "Developing and maintaining high-performance web applications for the Sales Portal, focusing on feature development, UI improvements, and system integrations.",
    keyFocus: [
      "React",
      "NodeJS",
      "GraphQL (Apollo)",
      "Java Spring Boot",
      "Feature Flag Management",
      "UI Library Migration",
      "Performance Optimization",
    ],
    achievements: [
      "Delivered two new high-performance projects with three distinct quote types, reducing manual effort by 60% and accelerating quote generation by 40%",
      "Integrated OS offerings using feature flags for controlled deployment, ensuring stability and minimizing user disruptions",
      "Led the migration of the front-end to an in-house UI library, refactoring legacy components and standardizing UI patterns, resulting in a 40% reduction in deployment errors",
      "Developed a Feature Flag Management Portal with an intuitive interface for dynamic feature toggling, cutting Production Errors by 50%",
      "Designed and implemented critical features such as User Permission Manager and Bulk Edit functionality to enhance workflows and increase user adoption by 30%",
      "Achieved pixel-perfect UI implementation within record time, allowing more focus on integration refinements",
    ],
    technologies: ["React", "TypeScript", "Node.js", "GraphQL", "Java", "Spring Boot", "Redux", "Feature Flags"],
  },
  {
    id: 2,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/celebal-GJurBBHePLBbiNH2wrp71iBCKwn838.png", // Celebal logo
    name: "Celebal Technologies Pvt. Ltd.",
    period: { start: "Jan 2021", end: "Nov 2021" },
    position: "Full Stack Developer",
    location: "Jaipur, Rajasthan, India",
    summary:
      "Developed full-stack applications using MERN stack with TypeScript, focusing on Microsoft Teams integrations and mentoring junior developers.",
    keyFocus: [
      "React",
      "Redux",
      "TypeScript",
      "NodeJS",
      "MS Teams UI Library",
      "Performance Optimization",
      "Mentoring",
    ],
    achievements: [
      "Architected and deployed a streamlined Order Management Portal on the Teams App Store, automating workflows and reducing order processing time by 35%",
      "Spearheaded the development of an in-house HR Management Portal, redesigning the architecture to enhance performance by 40% and simplify the codebase",
      "Designed and optimized a comprehensive web solution for a client, implementing performance enhancements that cut UI load time by 40%",
      "Mentored and upskilled multiple interns, introducing best practices and streamlined workflows that reduced deployment time by 30%",
      "Enabled efficient collaboration through Teams UI Library integration, improving development velocity",
    ],
    technologies: ["React", "Redux", "TypeScript", "Node.js", "Express", "MongoDB", "Teams UI Library", "REST APIs"],
  },
  {
    id: 3,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sfity-wcfh6e9OKQgPhN3IcCBph8mHr5dbMG.png", // SFITY logo
    name: "SFITY INDIA LLP",
    period: { start: "Dec 2020", end: "Jan 2021" },
    position: "ReactJS Developer (Intern)",
    location: "Jaipur, Rajasthan, India (Remote)",
    summary:
      "Developed web pages based on UI designs and incorporated animations, while also designing views based on client requirements.",
    keyFocus: ["React", "NextJS", "JavaScript", "HTML & CSS", "AOS Library"],
    achievements: [
      "Developed responsive web pages based on provided UI designs",
      "Incorporated animations to enhance user experience",
      "Designed custom views based on client requirements",
      "Collaborated with the development team to ensure consistent implementation",
    ],
    technologies: ["React", "Next.js", "JavaScript", "HTML", "CSS", "AOS Animation Library"],
  },
  {
    id: 4,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/innofarms-8AetEa8ECt6JfSiOyrIO0UEsaPNTjv.png", // Innofarms logo
    name: "Innofarms, SNL Innovations Pvt. Ltd.",
    period: { start: "May 2020", end: "July 2020" },
    position: "Front-End Developer & UI Designer (Intern)",
    location: "Jaipur, Rajasthan, India (Remote)",
    summary:
      "Worked on UI/UX for a hybrid application, implementing designs using Angular and Cordova to create a hybrid mobile application.",
    keyFocus: ["Angular", "Javascript", "HTML & CSS", "Cordova", "Adobe XD"],
    achievements: [
      "Designed UI/UX for a hybrid application using Adobe XD",
      "Implemented the application using Angular framework",
      "Used Cordova to create a hybrid mobile application",
      "Collaborated with the team to ensure design consistency",
      "Optimized the application for various mobile devices",
    ],
    technologies: ["Angular", "JavaScript", "HTML", "CSS", "Cordova", "Adobe XD"],
  },
]

const WorkExperienceAlternative = () => {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(1) // Default to first experience expanded

  const toggleExperience = (id: number) => {
    setExpandedExperience(expandedExperience === id ? null : id)
  }

  return (
    <div id={Section.WorkExperience}>
      {getSectionHeading(Section.WorkExperience)}

      <div className="space-y-6">
        {workExperiences.map((experience) => (
          <div
            key={experience.id}
            className={cn(
              "border rounded-lg overflow-hidden transition-all duration-300",
              expandedExperience === experience.id
                ? "border-teal-500 dark:border-teal-400 shadow-md"
                : "border-neutral-200 dark:border-neutral-800",
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between p-4 cursor-pointer",
                expandedExperience === experience.id
                  ? "bg-teal-50 dark:bg-teal-900/20"
                  : "bg-white dark:bg-neutral-900",
              )}
              onClick={() => toggleExperience(experience.id)}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={experience.logo || "/placeholder.svg"}
                    alt={experience.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{experience.name}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-1">
                      <FaBriefcase className="flex-shrink-0 text-xs" />
                      <span>{experience.position}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="flex-shrink-0 text-xs" />
                      <span>
                        {experience.period.start} - {experience.period.end}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaLocationArrow className="flex-shrink-0 text-xs" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {expandedExperience === experience.id ? (
                  <FaChevronUp className="text-teal-500 dark:text-teal-400" />
                ) : (
                  <FaChevronDown className="text-neutral-500" />
                )}
              </div>
            </div>

            {expandedExperience === experience.id && (
              <div className="p-4 bg-white dark:bg-neutral-800">
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">{experience.summary}</p>

                <div className="mb-4">
                  <h4 className="font-medium mb-2 text-teal-600 dark:text-teal-400">Key Achievements</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {experience.achievements.map((achievement, index) => (
                      <li key={index} className="text-sm">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2 text-teal-600 dark:text-teal-400">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-teal-600 dark:text-teal-400">Key Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.keyFocus.map((focus, index) => (
                      <Badge key={index} variant="secondary">
                        {focus}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkExperienceAlternative

