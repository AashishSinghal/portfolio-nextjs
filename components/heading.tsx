import type React from "react"
import type { IconType } from "react-icons"

type Props = {
  icon?: IconType
  children: React.ReactNode
}

/**
 * Heading Component
 *
 * MODIFICATIONS:
 * 1. Updated typing to use React.ReactNode for children
 * 2. Maintained the same styling and functionality
 * 3. No need for "use client" as this is a static component
 *
 * This component is used for section headings throughout the portfolio.
 */
const Heading = ({ icon: Icon, children }: Props) => (
  <div className="flex items-center gap-3 mb-8 pb-3 border-b-4 border-dashed border-neutral-300 dark:border-neutral-700">
    {Icon && (
      <span className="grid place-items-center w-8 h-8 bg-pixel-accent text-neutral-900 shadow-pixel-sm">
        <Icon className="h-4 w-4" />
      </span>
    )}
    <h2 className="uppercase text-sm sm:text-base">{children}</h2>
  </div>
)

export default Heading
