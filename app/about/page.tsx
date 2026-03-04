import Link from "next/link";
import { personal, languages } from "@/lib/site-data";

export const metadata = {
  title: "About | Aashish Singhal",
  description: "About Aashish Singhal.",
};

export default function AboutPage() {
  const { name, title, tagline, about, contact } = personal;

  return (
    <div className="relative z-[1]">
      <span className="section-label">About</span>
      <h1 className="section-title mt-1 text-3xl sm:text-4xl">{name}</h1>
      <p className="mt-2 text-[var(--foreground-muted)]">{title}</p>
      <p className="mt-1 text-sm text-[var(--foreground-muted)]">{tagline}</p>

      <div className="mt-16 space-y-10">
        <div>
          <span className="section-label">Bio</span>
          <div className="mt-2 space-y-4 text-[var(--foreground-muted)] leading-relaxed">
            {about.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div>
          <span className="section-label">Languages</span>
          <ul className="mt-4 space-y-3">
            {languages.map((lang) => (
              <li key={lang.id} className="card-spine py-4">
                <span className="font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-display)" }}>
                  {lang.language}
                </span>
                <p className="mt-0.5 text-sm text-[var(--foreground-muted)]">{lang.text}</p>
                {lang.translation && (
                  <p className="mt-0.5 text-xs italic text-[var(--border)]">{lang.translation}</p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="section-label">Connect</span>
          <p className="mt-4 text-[var(--foreground-muted)]">
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="link-underline text-[var(--primary)]">
              GitHub
            </a>
            {" · "}
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline text-[var(--primary)]">
              LinkedIn
            </a>
            {" · "}
            <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="link-underline text-[var(--primary)]">
              Twitter
            </a>
            {" · "}
            <a href={contact.email} className="link-underline text-[var(--primary)]">
              Email
            </a>
          </p>
        </div>

        <p>
          <Link href="/" className="link-underline text-sm text-[var(--primary)]">
            ← Home
          </Link>
        </p>
      </div>
    </div>
  );
}
