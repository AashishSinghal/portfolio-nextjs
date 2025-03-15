import { FaDev, FaFilePdf, FaPaperPlane, FaSignLanguage, FaTools } from "react-icons/fa"
import { MdInfo, MdPerson, MdSchool, MdWork } from "react-icons/md"
import { Section, type SectionArray, type SectionMap } from "@/types/sections"
import { MdMusicNote } from "react-icons/md"

/**
 * Sections Data
 *
 * This file contains information about the different sections of the portfolio.
 *
 * MODIFICATIONS:
 * 1. Updated from the original sections.ts file
 * 2. Updated import paths to use absolute imports with @/ prefix
 * 3. Ensured compatibility with the Section enum and types
 * 4. Added comments for better readability
 */

// Define the complete SectionMap with all required properties
const sectionsList = {
  [Section.AboutMe]: {
    icon: MdPerson,
    title: "About Me",
  },
  [Section.WorkExperience]: {
    icon: MdWork,
    title: "Work Experience",
  },
  [Section.Education]: {
    icon: MdSchool,
    title: "Education",
  },
  [Section.Skills]: {
    icon: FaTools,
    title: "Skills",
  },
  [Section.Projects]: {
    icon: FaDev,
    title: "Projects",
  },
  [Section.Languages]: {
    icon: FaSignLanguage,
    title: "Languages",
  },
  [Section.Music]: {
    icon: MdMusicNote,
    title: "Music",
  },
  [Section.Resume]: {
    icon: FaFilePdf,
    title: "Resume",
  },
  [Section.Contact]: {
    icon: FaPaperPlane,
    title: "Contact",
  },
  [Section.AboutRotW]: {
    icon: MdInfo,
    title: "About My Portfolio Website",
  },
  // Add header and footer for SectionMap type compatibility
  header: {
    icon: MdInfo,
    title: "Header",
  },
  footer: {
    icon: MdInfo,
    title: "Footer",
  },
} as SectionMap

// Create an array of active sections (uncomment sections as needed)
export const sectionsArray: SectionArray = [
  { id: Section.AboutMe, icon: sectionsList[Section.AboutMe].icon, title: sectionsList[Section.AboutMe].title },
  {
    id: Section.WorkExperience,
    icon: sectionsList[Section.WorkExperience].icon,
    title: sectionsList[Section.WorkExperience].title,
  },
  { id: Section.Education, icon: sectionsList[Section.Education].icon, title: sectionsList[Section.Education].title },
  { id: Section.Skills, icon: sectionsList[Section.Skills].icon, title: sectionsList[Section.Skills].title },
  { id: Section.Projects, icon: sectionsList[Section.Projects].icon, title: sectionsList[Section.Projects].title },
  // Removed Blog section reference
  { id: Section.Languages, icon: sectionsList[Section.Languages].icon, title: sectionsList[Section.Languages].title },
  // Removed Achievements section reference
  // Removed Certifications section reference
  // Removed Philantrophy section reference
  // Removed Photography section reference
  { id: Section.Music, icon: sectionsList[Section.Music].icon, title: sectionsList[Section.Music].title },
  // Removed Designs section reference
  { id: Section.Resume, icon: sectionsList[Section.Resume].icon, title: sectionsList[Section.Resume].title },
  { id: Section.Contact, icon: sectionsList[Section.Contact].icon, title: sectionsList[Section.Contact].title },
  { id: Section.AboutRotW, icon: sectionsList[Section.AboutRotW].icon, title: sectionsList[Section.AboutRotW].title },
]

export default sectionsList

