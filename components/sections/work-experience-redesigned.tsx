"use client"

import { Section } from "@/types/sections"
import { getSectionHeading } from "@/lib/utils/sections"
import TimelineSection, { type TimelineItem } from "./timeline-section"
import { Briefcase } from "lucide-react"

const workExperiences: TimelineItem[] = [
  {
    id: 1,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nutanix-bDZGHr93KhOanIOmpWaNEuQyBsPL29.png",
    title: "Nutanix Technologies",
    subtitle: "Member of Technical Staff 2",
    period: { start: "Jan 2022", end: "Present" },
    location: "Bangalore, Karnataka, India",
    description:
      "Developing and maintaining high-performance web applications for the Sales Portal, focusing on feature development, UI improvements, and system integrations.",
    tags: ["React", "TypeScript", "Node.js", "GraphQL", "Java", "Spring Boot", "Redux", "Feature Flags", "UI Library"],
    link: "https://www.nutanix.com/",
    achievements: [
      "Delivered two new high-performance projects with three distinct quote types, reducing manual effort by 60% and accelerating quote generation by 40%",
      "Integrated OS offerings using feature flags for controlled deployment, ensuring stability and minimizing user disruptions",
      "Led the migration of the front-end to an in-house UI library, refactoring legacy components and standardizing UI patterns, resulting in a 40% reduction in deployment errors",
      "Developed a Feature Flag Management Portal with an intuitive interface for dynamic feature toggling, cutting Production Errors by 50%",
      "Designed and implemented critical features such as User Permission Manager and Bulk Edit functionality to enhance workflows and increase user adoption by 30%",
    ],
  },
  {
    id: 2,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/celebal-GJurBBHePLBbiNH2wrp71iBCKwn838.png",
    title: "Celebal Technologies",
    subtitle: "Full Stack Developer",
    period: { start: "Jan 2021", end: "Nov 2021" },
    location: "Jaipur, Rajasthan, India",
    description:
      "Developed full-stack applications using MERN stack with TypeScript, focusing on Microsoft Teams integrations and mentoring junior developers.",
    tags: ["React", "Redux", "TypeScript", "Node.js", "Express", "MongoDB", "Teams UI Library", "REST APIs"],
    link: "https://celebaltech.com/",
    achievements: [
      "Architected and deployed a streamlined Order Management Portal on the Teams App Store, automating workflows and reducing order processing time by 35%",
      "Spearheaded the development of an in-house HR Management Portal, redesigning the architecture to enhance performance by 40% and simplify the codebase",
      "Designed and optimized a comprehensive web solution for a client, implementing performance enhancements that cut UI load time by 40%",
      "Mentored and upskilled multiple interns, introducing best practices and streamlined workflows that reduced deployment time by 30%",
    ],
  },
  {
    id: 3,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sfity-wcfh6e9OKQgPhN3IcCBph8mHr5dbMG.png",
    title: "SFITY INDIA LLP",
    subtitle: "ReactJS Developer (Intern)",
    period: { start: "Dec 2020", end: "Jan 2021" },
    location: "Jaipur, Rajasthan, India",
    description:
      "Developed web pages based on UI designs and incorporated animations, while also designing views based on client requirements.",
    tags: ["React", "Next.js", "JavaScript", "HTML", "CSS", "AOS Animation Library"],
    achievements: [
      "Developed responsive web pages based on provided UI designs",
      "Incorporated animations to enhance user experience",
      "Designed custom views based on client requirements",
      "Collaborated with the development team to ensure consistent implementation",
    ],
  },
  {
    id: 4,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/innofarms-8AetEa8ECt6JfSiOyrIO0UEsaPNTjv.png",
    title: "Innofarms",
    subtitle: "Front-End Developer & UI Designer (Intern)",
    period: { start: "May 2020", end: "July 2020" },
    location: "Jaipur, Rajasthan, India",
    description:
      "Worked on UI/UX for a hybrid application, implementing designs using Angular and Cordova to create a hybrid mobile application.",
    tags: ["Angular", "JavaScript", "HTML", "CSS", "Cordova", "Adobe XD"],
    achievements: [
      "Designed UI/UX for a hybrid application using Adobe XD",
      "Implemented the application using Angular framework",
      "Used Cordova to create a hybrid mobile application",
      "Collaborated with the team to ensure design consistency",
      "Optimized the application for various mobile devices",
    ],
  },
]

export default function WorkExperienceRedesigned() {
  return (
    <div id={Section.WorkExperience} className="mb-12">
      {/*{getSectionHeading(Section.WorkExperience)}*/}

      <TimelineSection
        title="Professional Journey"
        items={workExperiences}
        icon={<Briefcase className="h-5 w-5 text-teal-500 dark:text-teal-400" />}
      />
    </div>
  )
}

