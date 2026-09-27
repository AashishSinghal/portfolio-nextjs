import { useEffect, useState } from "react"
import { profile } from "@/data/profile"

const format = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: profile.timeZone,
})

// My local time, ticking once a minute (on the minute)
export default function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let timer = 0
    const schedule = () => {
      timer = window.setTimeout(
        () => {
          setNow(new Date())
          schedule()
        },
        60_000 - (Date.now() % 60_000)
      )
    }
    schedule()
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <time dateTime={now.toISOString()} className={className}>
      {format.format(now).toLowerCase()} IST
    </time>
  )
}
