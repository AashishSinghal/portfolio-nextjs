import Link from "next/link";
import { personal } from "@/lib/site-data";

export const metadata = {
  title: "Resume | Aashish Singhal",
  description: "Resume and experience.",
};

export default function ResumePage() {
  const { name, title, contact } = personal;

  return (
    <div className="relative z-[1]">
      <span className="section-label">Resume</span>
      <h1 className="section-title mt-1 text-3xl sm:text-4xl">{name}</h1>
      <p className="mt-2 text-[var(--foreground-muted)]">{title}</p>
      <div className="mt-12 space-y-6 text-[var(--foreground-muted)]">
        <p>
          <a
            href={contact.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-[var(--primary)]"
          >
            Download resume (PDF)
          </a>
        </p>
        <p>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="link-underline text-[var(--primary)]">
            GitHub
          </a>
          {" · "}
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline text-[var(--primary)]">
            LinkedIn
          </a>
        </p>
        <p>
          <Link href="/" className="link-underline text-[var(--primary)]">
            ← Home
          </Link>
        </p>
      </div>
    </div>
  );
}
