"use client"

import { cn } from "@/lib/utils"
import React from "react"

type RefProps = HTMLInputElement & HTMLTextAreaElement

type Props = {
  label: string
  hasError?: boolean
  className?: string
  placeholder: string
  description: string
  type?: React.HTMLInputTypeAttribute | "textarea"
}

/**
 * Input Component
 *
 * MODIFICATIONS:
 * 1. Added "use client" directive for client-side rendering
 * 2. Replaced clsx with cn utility from shadcn
 * 3. Updated typing for better TypeScript support
 * 4. Maintained the same styling and functionality
 *
 * This component is used for form inputs throughout the portfolio.
 */
const Input = React.forwardRef<RefProps, Props>(
  (
    { label, description, placeholder, className, hasError = false, type = "text", ...props },
    ref
  ) => {
    const inputClassName = cn(
      "text-xl bg-neutral-50 dark:bg-neutral-950 border-4 border-neutral-900 dark:border-neutral-500 px-4 py-2 shadow-pixel-sm focus:outline-none focus:border-pixel-accent dark:focus:border-pixel-accent transition-[border]",
      {
        "animate__animated animate__shakeX border-red-300 dark:border-red-700 focus:border-red-700 dark:focus:border-red-300":
          hasError,
      }
    )

    return (
      <label className={cn("flex flex-col gap-2", className)}>
        <span className="text-[10px]">{label}</span>

        {type === "textarea" ? (
          <textarea
            ref={ref}
            rows={4}
            placeholder={placeholder}
            className={inputClassName}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={inputClassName}
            {...props}
          />
        )}

        <span className={cn("text-base opacity-80", { "text-red-500 opacity-100": hasError })}>{description}</span>
      </label>
    )
  }
)

Input.displayName = "Input"

export default Input
