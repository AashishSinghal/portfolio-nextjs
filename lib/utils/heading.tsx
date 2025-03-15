import Heading from "@/components/heading"
import { Section } from "@/types/sections"
import {
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaProjectDiagram,
  FaBlog,
  FaLanguage,
  FaTrophy,
  FaCertificate,
  FaHandsHelping,
  FaCamera,
  FaMusic,
  FaPalette,
  FaFileAlt,
  FaEnvelope,
  FaInfoCircle,
} from "react-icons/fa"

// Map section IDs to their icons and titles
const sectionMap = {
  [Section.AboutMe]: { icon: FaUser, title: "About Me" },
  [Section.WorkExperience]: { icon: FaBriefcase, title: "Work Experience" },
  [Section.Education]: { icon: FaGraduationCap, title: "Education" },
  [Section.Skills]: { icon: FaCode, title: "Skills" },
  [Section.Projects]: { icon: FaProjectDiagram, title: "Projects" },
  [Section.Blog]: { icon: FaBlog, title: "Blog" },
  [Section.Languages]: { icon: FaLanguage, title: "Languages" },
  [Section.Achievements]: { icon: FaTrophy, title: "Achievements" },
  [Section.Certifications]: { icon: FaCertificate, title: "Certifications" },
  [Section.Philantrophy]: { icon: FaHandsHelping, title: "Philanthropy" },
  [Section.Photography]: { icon: FaCamera, title: "Photography" },
  [Section.Music]: { icon: FaMusic, title: "Music" },
  [Section.Designs]: { icon: FaPalette, title: "Designs" },
  [Section.Resume]: { icon: FaFileAlt, title: "Resume" },
  [Section.Contact]: { icon: FaEnvelope, title: "Contact" },
  [Section.AboutRotW]: { icon: FaInfoCircle, title: "About RotW" },
}

// Function to get a section heading component
export function getSectionHeading(section: Section) {
  const { icon, title } = sectionMap[section]
  return <Heading icon={icon}>{title}</Heading>
}

// Export the section map for other uses
export { sectionMap }

