import { useState } from "react"
import { skillGroups, skills, type SkillGroup } from "@/data/profile"
import BrandIcon from "@/components/brand-icon"
import { cn } from "@/lib/utils"

// Skill chips with filter tabs. On phones the tabs wrap onto two rows.
export default function TechStack() {
  const [group, setGroup] = useState<SkillGroup | "All">("All")
  const shown = group === "All" ? skills : skills.filter((skill) => skill.group === group)

  return (
    <div>
      <div
        role="group"
        aria-label="Filter by area"
        className="flex flex-wrap gap-1 rounded-lg border border-line bg-surface/60 p-1"
      >
        {(["All", ...skillGroups] as const).map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={group === name}
            onClick={() => setGroup(name)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors",
              group === name ? "bg-fg text-bg" : "text-muted hover:text-fg"
            )}
          >
            {name}
          </button>
        ))}
      </div>

      <ul className="mt-5 flex flex-wrap gap-2" aria-live="polite">
        {shown.map((skill) => (
          <li
            key={skill.name}
            className="group flex items-center gap-2 rounded-md border border-line bg-surface/40 px-2.5 py-1.5 font-mono text-[13px] text-muted transition-colors hover:border-gold/60 hover:text-fg"
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
