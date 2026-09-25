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
  <div className="flex items-center gap-2 mb-8 hover:text-teal-600 hover:dark:text-teal-400 transition-colors">
    {Icon && <Icon className="h-5 w-5 text-teal-500 dark:text-teal-400" />}
    <h2 className="uppercase text-xl font-bold relative -bottom-px">{children}</h2>
  </div>
)

export default Heading
