import Image from "next/image";
import Link from "next/link";
import { allPosts, allGames } from "contentlayer/generated";
import { personal, projects } from "@/lib/site-data";

export default function Home() {
  const featuredProjects = projects.slice(0, 6);
  const latestPosts = allPosts.slice(0, 3);
  const { contact } = personal;

  return (
    <div className="relative z-[1]">
      {/* Hero: one line, huge type */}
      <section className="animate-in-up mb-32 mt-4">
        <h1
          className="text-5xl font-extrabold leading-[0.95] tracking-tighter text-[var(--foreground)] sm:text-7xl md:text-8xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {personal.name.split(" ").map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-md text-[var(--foreground-muted)]" style={{ fontFamily: "var(--font-body)" }}>
          {personal.tagline}
        </p>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">{personal.title}</p>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <Link href="/projects" className="link-underline text-[var(--primary)]">
            Projects
          </Link>
          <span className="text-[var(--border)]">/</span>
          <Link href="/blog" className="link-underline text-[var(--primary)]">
            Blog
          </Link>
          <span className="text-[var(--border)]">/</span>
          <Link href="/resume" className="link-underline text-[var(--primary)]">
            Resume
          </Link>
        </div>
      </section>

      {/* Featured Projects — left-border cards */}
      <section className="animate-in-up delay-1 mb-32">
        <span className="section-label">01</span>
        <h2 className="section-title mt-1 text-2xl sm:text-3xl">Featured Projects</h2>
        <ul className="mt-10 space-y-1">
          {featuredProjects.map((project, i) => (
            <li key={project.id} className="animate-in-up" style={{ animationDelay: `${80 + i * 40}ms` }}>
              <Link
                href={`/projects/${project.slug}`}
                className="card-spine flex gap-6 py-5 transition-colors hover:bg-[var(--card)]/50"
              >
                <div className="relative h-24 w-32 shrink-0 overflow-hidden bg-[var(--background)] sm:h-28 sm:w-40">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-display)" }}>
                    {project.name}
                  </span>
                  <p className="mt-0.5 line-clamp-2 text-sm text-[var(--foreground-muted)]">{project.summary}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((t) => (
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
        <Link href="/projects" className="link-underline mt-6 inline-block text-sm text-[var(--primary)]">
          All projects →
        </Link>
      </section>

      {/* Latest Blogs */}
      <section className="animate-in-up delay-2 mb-32">
        <span className="section-label">02</span>
        <h2 className="section-title mt-1 text-2xl sm:text-3xl">Latest Posts</h2>
        <ul className="mt-10 space-y-1">
          {latestPosts.map((post, i) => (
            <li key={post.slug} className="animate-in-up" style={{ animationDelay: `${120 + i * 50}ms` }}>
              <Link
                href={`/blog/${post.slug}`}
                className="card-spine block py-4 transition-colors hover:bg-[var(--card)]/50"
              >
                <span className="font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-display)" }}>
                  {post.title}
                </span>
                <p className="mt-0.5 text-sm text-[var(--foreground-muted)]">{post.excerpt || post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/blog" className="link-underline mt-6 inline-block text-sm text-[var(--primary)]">
          All posts →
        </Link>
      </section>

      {/* Games */}
      <section className="animate-in-up delay-3 mb-32">
        <span className="section-label">03</span>
        <h2 className="section-title mt-1 text-2xl sm:text-3xl">Games</h2>
        <ul className="mt-10 space-y-1">
          {allGames.map((game, i) => (
            <li key={game.slug} className="animate-in-up" style={{ animationDelay: `${160 + i * 50}ms` }}>
              <Link
                href={`/games/${game.slug}`}
                className="card-spine block py-4 transition-colors hover:bg-[var(--card)]/50"
              >
                <span className="font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-display)" }}>
                  {game.title}
                </span>
                <p className="mt-0.5 text-sm text-[var(--foreground-muted)]">{game.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/games" className="link-underline mt-6 inline-block text-sm text-[var(--primary)]">
          All games →
        </Link>
      </section>

      {/* Contact */}
      <section className="animate-in-up delay-4">
        <span className="section-label">04</span>
        <h2 className="section-title mt-1 text-2xl sm:text-3xl">Contact</h2>
        <p className="mt-6 text-[var(--foreground-muted)]">
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="link-underline text-[var(--primary)]">
            GitHub
          </a>
          {" · "}
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline text-[var(--primary)]">
            LinkedIn
          </a>
          {" · "}
          <a href={contact.email} className="link-underline text-[var(--primary)]">
            Email
          </a>
          {" · "}
          <Link href="/about" className="link-underline text-[var(--primary)]">
            About
          </Link>
        </p>
      </section>
    </div>
  );
}
