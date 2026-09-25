"use client"

import { useEffect, useState } from "react"

// Retro hit counter: records this visit once, then shows the running total
export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch("/api/visitor-count", { method: "POST", signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (typeof data?.count === "number") setVisitorCount(data.count)
      })
      .catch(() => {
        // Counter is decorative: if it fails, it just stays hidden
      })

    return () => controller.abort()
  }, [])

  if (visitorCount === null) return null

  return (
    <div
      className="flex items-center gap-2 font-pixel text-[8px] sm:text-[10px]"
      title="Visits to this site"
    >
      <span className="hidden lg:inline opacity-70">VISITS</span>
      <span className="bg-neutral-900 text-pixel-accent dark:bg-black px-1.5 py-1 tracking-widest border-2 border-neutral-900 dark:border-neutral-600">
        {visitorCount.toString().padStart(6, "0")}
      </span>
    </div>
  )
}
