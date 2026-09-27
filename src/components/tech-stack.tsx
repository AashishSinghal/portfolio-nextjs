import { useLayoutEffect, useRef, useState } from "react"
import { skillGroups, skills, type SkillGroup } from "@/data/profile"
import BrandIcon from "@/components/brand-icon"
import { cn } from "@/lib/utils"

type Filter = SkillGroup | "All"
const filters: Filter[] = ["All", ...skillGroups]
const count = (filter: Filter) =>
  filter === "All" ? skills.length : skills.filter((skill) => skill.group === filter).length

// Skill chips with a one-row category slider: a pill slides to the chosen category, and on
// narrow screens the row scrolls sideways (the chosen category is kept in view).
export default function TechStack() {
  const [filter, setFilter] = useState<Filter>("All")
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)
  const buttons = useRef(new Map<Filter, HTMLButtonElement>())
  const shown = filter === "All" ? skills : skills.filter((skill) => skill.group === filter)

  useLayoutEffect(() => {
    const measure = () => {
      const button = buttons.current.get(filter)
      if (button) setPill({ left: button.offsetLeft, width: button.offsetWidth })
    }
    measure()
    buttons.current.get(filter)?.scrollIntoView({ block: "nearest", inline: "nearest" })
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [filter])

  return (
    <div>
      <div className="rounded-xl border border-line bg-surface/60 p-1.5">
        <div
          role="group"
          aria-label="Filter by area"
          className="relative flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {pill && (
            <span
              aria-hidden="true"
              className="absolute inset-y-0 rounded-lg bg-fg transition-[left,width] duration-300 ease-out motion-reduce:transition-none"
              style={{ left: pill.left, width: pill.width }}
            />
          )}
          {filters.map((name) => (
            <button
              key={name}
              ref={(element) => {
                if (element) buttons.current.set(name, element)
              }}
              type="button"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
              className={cn(
                "relative flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm whitespace-nowrap transition-colors focus-visible:outline-offset-[-2px]",
                filter === name ? "text-bg" : "text-muted hover:text-fg"
              )}
            >
              {name}
              <span
                className={cn(
                  "font-mono text-[11px] tabular-nums",
                  filter === name ? "text-bg/60" : "text-faint"
                )}
              >
                {count(name)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2.5" aria-live="polite">
        {shown.map((skill) => (
          <li
            key={skill.name}
            className="group flex items-center gap-2.5 rounded-lg border border-line bg-surface/40 px-3 py-2 font-mono text-[13px] text-muted transition-colors hover:border-gold/60 hover:text-fg"
          >
            <BrandIcon
              name={skill.name}
              className="text-faint transition-colors group-hover:text-gold"
            />
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
