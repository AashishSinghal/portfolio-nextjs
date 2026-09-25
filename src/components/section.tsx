import type { ReactNode } from "react"
import { Link } from "react-router"

type Props = {
  id?: string
  title: string
  // Optional "see all" link shown on the right of the heading
  more?: { label: string; to: string }
  children: ReactNode
}

export default function Section({ id, title, more, children }: Props) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-14">
      <div className="mb-8 flex items-baseline justify-between gap-4">
        <h2 className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-faint">
          <span aria-hidden="true" className="h-px w-6 bg-gold" />
          {title}
        </h2>
        {more && (
          <Link to={more.to} className="text-sm text-muted transition-colors hover:text-teal">
            {more.label} →
          </Link>
        )}
      </div>
      {children}
    </section>
  )
}
