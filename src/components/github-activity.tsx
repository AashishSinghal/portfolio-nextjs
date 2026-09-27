import { useEffect, useRef, useState } from "react"

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }
type Data = { total: number; days: Day[] }

const CELL = 11
const GAP = 3
const LEVEL_FILL = [
  "var(--color-surface-2)",
  "color-mix(in srgb, var(--color-gold) 30%, var(--color-surface-2))",
  "color-mix(in srgb, var(--color-gold) 55%, var(--color-surface-2))",
  "color-mix(in srgb, var(--color-gold) 80%, var(--color-surface-2))",
  "var(--color-gold)",
]

const dayLabel = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})
const monthLabel = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" })

// Weeks as columns (Sunday on top), like GitHub's own graph
function toWeeks(days: Day[]) {
  const weeks: Array<Array<Day | null>> = []
  const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay()
  let week: Array<Day | null> = Array(firstWeekday).fill(null)
  for (const day of days) {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length) weeks.push(week)
  return weeks
}

// Live contributions graph. Hidden entirely if the API fails: no made-up numbers.
export default function GitHubActivity() {
  const [data, setData] = useState<Data | null>(null)
  const [hovered, setHovered] = useState<Day | null>(null)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let active = true
    fetch("/api/github")
      .then((response) => (response.ok ? response.json() : null))
      .then((body) => {
        if (active && Array.isArray(body?.days) && body.days.length) setData(body)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  // On narrow screens the graph scrolls sideways; start at today, not a year ago
  useEffect(() => {
    if (data && scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth
  }, [data])

  if (!data) {
    return <div className="h-[150px] animate-pulse rounded-lg bg-surface/60" aria-hidden="true" />
  }

  const weeks = toWeeks(data.days)
  const width = weeks.length * (CELL + GAP) - GAP
  const height = 7 * (CELL + GAP) - GAP + 18

  const months = weeks.flatMap((week, i) => {
    const first =
      week.find((day) => day && day.date.endsWith("-01")) ?? (i === 0 ? week.find(Boolean) : null)
    return first && i < weeks.length - 2
      ? [{ x: i * (CELL + GAP), label: monthLabel.format(new Date(`${first.date}T00:00:00Z`)) }]
      : []
  })

  return (
    <div>
      <div ref={scroller} className="overflow-x-auto pb-2 [scrollbar-width:thin]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width }}
          className="block h-auto max-w-none md:!w-full"
          role="img"
          aria-label={`${data.total.toLocaleString()} GitHub contributions in the last year`}
          onMouseLeave={() => setHovered(null)}
        >
          {months.map((month) => (
            <text key={month.x} x={month.x} y={10} className="fill-faint text-[10px]">
              {month.label}
            </text>
          ))}
          {weeks.map((week, x) =>
            week.map((day, y) =>
              day ? (
                <rect
                  key={day.date}
                  x={x * (CELL + GAP)}
                  y={18 + y * (CELL + GAP)}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={LEVEL_FILL[day.level]}
                  stroke={hovered?.date === day.date ? "var(--color-fg)" : "none"}
                  onMouseEnter={() => setHovered(day)}
                >
                  <title>{`${day.count} contributions on ${dayLabel.format(new Date(`${day.date}T00:00:00Z`))}`}</title>
                </rect>
              ) : null
            )
          )}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm text-faint">
        <p className="font-mono tabular-nums" aria-live="polite">
          {hovered
            ? `${hovered.count} contributions on ${dayLabel.format(new Date(`${hovered.date}T00:00:00Z`))}`
            : `${data.total.toLocaleString()} contributions in the last year`}
        </p>
        <div className="flex items-center gap-1.5 text-xs" aria-hidden="true">
          Less
          {LEVEL_FILL.map((fill) => (
            <span key={fill} className="size-2.5 rounded-[2px]" style={{ background: fill }} />
          ))}
          More
        </div>
      </div>
    </div>
  )
}
