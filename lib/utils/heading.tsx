import { Section } from "@/types/sections"
import Heading from "@/components/heading"
import type { IconType } from "react-icons"
import {
  MdPerson,
  MdWork,
  MdSchool,
  MdCode,
  MdLanguage,
  MdContactMail,
  MdDescription,
  MdInfo,
  MdMusicNote,
} from "react-icons/md"
import { FaGithub } from "react-icons/fa"

// Map of sections to their icons and titles
interface SectionMapItem {
  icon: IconType
  title: string
}

const sectionMap: Record<Section, SectionMapItem> = {
  [Section.Header]: {
    icon: MdPerson,
    title: "Header",
  },
  [Section.AboutMe]: {
    icon: MdPerson,
    title: "About Me",
  },
  [Section.AboutRotW]: {
    icon: MdInfo,
    title: "About This Website",
  },
  [Section.Skills]: {
    icon: MdCode,
    title: "Skills",
  },
  [Section.Projects]: {
    icon: FaGithub,
    title: "Projects",
  },
  [Section.WorkExperience]: {
    icon: MdWork,
    title: "Work Experience",
  },
  [Section.Education]: {
    icon: MdSchool,
    title: "Education",
  },
  [Section.Languages]: {
    icon: MdLanguage,
    title: "Languages",
  },
  [Section.Contact]: {
    icon: MdContactMail,
    title: "Contact",
  },
  [Section.Resume]: {
    icon: MdDescription,
    title: "Resume",
  },
  [Section.Footer]: {
    icon: MdInfo,
    title: "Footer",
  },
  [Section.Music]: {
    icon: MdMusicNote,
    title: "Music",
  },
}

// Function to get a section heading component
export function getSectionHeading(section: Section) {
  const { icon, title } = sectionMap[section]
  return <Heading icon={icon}>{title}</Heading>
}

// Function to open URL in new tab
export function openURLInNewTab(url: string) {
  window.open(url, "_blank", "noopener,noreferrer")
}

// Export the section map for other uses
export default sectionMap

