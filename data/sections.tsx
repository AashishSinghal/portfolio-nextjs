import { AiFillSafetyCertificate } from "react-icons/ai"
import { BiDonateHeart } from "react-icons/bi"
import { FaAward, FaDev, FaFilePdf, FaPaintBrush, FaPaperPlane, FaSignLanguage, FaTools } from "react-icons/fa"
import { MdBook, MdCamera, MdInfo, MdMusicNote, MdPerson, MdSchool, MdWork } from "react-icons/md"
import { Section, type SectionArray, type SectionMap } from "@/types/sections"

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

const sectionsList: SectionMap = {
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
  [Section.Blog]: {
    icon: MdBook,
    title: "Blog",
  },
  [Section.Languages]: {
    icon: FaSignLanguage,
    title: "Languages",
  },
  [Section.Achievements]: {
    icon: FaAward,
    title: "Achievements",
  },
  [Section.Certifications]: {
    icon: AiFillSafetyCertificate,
    title: "Certifications",
  },
  [Section.Philantrophy]: {
    icon: BiDonateHeart,
    title: "Philantrophy",
  },
  [Section.Photography]: {
    icon: MdCamera,
    title: "Photography",
  },
  [Section.Music]: {
    icon: MdMusicNote,
    title: "Music",
  },
  [Section.Designs]: {
    icon: FaPaintBrush,
    title: "Designs",
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
}

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
  // { id: Section.Blog, icon: sectionsList[Section.Blog].icon, title: sectionsList[Section.Blog].title },
  { id: Section.Languages, icon: sectionsList[Section.Languages].icon, title: sectionsList[Section.Languages].title },
  // { id: Section.Achievements, icon: sectionsList[Section.Achievements].icon, title: sectionsList[Section.Achievements].title },
  // { id: Section.Certifications, icon: sectionsList[Section.Certifications].icon, title: sectionsList[Section.Certifications].title },
  // { id: Section.Philantrophy, icon: sectionsList[Section.Philantrophy].icon, title: sectionsList[Section.Philantrophy].title },
  // { id: Section.Photography, icon: sectionsList[Section.Photography].icon, title: sectionsList[Section.Photography].title },
  { id: Section.Music, icon: sectionsList[Section.Music].icon, title: sectionsList[Section.Music].title },
  // { id: Section.Designs, icon: sectionsList[Section.Designs].icon, title: sectionsList[Section.Designs].title },
  { id: Section.Resume, icon: sectionsList[Section.Resume].icon, title: sectionsList[Section.Resume].title },
  { id: Section.Contact, icon: sectionsList[Section.Contact].icon, title: sectionsList[Section.Contact].title },
  { id: Section.AboutRotW, icon: sectionsList[Section.AboutRotW].icon, title: sectionsList[Section.AboutRotW].title },
]

export default sectionsList

