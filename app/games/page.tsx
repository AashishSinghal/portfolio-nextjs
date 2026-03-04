import Link from "next/link";
import { allGames } from "contentlayer/generated";

export const metadata = {
  title: "Games | Aashish Singhal",
  description: "Browser games and demos.",
};

export default function GamesPage() {
  return (
    <div className="relative z-[1]">
      <span className="section-label">Games</span>
      <h1 className="section-title mt-1 text-3xl sm:text-4xl">All games</h1>
      <ul className="mt-12 space-y-1">
        {allGames.map((game, i) => (
          <li key={game.slug} className="animate-in-up" style={{ animationDelay: `${40 + i * 30}ms` }}>
            <Link
              href={`/games/${game.slug}`}
              className="card-spine block py-5 transition-colors hover:bg-[var(--card)]/50"
            >
              <span className="font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-display)" }}>
                {game.title}
              </span>
              <p className="mt-1 text-sm text-[var(--foreground-muted)]">{game.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
