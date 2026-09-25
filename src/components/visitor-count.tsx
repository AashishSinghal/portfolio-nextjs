import { useEffect, useState } from "react"

// Records this visit once, then shows the running total. Hidden when the counter
// backend isn't configured or fails, so it never shows a made-up number.
export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch("/api/visitor-count", { method: "POST", signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (typeof data?.count === "number") setCount(data.count)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])

  if (count === null) return null

  return <span className="font-mono tabular-nums">{count.toLocaleString()} visits</span>
}
