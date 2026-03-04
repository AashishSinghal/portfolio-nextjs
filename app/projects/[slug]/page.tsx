import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import MDXContent from "@/components/MDXContent";
import { getProjectBySlug, projects as siteDataProjects } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const contentlayerSlugs = allProjects.map((p) => ({ slug: p.slug }));
  const dataSlugs = siteDataProjects.map((p) => ({ slug: p.slug }));
  const combined = [...contentlayerSlugs];
  dataSlugs.forEach(({ slug }) => {
    if (!combined.some((c) => c.slug === slug)) combined.push({ slug });
  });
  return combined;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const contentlayerProject = allProjects.find((p) => p.slug === slug);
  if (contentlayerProject)
    return {
      title: `${contentlayerProject.title} | Projects | Aashish Singhal`,
      description: contentlayerProject.description,
    };
  const dataProject = getProjectBySlug(slug);
  if (dataProject)
    return {
      title: `${dataProject.name} | Projects | Aashish Singhal`,
      description: dataProject.summary,
    };
  return {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const contentlayerProject = allProjects.find((p) => p.slug === slug);
  const dataProject = getProjectBySlug(slug);

  if (contentlayerProject) {
    const code =
      typeof contentlayerProject.body === "object" && "code" in contentlayerProject.body
        ? (contentlayerProject.body as { code: string }).code
        : "";
    return (
      <div className="relative z-[1] py-8">
        <Link href="/projects" className="link-underline text-sm text-[var(--primary)]">
          ← Projects
        </Link>
        <article className="animate-in-up mt-8">
          <h1
            className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {contentlayerProject.title}
          </h1>
          <p className="mt-3 text-[var(--foreground-muted)]">{contentlayerProject.description}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {contentlayerProject.demoUrl && (
              <a
                href={contentlayerProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--primary)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--card)]"
              >
                View Demo →
              </a>
            )}
            {contentlayerProject.githubUrl && (
              <a
                href={contentlayerProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--primary)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--card)]"
              >
                GitHub →
              </a>
            )}
          </div>
          <div className="mt-10">
            <MDXContent code={code} />
          </div>
        </article>
      </div>
    );
  }

  if (dataProject) {
    const { name, summary, image, tags, link } = dataProject;
return (
    <div className="relative z-[1] py-8">
      <Link href="/projects" className="link-underline text-sm text-[var(--primary)]">
        ← Projects
      </Link>
      <article className="animate-in-up mt-8">
        <div className="relative aspect-video w-full overflow-hidden bg-[var(--card)]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>
        <h1
          className="mt-8 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {name}
        </h1>
          <p className="mt-3 leading-relaxed text-[var(--foreground-muted)]">{summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded bg-[var(--border-subtle)] px-2 py-0.5 text-sm text-[var(--foreground-muted)]"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={link.web}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] transition-all hover:opacity-95 hover:shadow-lg hover:shadow-[var(--primary)]/20"
            >
              View Demo →
            </a>
            <a
              href={link.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--primary)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--card)]"
            >
              GitHub →
            </a>
          </div>
        </article>
      </div>
    );
  }

  notFound();
}
