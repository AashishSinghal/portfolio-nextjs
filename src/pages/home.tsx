import { profile, skills } from "@/data/profile"
import { work } from "@/data/work"
import { featuredProjects } from "@/data/projects"
import Section from "@/components/section"
import ProjectRow from "@/components/project-row"
import ContactForm from "@/components/contact-form"
import ExternalLink from "@/components/external-link"
import { useDocumentTitle } from "@/lib/use-document-title"

export default function Home() {
  useDocumentTitle()

  return (
    <>
      <section className="pb-16 pt-20 sm:pt-28">
        <p className="text-sm text-gold">{profile.location}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{profile.intro}</p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
          <ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink>
          <ExternalLink href={profile.links.resume}>Resume</ExternalLink>
        </div>
      </section>

      <Section id="work" title="Work">
        <ol className="grid gap-10">
          {work.map((job) => (
            <li key={job.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noreferrer" className="hover:text-gold">
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                <p className="font-mono text-sm tabular-nums text-faint">
                  {job.start === job.end ? job.start : `${job.start} – ${job.end}`}
                </p>
              </div>
              <p className="text-muted">{job.role}</p>
              {job.highlights.length > 0 && (
                <ul className="mt-3 grid gap-2 text-muted">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 bg-teal" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-10 text-sm text-faint">{skills.join(" · ")}</p>
      </Section>

      <Section title="Projects" more={{ label: "All projects", to: "/projects" }}>
        <div className="grid gap-2">
          {featuredProjects.slice(0, 4).map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section title="Arcade">
        <p className="text-muted">
          Small browser games I build for fun live in their own arcade.{" "}
          <a href={profile.links.arcade} className="link">
            Play at arcade.aashishsinghal.com
          </a>
        </p>
      </Section>

      <Section id="contact" title="Contact">
        <p className="mb-8 max-w-xl text-muted">
          Have a project, a role, or just want to say hi? Send me a message, or find me on{" "}
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="link">
            LinkedIn
          </a>
          .
        </p>
        <ContactForm />
      </Section>
    </>
  )
}
