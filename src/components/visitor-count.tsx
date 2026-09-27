import { useEffect, useState } from "react"

const COUNTED_KEY = "visit-counted-on"

// One request per page load, shared by every mount (StrictMode runs effects twice in dev,
// and a second POST would count the visit twice)
let request: Promise<number | null> | null = null

function recordVisit(): Promise<number | null> {
  const today = new Date().toISOString().slice(0, 10)
  let countedToday = false
  try {
    countedToday = localStorage.getItem(COUNTED_KEY) === today
  } catch {
    // Storage blocked: count the visit anyway
  }

  return fetch("/api/visitor-count?site=portfolio", { method: countedToday ? "GET" : "POST" })
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (typeof data?.count !== "number") return null
      try {
        localStorage.setItem(COUNTED_KEY, today)
      } catch {
        // Ignore: worst case this browser is counted again
      }
      return data.count as number
    })
    .catch(() => null)
}

// 1st, 2nd, 3rd, 4th … 11th, 12th, 13th … 21st
function ordinal(n: number) {
  const suffix =
    n % 100 >= 11 && n % 100 <= 13
      ? "th"
      : (({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th")
  return `${n.toLocaleString()}${suffix}`
}

// Counts this browser at most once a day, then shows the running total. Stays hidden
// when the counter backend isn't configured or fails, so it never shows a made-up number.
export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let active = true
    request ??= recordVisit()
    request.then((value) => {
      if (active) setCount(value)
    })
    return () => {
      active = false
    }
  }, [])

  if (count === null) return null

  return (
    <span>
      You are the <span className="font-mono tabular-nums text-muted">{ordinal(count)}</span>{" "}
      visitor
    </span>
  )
}
