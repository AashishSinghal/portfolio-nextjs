"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import type { IconType } from "react-icons"
import type { Section } from "@/types/sections"

type NavItemProps = {
  id: Section
  icon: IconType
  title: string
  isActive: boolean
  onClick: (section: Section) => void
  variant?: "vertical" | "horizontal" | "compact"
}

export default function NavItem({ id, icon: Icon, title, isActive, onClick, variant = "vertical" }: NavItemProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Vertical navigation item (sidebar)
  if (variant === "vertical") {
    return (
      <button
        onClick={() => onClick(id)}
        className={cn(
          "relative flex items-center gap-2 w-full px-3 py-3 text-left transition-all duration-300",
          "hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg group",
        )}
      >
        <span
          className={cn(
            "relative z-10 flex items-center justify-center w-8 h-8",
            isActive
              ? "text-white"
              : "text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white",
          )}
        >
          <Icon size={18} />
          {isActive && (
            <motion.div
              layoutId="activeNavBackground"
              className="absolute inset-0 bg-teal-500 dark:bg-teal-600 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </span>

        <span
          className={cn(
            "font-medium transition-all duration-300",
            isActive
              ? "text-neutral-900 dark:text-white"
              : "text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white",
          )}
        >
          {title}
        </span>

        {isActive && (
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-500 dark:bg-teal-600 rounded-r-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </button>
    )
  }

  // Horizontal navigation item (top/bottom bar)
  if (variant === "horizontal") {
    return (
      <button
        onClick={() => onClick(id)}
        className={cn(
          "relative flex flex-col items-center gap-1 px-4 py-2 transition-all duration-300",
          "hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg",
        )}
      >
        <span
          className={cn(
            "relative z-10 flex items-center justify-center w-8 h-8",
            isActive ? "text-white" : "text-neutral-600 dark:text-neutral-400",
          )}
        >
          <Icon size={18} />
          {isActive && (
            <motion.div
              layoutId="activeNavBackground"
              className="absolute inset-0 bg-teal-500 dark:bg-teal-600 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </span>

        <span
          className={cn(
            "text-xs font-medium transition-all duration-300",
            isActive ? "text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-400",
          )}
        >
          {title}
        </span>

        {isActive && (
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-teal-500 dark:bg-teal-600 rounded-t-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </button>
    )
  }

  // Compact navigation item (mobile or minimal)
  return (
    <button
      onClick={() => onClick(id)}
      className={cn(
        "relative flex items-center justify-center w-10 h-10 transition-all duration-300",
        "hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full",
      )}
    >
      <span className={cn("relative z-10", isActive ? "text-white" : "text-neutral-600 dark:text-neutral-400")}>
        <Icon size={18} />
        {isActive && (
          <motion.div
            layoutId="activeNavBackgroundCompact"
            className="absolute inset-0 bg-teal-500 dark:bg-teal-600 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </span>
    </button>
  )
}

