import type { Section } from "@/types/sections"
import Heading from "@/components/heading"
import sectionsList from "@/data/sections"

/**
 * Get a section heading component with the appropriate icon and title
 * @param section The section identifier
 * @returns A Heading component with the section's icon and title
 */
export function getSectionHeading(section: Section) {
  const { icon, title } = sectionsList[section]
  return <Heading icon={icon}>{title}</Heading>
}

/**
 * Open a URL in a new tab
 * @param url The URL to open
 */
export function openURLInNewTab(url: string) {
  window.open(url, "_blank", "noopener,noreferrer")
}

