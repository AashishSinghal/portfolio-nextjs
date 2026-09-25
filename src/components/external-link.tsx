import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Props = { href: string; children: ReactNode; className?: string }

export default function ExternalLink({ href, children, className }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn("text-muted transition-colors hover:text-teal", className)}
    >
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  )
}
