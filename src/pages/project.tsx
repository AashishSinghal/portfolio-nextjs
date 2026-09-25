import { Link, useParams } from "react-router"
import { featuredProjects, getProject } from "@/data/projects"
import ExternalLink from "@/components/external-link"
import NotFound from "@/pages/not-found"
import { useDocumentTitle } from "@/lib/use-document-title"

const sections = [
  { key: "problem", title: "The problem" },
  { key: "built", title: "What I built" },
  { key: "challenges", title: "Hard parts" },
] as const

export default function ProjectPage() {
  const { slug = "" } = useParams()
  const project = getProject(slug)
  useDocumentTitle(project?.name)

  if (!project || !project.featured) return <NotFound />

  const index = featuredProjects.findIndex((p) => p.slug === project.slug)
  const next = featuredProjects[(index + 1) % featuredProjects.length]

  return (
    <article className="pb-20 pt-12">
      <Link to="/projects" className="text-sm text-muted transition-colors hover:text-teal">
        ← Projects
      </Link>

      <header className="mt-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.name}</h1>
        <p className="mt-4 text-lg text-muted sm:text-xl">{project.summary}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-line py-4 text-sm">
          <span className="text-faint">{project.stack.join(" · ")}</span>
          <span className="flex gap-6 sm:ml-auto">
            {project.links.live && <ExternalLink href={project.links.live}>Live site</ExternalLink>}
            {project.links.code && (
              <ExternalLink href={project.links.code}>Source code</ExternalLink>
            )}
          </span>
        </div>
      </header>

      {/* Cover image, Medium-style: breaks out of the reading column on wide screens */}
      {project.image && (
        <figure className="mt-10 lg:-mx-24">
          <img
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            fetchPriority="high"
            className="w-full rounded-xl border border-line"
          />
        </figure>
      )}

      <div className="mt-4">
        {sections.map(({ key, title }) =>
          project.caseStudy?.[key] ? (
            <section key={key} className="mt-12">
              <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
              <div className="mt-4 grid gap-4 text-lg leading-relaxed text-muted">
                {project.caseStudy[key]!.split("\n\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ) : null
        )}
      </div>

      {next && next.slug !== project.slug && (
        <Link
          to={`/projects/${next.slug}`}
          className="group mt-16 flex items-center justify-between border-t border-line pt-6 text-muted transition-colors hover:text-fg"
        >
          <span className="text-sm">Next project</span>
          <span className="font-medium group-hover:text-gold">{next.name} →</span>
        </Link>
      )}
    </article>
  )
}
