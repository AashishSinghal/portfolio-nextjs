import { Link } from "react-router"
import type { Project } from "@/data/projects"
import ExternalLink from "@/components/external-link"

// Featured projects link to their case study; the rest link straight out
export default function ProjectRow({ project }: { project: Project }) {
  const body = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-medium text-fg transition-colors group-hover:text-gold">
          {project.name}
        </h3>
        {project.featured && (
          <span aria-hidden="true" className="text-faint transition-colors group-hover:text-gold">
            →
          </span>
        )}
      </div>
      <p className="mt-1 text-muted">{project.summary}</p>
      <p className="mt-2 text-sm text-faint">{project.stack.join(" · ")}</p>
    </>
  )

  if (project.featured) {
    return (
      <Link
        to={`/projects/${project.slug}`}
        className="group -mx-4 block rounded-xl px-4 py-4 transition-colors hover:bg-surface"
      >
        {body}
      </Link>
    )
  }

  return (
    <div className="-mx-4 px-4 py-4">
      {body}
      <div className="mt-2 flex gap-4 text-sm">
        {project.links.live && <ExternalLink href={project.links.live}>Live</ExternalLink>}
        {project.links.code && <ExternalLink href={project.links.code}>Code</ExternalLink>}
      </div>
    </div>
  )
}
