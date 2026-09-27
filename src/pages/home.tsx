import { Component, lazy, Suspense, type ReactNode } from "react"
import { profile } from "@/data/profile"
import { work } from "@/data/work"
import { featuredProjects } from "@/data/projects"
import Section from "@/components/section"
import ProjectRow from "@/components/project-row"
import PostRow from "@/components/post-row"
import { posts } from "@/data/writing"
import GitHubActivity from "@/components/github-activity"
import TechStack from "@/components/tech-stack"
import Connect from "@/components/connect"
import { useDocumentTitle } from "@/lib/use-document-title"
import { cn } from "@/lib/utils"

// three.js is big, so the 3D hero loads in its own chunk after the page
const LogoFloor = lazy(() => import("@/components/logo-floor"))

// If WebGL isn't available, the hero shows the flat logo instead
class WebGLFallback extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) {
      return <img src="/logo.png" alt="" className="mx-auto h-full w-auto opacity-80" />
    }
    return this.props.children
  }
}

// Isometric construction lines behind the hero, at ±30° like a technical drawing. The viewBox
// is sliced (not stretched) so the angles hold at any width.
function ConstructionLines() {
  const t = Math.tan(Math.PI / 6)
  const lines = [
    [0, 460 - 1000 * t, 2000, 460 + 1000 * t],
    [0, 460 + 1000 * t, 2000, 460 - 1000 * t],
    [0, 150 - 1000 * t, 2000, 150 + 1000 * t],
    [0, 150 + 1000 * t, 2000, 150 - 1000 * t],
  ]
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 2000 460"
      preserveAspectRatio="xMidYMid slice"
      className="bleed pointer-events-none absolute inset-y-0 h-full w-screen"
    >
      {lines.map(([x1, y1, x2, y2]) => (
        <line
          key={`${y1}-${y2}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="var(--color-line)"
          strokeDasharray="6 6"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}

// The availability line, with a softly pulsing teal dot
function Availability({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-center gap-2 text-muted", className)}>
      <span className="relative flex size-2 shrink-0">
        <span className="absolute inset-0 animate-ping rounded-full bg-teal/60 motion-reduce:hidden" />
        <span className="relative size-2 rounded-full bg-teal" />
      </span>
      {profile.availability}
    </p>
  )
}

// Laid out like a drawing sheet: the 3D figure in a frame, then my photo overlapping its
// bottom-left corner next to the name and role in ruled rows
function Hero() {
  return (
    <header className="relative -mx-5">
      <figure className="relative h-64 sm:h-80">
        <ConstructionLines />
        <WebGLFallback>
          <Suspense fallback={null}>
            <LogoFloor />
          </Suspense>
        </WebGLFallback>
      </figure>
      <div aria-hidden="true" className="bleed border-t border-line" />
      <div className="relative flex">
        <div className="shrink-0 border-r border-line p-2 sm:p-3">
          <img
            src="/avatar.webp"
            alt={profile.name}
            width={144}
            height={144}
            className="-mt-12 size-24 rounded-full border border-line bg-bg object-cover sm:-mt-16 sm:size-32"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-end">
          <h1 className="border-b border-line px-4 pt-2 pb-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            {profile.name}
          </h1>
          <div className="flex items-center justify-between gap-4 px-4 py-2 font-mono text-sm">
            <p className="text-muted">{profile.role}.</p>
            {profile.availability && <Availability className="hidden sm:flex" />}
          </div>
        </div>
      </div>
      {profile.availability && (
        <div className="border-t border-line px-4 py-2 font-mono text-sm sm:hidden">
          <Availability />
        </div>
      )}
      <div aria-hidden="true" className="bleed border-t border-line" />
    </header>
  )
}

export default function Home() {
  useDocumentTitle()

  return (
    <>
      <Hero />

      <section className="pt-8 pb-12">
        <p className="max-w-xl text-lg text-muted">{profile.intro}</p>
      </section>

      <Section id="github" title="GitHub">
        <GitHubActivity />
      </Section>

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
      </Section>

      <Section id="stack" title="Tech stack">
        <TechStack />
      </Section>

      <Section id="projects" title="Projects" more={{ label: "All projects", to: "/projects" }}>
        <div className="grid gap-2">
          {featuredProjects.slice(0, 4).map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      {posts.length > 0 && (
        <Section id="writing" title="Writing" more={{ label: "All posts", to: "/writing" }}>
          <ul className="grid gap-1">
            {posts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <PostRow post={post} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section id="arcade" title="Arcade">
        <p className="text-muted">
          Small browser games I build for fun live in their own arcade.{" "}
          <a href={profile.links.arcade} className="link">
            Play at arcade.aashishsinghal.com
          </a>
        </p>
      </Section>

      <Section id="contact" title="Connect">
        <p className="mb-8 max-w-xl text-muted">
          Have a project, a role, or just want to say hi? Email me, or find me on any of these.
        </p>
        <Connect />
      </Section>
    </>
  )
}
