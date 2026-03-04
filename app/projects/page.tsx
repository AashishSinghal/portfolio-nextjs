import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/site-data";

export const metadata = {
  title: "Projects | Aashish Singhal",
  description: "Engineering projects and demos.",
};

export default function ProjectsPage() {
  return (
    <div className="relative z-[1]">
      <span className="section-label">Projects</span>
      <h1 className="section-title mt-1 text-3xl sm:text-4xl">All projects</h1>
      <p className="mt-4 max-w-2xl text-sm text-[var(--foreground-muted)]">
        Full-stack apps, desktop tools, and open-source projects. Live demo or download where available.
      </p>
      <ul className="mt-12 space-y-1">
        {projects.map((project, i) => (
          <li key={project.id} className="animate-in-up" style={{ animationDelay: `${40 + i * 30}ms` }}>
            <Link
              href={`/projects/${project.slug}`}
              className="card-spine flex gap-6 py-5 transition-colors hover:bg-[var(--card)]/50"
            >
              <div className="relative h-28 w-40 shrink-0 overflow-hidden bg-[var(--background)] sm:h-36 sm:w-52">
                <Image src={project.image} alt="" fill className="object-cover" sizes="208px" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-display)" }}>
                  {project.name}
                </span>
                <p className="mt-1 line-clamp-2 text-sm text-[var(--foreground-muted)]">{project.summary}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.slice(0, 5).map((t) => (
                    <span key={t} className="text-xs text-[var(--border)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
