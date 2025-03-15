import type { IconType } from "react-icons"

// Define the Section enum
export enum Section {
  Header = "header",
  AboutMe = "about-me",
  AboutRotW = "about-rotw",
  Skills = "skills",
  Projects = "projects",
  WorkExperience = "work-experience",
  Education = "education",
  Languages = "languages",
  Contact = "contact",
  Resume = "resume",
  Footer = "footer",
  Music = "music",
}

// Define the SectionInfo type
export type SectionInfo = {
  icon: IconType
  title: string
}

// Define the SectionMap type
export type SectionMap = {
  [key in Section]: SectionInfo
}

// Define the SectionArray type
export type SectionArray = Array<{
  id: Section
  icon: IconType
  title: string
}>

// Define the Project type
export type Project = {
  id: number
  image: string
  name: string
  summary: string
  tags: string[]
  link: {
    web?: string
    github?: string
  }
}

// Define the Language type
export type Language = {
  id: number
  language: string
  text: string
  translation?: string
}

// Define other types from the original file
export type Article = {
  id: string
  title: string
  description: string
  url: string
  publishedAt: string
}

export type DribbbleShot = {
  id: string
  title: string
  description: string
  images: {
    normal: string
  }
  html_url: string
}

export type InstagramMedia = {
  id: string
  media_url: string
  permalink: string
  caption: string
}

