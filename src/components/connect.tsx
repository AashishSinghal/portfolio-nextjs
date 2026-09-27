import { profile, socials } from "@/data/profile"
import BrandIcon from "@/components/brand-icon"

const cells = [
  ...socials,
  { key: "resume", label: "Resume", handle: "resume.pdf", href: profile.links.resume },
]

// Every way to reach me (plus the resume), as a grid of cells split by hairlines
export default function Connect() {
  return (
    <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
      {cells.map((social) => (
        <li key={social.key} className="bg-bg">
          <a
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-surface"
          >
            <span className="grid size-9 shrink-0 place-content-center rounded-md border border-line text-muted transition-colors group-hover:border-gold/60 group-hover:text-gold">
              <BrandIcon name={social.key} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium">{social.label}</span>
              <span className="block truncate font-mono text-xs text-faint">{social.handle}</span>
            </span>
            <span aria-hidden="true" className="text-faint transition-colors group-hover:text-teal">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
