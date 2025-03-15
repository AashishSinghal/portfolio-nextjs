"use client"

import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "@/contexts/theme-provider"
import { sectionsArray } from "@/data/sections"
import { animateScroll, scroller } from "react-scroll"
import type { Section } from "@/types/sections"
import Image from "next/image"
import { FaMoon, FaSun } from "react-icons/fa"
import { cn } from "@/lib/utils"
import useWindowDimensions, { Breakpoints } from "@/hooks/use-window-dimensions"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SlimNavigation() {
  const { width } = useWindowDimensions()
  const isMobile = width < Breakpoints.md
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)
  const [activeSection, setActiveSection] = useState<Section | null>(null)
  const [hoveredItem, setHoveredItem] = useState<Section | "logo" | "theme" | "projects" | "blog" | "games" | null>(
    null,
  )
  const pathname = usePathname()

  // Handle scrolling to section
  const goToSection = (section: Section) => {
    setActiveSection(section)
    scroller.scrollTo(section, { duration: 500, smooth: true })
  }

  // Handle scroll to top
  const handleScrollToTop = () => {
    setActiveSection(null)
    animateScroll.scrollToTop({ duration: 500 })
  }

  // Detect active section on scroll
  useEffect(() => {
    if (pathname !== "/") return // Only track sections on home page

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // Find the section that is currently in view
      for (const section of sectionsArray) {
        const element = document.getElementById(section.id)
        if (!element) continue

        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id)
          return
        }
      }

      // If at the top of the page, set active section to null
      if (scrollPosition < 100) {
        setActiveSection(null)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  // App routes for navigation
  const appRoutes = [
    { id: "projects", title: "Projects", path: "/projects" },
    { id: "blog", title: "Blog", path: "/blog" },
    { id: "games", title: "Games", path: "/games" },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md z-50 transition-all duration-300 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-screen-xl mx-auto h-full flex items-center px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center w-9 h-9 hover:opacity-80 transition-opacity mr-4 relative"
          onMouseEnter={() => setHoveredItem("logo")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-yQdkdJanIm6s6Ycm8pFnKxBf5WoIvG.png"
            alt="Aashish Singhal"
            width={24}
            height={24}
            className="object-contain grayscale hover:grayscale-0 transition-[filter]"
          />
          {hoveredItem === "logo" && (
            <div className="absolute left-full ml-1 px-2 py-1 bg-white dark:bg-neutral-900 rounded shadow-md text-sm whitespace-nowrap z-10">
              Home
            </div>
          )}
        </Link>

        {/* App Routes - always visible */}
        <div className="flex items-center mr-4 space-x-1">
          {appRoutes.map((route) => (
            <Link
              key={route.id}
              href={route.path}
              className={cn(
                "relative flex items-center justify-center rounded-md transition-all duration-300",
                "w-9 h-9", // Fixed width and height for consistent spacing
                pathname.startsWith(route.path)
                  ? "text-white bg-teal-500 dark:bg-teal-600"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800",
              )}
              onMouseEnter={() => setHoveredItem(route.id as any)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="text-xs font-medium">{route.id.charAt(0).toUpperCase()}</span>
              {hoveredItem === route.id && (
                <div className="absolute left-full ml-1 px-2 py-1 bg-white dark:bg-neutral-900 rounded shadow-md text-sm whitespace-nowrap z-10">
                  {route.title}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Navigation items - hidden on mobile */}
        {!isMobile && pathname === "/" && (
          <nav className="flex-1 flex items-center justify-center overflow-x-auto hide-scrollbar">
            <div className="flex items-center space-x-1 md:space-x-2">
              {sectionsArray.map((section) => (
                <button
                  key={section.id}
                  onClick={() => goToSection(section.id)}
                  className={cn(
                    "relative flex items-center justify-center rounded-md transition-all duration-300",
                    "w-9 h-9", // Fixed width and height for consistent spacing
                    activeSection === section.id
                      ? "text-white bg-teal-500 dark:bg-teal-600"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                  )}
                  title={section.title}
                  onMouseEnter={() => setHoveredItem(section.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <section.icon size={16} className="flex-shrink-0" />
                  {hoveredItem === section.id && (
                    <div className="absolute left-full ml-1 px-2 py-1 bg-white dark:bg-neutral-900 rounded shadow-md text-sm whitespace-nowrap z-10">
                      {section.title}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </nav>
        )}

        {/* Spacer for mobile */}
        {(isMobile || pathname !== "/") && <div className="flex-1"></div>}

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={cn(
            "flex items-center justify-center rounded-md transition-all duration-300",
            "w-9 h-9", // Fixed width and height to match navigation items
            "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800",
          )}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          onMouseEnter={() => setHoveredItem("theme")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          {!isMobile && hoveredItem === "theme" && (
            <div className="absolute right-full mr-1 px-2 py-1 bg-white dark:bg-neutral-900 rounded shadow-md text-sm whitespace-nowrap z-10">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

