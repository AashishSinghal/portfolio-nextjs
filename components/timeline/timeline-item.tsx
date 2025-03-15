"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type TimelineItemProps = {
  children: ReactNode
  isActive: boolean
  isFirst: boolean
  isLast: boolean
  isMobile: boolean
  onClick?: () => void
}

export function TimelineItem({ children, isActive, isFirst, isLast, isMobile, onClick }: TimelineItemProps) {
  return (
    <div
      className={cn(
        "flex group max-w-full timeline-transition",
        isActive ? "opacity-100" : isMobile ? "hidden" : "opacity-50 hover:opacity-80",
      )}
      onClick={onClick}
    >
      {/* Timeline line - hidden on mobile */}
      <div
        className={cn("ml-1 w-1 flex-shrink-0 bg-neutral-500/25", {
          "rounded-t": isFirst,
          "rounded-b": isLast,
          hidden: isMobile,
        })}
      />

      {/* Timeline dot - smaller on mobile */}
      <div
        className={cn(
          "flex-shrink-0 relative rounded-full shadow-lg bg-teal-500/80 dark:bg-white/80 transition-all",
          isMobile ? "ml-0 mt-4 w-2 h-2" : "-ml-2 mt-8 w-3 h-3",
          isActive && !isMobile && "w-6",
        )}
      />

      {/* Content container with responsive padding */}
      <div className={cn("grid gap-2 pb-6 overflow-hidden", isMobile ? "mt-2 ml-2" : "mt-5 ml-8")}>{children}</div>
    </div>
  )
}

