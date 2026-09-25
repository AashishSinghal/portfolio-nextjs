"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import type { IconType } from "react-icons"
import { BiLinkExternal } from "react-icons/bi"

type Props = {
  icon?: IconType
  disabled?: boolean
  className?: string
  onClick: () => void
  children: React.ReactNode
}

/**
 * Button Component
 *
 * MODIFICATIONS:
 * 1. Added "use client" directive for client-side rendering
 * 2. Replaced clsx with cn utility from shadcn
 * 3. Updated typing for better TypeScript support
 * 4. Explicitly typed children as React.ReactNode
 *
 * This is a custom button component with hover and active states.
 */
const Button = ({
  onClick,
  children,
  className,
  disabled = false,
  icon: Icon = BiLinkExternal,
}: Props) => {
  return (
    <div className={cn("flex", className)}>
      <div
        className={cn("relative cursor-pointer", { "cursor-not-allowed opacity-75": disabled })}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={cn(
            "relative z-10 px-6 py-3 flex gap-3 items-center justify-center font-pixel text-[10px] uppercase bg-pixel-accent text-neutral-900 border-4 border-neutral-900 dark:border-neutral-100 top-0 left-0 transition-[top_left] duration-75 hover:top-0.5 hover:left-0.5 active:top-1 active:left-1 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-pixel-accent",
            { "hover:top-0 hover:left-0 active:top-0 active:left-0 cursor-not-allowed": disabled }
          )}
        >
          {Icon && <Icon fontSize={14} />}
          <span>{children}</span>
        </button>

        <div className="w-full h-full absolute top-1.5 left-1.5 bg-neutral-900 dark:bg-neutral-100" />
      </div>
    </div>
  )
}

export default Button
