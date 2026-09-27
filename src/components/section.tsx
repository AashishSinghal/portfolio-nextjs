import type { ReactNode } from "react"
import { Link } from "react-router"

type Props = {
  id?: string
  title: string
  // Optional "see all" link shown on the right of the heading
  more?: { label: string; to: string }
  children: ReactNode
}

// Each section opens with a full-width hatched band, then its title between hairlines
export default function Section({ id, title, more, children }: Props) {
  return (
    <section id={id} className="scroll-mt-16">
      <div aria-hidden="true" className="bleed hatch h-6 border-y border-line" />
      <div className="flex items-baseline justify-between gap-4 py-4">
        <h2 className="flex items-center gap-3 text-xl font-medium tracking-tight">
          <span aria-hidden="true" className="h-px w-5 bg-gold" />
          {title}
        </h2>
        {more && (
          <Link to={more.to} className="text-sm text-muted transition-colors hover:text-teal">
            {more.label} →
          </Link>
        )}
      </div>
      <div aria-hidden="true" className="bleed border-t border-line" />
      <div className="py-10">{children}</div>
    </section>
  )
}
