"use client"

import type React from "react"
import { createContext, useEffect, useState } from "react"

// Define the context type
type ThemeContextType = {
  isDarkMode: boolean
  toggleTheme: () => void
}

// Create the context with default values
export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
})

/**
 * Theme Provider Component
 *
 * This component manages the theme state (light/dark mode) for the application.
 *
 * MODIFICATIONS:
 * 1. Updated to use the "use client" directive for client-side rendering
 * 2. Implemented localStorage persistence for theme preference
 * 3. Added system preference detection as fallback
 * 4. Ensured proper class toggling for dark mode
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize state based on localStorage if available, otherwise use system preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  // Effect to initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if localStorage is available
    const storedTheme = localStorage.getItem("theme")

    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark")
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
    }

    // Apply the theme to the document
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  // Function to toggle theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev
      localStorage.setItem("theme", newTheme ? "dark" : "light")
      document.documentElement.classList.toggle("dark", newTheme)
      return newTheme
    })
  }

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}

