"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Keyboard } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function KeyboardNavigationHint() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Show the hint after a delay if the user hasn't interacted yet
  useEffect(() => {
    // Check if the user has already seen the hint
    const hasSeenHint = localStorage.getItem("hasSeenKeyboardHint")
    if (hasSeenHint) return

    // Show the hint after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    // Hide the hint after 8 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      localStorage.setItem("hasSeenKeyboardHint", "true")
    }, 8000)

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  // Track keyboard interactions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        setHasInteracted(true)
        setIsVisible(false)
        localStorage.setItem("hasSeenKeyboardHint", "true")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (hasInteracted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-4 z-50 max-w-xs"
        >
          <div className="flex items-center gap-2 mb-2">
            <Keyboard className="h-4 w-4 text-teal-500" />
            <h4 className="font-medium text-sm">Keyboard Navigation</h4>
          </div>
          <div className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <ArrowLeft className="h-3 w-3" />
                <ArrowRight className="h-3 w-3" />
              </div>
              <span>Scroll timeline horizontally</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <ArrowUp className="h-3 w-3" />
                <ArrowDown className="h-3 w-3" />
              </div>
              <span>Navigate between timeline items</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

