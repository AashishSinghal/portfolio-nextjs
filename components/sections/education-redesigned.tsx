"use client"

import { Section } from "@/types/sections"
import { getSectionHeading } from "@/lib/utils/sections"
import TimelineSection, { type TimelineItem } from "./timeline-section"
import { GraduationCap } from "lucide-react"

const educationItems: TimelineItem[] = [
  {
    id: 1,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/poornima-yfRpfCp3aUSKc7BBsJpjgANMGMtFpj.png",
    title: "Poornima College of Engineering",
    subtitle: "Bachelor's Degree, Computer Science & Engineering",
    period: { start: "2017", end: "2021" },
    location: "Jaipur, Rajasthan, India",
    description:
      "Completed a Bachelor's degree in Computer Science & Engineering with a focus on software development and web technologies.",
    tags: ["Computer Science", "Web Development", "Software Engineering", "Data Structures", "Algorithms"],
    achievements: [
      "Head of Web Development for annual college fest AAROHAN 2020",
      "Guided Poornima Alumni Association as Design Head",
      "Participated in various hackathons and coding competitions",
      "Developed multiple projects using modern web technologies",
    ],
  },
  {
    id: 2,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mis-M2xtUZLSgzx4QTwHXcve1PFfamuMa2.png",
    title: "Mittal International School",
    subtitle: "High School, CBSE",
    period: { start: "2011", end: "2016" },
    location: "Kota, Rajasthan, India",
    description:
      "Completed high school education with a focus on science and mathematics, laying the foundation for further studies in engineering.",
    tags: ["Science", "Mathematics", "Computer Science", "Physics", "Chemistry"],
  },
  {
    id: 3,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shivam-6ARWwJSYUWm7rZfRikvN6JK26EoqEP.png",
    title: "Shivam Sarvodya Sr. Sec. School",
    subtitle: "Elementary & Primary School, RBSE",
    period: { start: "2000", end: "2011" },
    location: "Atru, Rajasthan, India",
    description:
      "Completed elementary and primary education, developing a strong foundation in core subjects and participating in various extracurricular activities.",
    tags: ["General Education", "Mathematics", "Science", "Languages"],
  },
]

export default function EducationRedesigned() {
  return (
    <div id={Section.Education} className="mb-12">
      {/*{getSectionHeading(Section.Education)}*/}

      <TimelineSection
        title="Educational Background"
        items={educationItems}
        icon={<GraduationCap className="h-5 w-5 text-teal-500 dark:text-teal-400" />}
      />
    </div>
  )
}

