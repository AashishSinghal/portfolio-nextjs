"use client"

import Tippy from "@tippyjs/react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"
import { FaLocationArrow } from "react-icons/fa"
import { MdMoreHoriz } from "react-icons/md"
import { Section } from "@/types/sections"
import { getSectionHeading } from "@/lib/utils/heading"

const DISPLAY_COUNT = 4

type WorkExperience = {
  id: number
  logo: string
  name: string
  period: { start: string; end: string }
  position: string
  location: string
  summary: string
  keyFocus: string[]
  achievements?: string[]
}

const workExperiences: WorkExperience[] = [
  {
    id: 1,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nutanix-bDZGHr93KhOanIOmpWaNEuQyBsPL29.png", // Nutanix logo
    name: "Nutanix Technologies Pvt. Ltd.",
    period: { start: "Jan 2022", end: "Present" },
    position: "Member of Technical Staff 2",
    location: "Bangalore, Karnataka, India (Hybrid)",
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
      "Integrated OS offerings using feature flags for controlled deployment",
      "Led front-end migration to in-house UI library, reducing deployment errors by 40%",
      "Developed Feature Flag Management Portal, cutting production errors by 50%",
      "Designed critical features like User Permission Manager and Bulk Edit functionality",
    ],
  },
  {
    id: 2,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/celebal-GJurBBHePLBbiNH2wrp71iBCKwn838.png", // Celebal logo
    name: "Celebal Technologies Pvt. Ltd.",
    period: { start: "Jan 2021", end: "Nov 2021" },
    position: "Full Stack Developer",
    location: "Jaipur, Rajasthan, India (Hybrid)",
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
      "Architected Order Management Portal for Teams App Store, reducing processing time by 35%",
      "Spearheaded in-house HR Management Portal development, enhancing performance by 40%",
      "Designed web solutions that cut UI load time by 40%, increasing user satisfaction by 25%",
      "Mentored interns, introducing best practices that reduced deployment time by 30%",
    ],
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
  },
]

type ExperienceItemProps = {
  data: WorkExperience
  isFirst: boolean
  isLast: boolean
}

const ExperienceItem = ({ data, isFirst, isLast }: ExperienceItemProps) => (
  <div className="flex group">
    <div className={cn("ml-1 w-1 flex-shrink-0 bg-neutral-500/25", { "rounded-t": isFirst, "rounded-b": isLast })} />

    <div className="-ml-2 mt-8 flex-shrink-0 relative w-3 h-3 rounded-full shadow-lg bg-teal-500/80 dark:bg-white/80 group-hover:w-6 transition-[width]" />

    <div className="mt-5 ml-8 grid gap-2 pb-2">
      <div className="relative w-[100px] h-[40px]">
        <Image src={data.logo || "/placeholder.svg"} fill style={{ objectFit: "contain" }} alt={data.name} />
      </div>

      <div>
        <h3>
          <span className="text-base font-bold">{data.name}</span>{" "}
          <span className="text-xs">
            ({data.period.start} - {data.period.end})
          </span>
        </h3>
        <h4 className="font-medium">{data.position}</h4>
      </div>

      <h5 className="my-1 flex gap-2 items-center text-xs">
        <FaLocationArrow />
        <span>{data.location}</span>
      </h5>

      <p className="prose prose-sm prose-neutral dark:prose-invert">{data.summary}</p>

      {data.achievements && data.achievements.length > 0 && (
        <div className="mt-2">
          <p className="font-medium text-sm mb-1">Key Achievements:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs prose prose-sm prose-neutral dark:prose-invert">
            {data.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs leading-relaxed prose-sm prose-neutral dark:prose-invert mt-2">
        <strong>Key Focus:</strong> {data.keyFocus.join(", ")}
      </p>
    </div>
  </div>
)

const WorkExperienceTimeline = () => {
  const [showMore, setShowMore] = useState(workExperiences.length > DISPLAY_COUNT ? false : true)

  return (
    <div id={Section.WorkExperience}>
      {getSectionHeading(Section.WorkExperience)}

      <div className="flex flex-col">
        {workExperiences
          .filter((_, index) => (showMore ? true : index < DISPLAY_COUNT))
          .map((data, index, filteredArray) => (
            <ExperienceItem
              key={data.id}
              data={data}
              isFirst={index === 0}
              isLast={index === filteredArray.length - 1}
            />
          ))}
      </div>

      {!showMore && (
        <Tippy content={`Show ${workExperiences.length - DISPLAY_COUNT} More`} placement="right">
          <div className="inline-block ml-8 p-2 cursor-pointer" onClick={() => setShowMore(true)}>
            <MdMoreHoriz size="24" />
          </div>
        </Tippy>
      )}
    </div>
  )
}

export default WorkExperienceTimeline

