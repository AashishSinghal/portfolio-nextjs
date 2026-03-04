import Link from "next/link";
import { notFound } from "next/navigation";
import { allGames } from "contentlayer/generated";
import MDXContent from "@/components/MDXContent";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allGames.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const game = allGames.find((g) => g.slug === slug);
  if (!game) return {};
  return {
    title: `${game.title} | Games | Aashish Singhal`,
    description: game.description,
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = allGames.find((g) => g.slug === slug);
  if (!game) notFound();

  const code = typeof game.body === "object" && "code" in game.body ? (game.body as { code: string }).code : "";

  return (
    <div className="relative z-[1] py-8">
      <Link href="/games" className="link-underline text-sm text-[var(--primary)]">
        ← Games
      </Link>
      <article className="animate-in-up mt-8">
        <h1
          className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {game.title}
        </h1>
        <p className="mt-3 text-[var(--foreground-muted)]">
          {game.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          {game.playUrl && (
            <a
              href={game.playUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] transition-all hover:opacity-95 hover:shadow-lg hover:shadow-[var(--primary)]/20"
            >
              Play →
            </a>
          )}
          {game.githubUrl && (
            <a
              href={game.githubUrl}
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
