import { featuredProjects, otherProjects } from "@/data/projects"
import { profile } from "@/data/profile"
import ProjectRow from "@/components/project-row"
import Section from "@/components/section"
import ExternalLink from "@/components/external-link"
import { useDocumentTitle } from "@/lib/use-document-title"

export default function Projects() {
  useDocumentTitle("Projects")

  return (
    <>
      <header className="pb-12 pt-20">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-4 max-w-xl text-muted">
          Things I&apos;ve built. The first few have a write-up; the rest link straight to the code.
        </p>
      </header>

      <Section title="Selected">
        <div className="grid gap-2">
          {featuredProjects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section title="Other">
        <div className="grid gap-2">
          {otherProjects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>
        <p className="mt-8 text-sm">
          <ExternalLink href={profile.links.github}>More on GitHub</ExternalLink>
        </p>
      </Section>
    </>
  )
}
