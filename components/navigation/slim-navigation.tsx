"use client"

import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "@/contexts/theme-provider"
import { sectionsArray } from "@/data/sections"
import { animateScroll, scroller } from "react-scroll"
import type { Section } from "@/types/sections"
import Image from "next/image"
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa"
import { cn } from "@/lib/utils"
import useWindowDimensions, { Breakpoints } from "@/hooks/use-window-dimensions"
import Link from "next/link"
import { usePathname } from "next/navigation"
import VisitorCounter from "@/components/visitor-counter"

// Define a type for the navigation items
type NavItemType = Section | "logo" | "theme"

export default function SlimNavigation() {
  const { width } = useWindowDimensions()
  const isMobile = width < Breakpoints.md
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)
  const [activeSection, setActiveSection] = useState<Section | null>(null)
  const [hoveredItem, setHoveredItem] = useState<NavItemType | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scrolling to section
  const goToSection = (section: Section) => {
    const element = document.getElementById(section)
    if (!element) {
      console.warn(`Section with ID "${section}" not found`)
      return
    }

    setActiveSection(section)
    setMenuOpen(false)
    scroller.scrollTo(section, {
      duration: 500,
      smooth: true,
      offset: -60, // Add offset to account for fixed header
    })
  }

  // Handle scroll to top
  const handleScrollToTop = () => {
    if (pathname !== "/") {
      window.location.href = "/"
      return
    }
    setActiveSection(null)
    animateScroll.scrollToTop({ duration: 500 })
  }

  // Detect active section on scroll
  useEffect(() => {
    if (pathname !== "/") return // Only track sections on home page

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      let foundActiveSection = false

      // Find the section that is currently in view
      for (const section of sectionsArray) {
        const element = document.getElementById(section.id)
        if (!element) continue

        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id)
          foundActiveSection = true
          break
        }
      }

      // If at the top of the page or no section found, set active section to null
      if (scrollPosition < 100 || !foundActiveSection) {
        setActiveSection(null)
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Call handleScroll immediately to set initial state
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  // Close the mobile menu on route change or when leaving mobile width
  useEffect(() => setMenuOpen(false), [pathname, isMobile])

  // Separate hover handlers for each type of item
  const handleMouseEnter = (item: NavItemType) => {
    setHoveredItem(item)
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
  }

  // App routes for navigation
  const appRoutes = [
    { id: "projects" as const, title: "Projects", path: "/projects" },
    { id: "blog" as const, title: "Blog", path: "/blog" },
    { id: "games" as const, title: "Arcade", path: "/games" },
  ]

  const tooltipClass =
    "absolute top-full mt-2 px-2 py-1.5 bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 font-pixel text-[8px] whitespace-nowrap z-10 -translate-x-1/2 left-1/2 pointer-events-none"

  const iconButtonClass = (active: boolean) =>
    cn(
      "relative flex items-center justify-center w-9 h-9 transition-colors",
      active
        ? "bg-pixel-accent text-neutral-900 shadow-pixel-sm"
        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
    )

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/95 dark:bg-neutral-900/95 border-b-4 border-neutral-900 dark:border-neutral-700">
      <div className="max-w-screen-xl mx-auto h-14 flex items-center px-4 gap-2">
        {/* Logo */}
        <button
          type="button"
          aria-label="Home"
          className="flex items-center justify-center w-9 h-9 hover:opacity-80 transition-opacity mr-2 relative"
          onMouseEnter={() => handleMouseEnter("logo")}
          onMouseLeave={handleMouseLeave}
          onClick={handleScrollToTop}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-yQdkdJanIm6s6Ycm8pFnKxBf5WoIvG.png"
            alt=""
            width={24}
            height={24}
            className="object-contain grayscale hover:grayscale-0 transition-[filter]"
            style={{ imageRendering: "pixelated" }}
          />
          {!isMobile && hoveredItem === "logo" && <span className={tooltipClass}>HOME</span>}
        </button>

        {/* App routes: text labels on desktop, inside the menu on mobile */}
        {!isMobile && (
          <div className="flex items-center gap-1 mr-2">
            {appRoutes.map((route) => (
              <Link
                key={route.id}
                href={route.path}
                className={cn(
                  "font-pixel text-[9px] px-2.5 py-2 transition-colors",
                  pathname.startsWith(route.path)
                    ? "bg-pixel-accent text-neutral-900 shadow-pixel-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                )}
              >
                {route.title.toUpperCase()}
              </Link>
            ))}
          </div>
        )}

        {/* Section shortcuts - desktop home page only */}
        {!isMobile && pathname === "/" ? (
          <nav
            aria-label="Sections"
            className="flex-1 flex items-center justify-center overflow-x-auto hide-scrollbar"
          >
            <div className="flex items-center gap-1">
              {sectionsArray.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  aria-label={section.title}
                  onClick={() => goToSection(section.id)}
                  className={iconButtonClass(activeSection === section.id)}
                  onMouseEnter={() => handleMouseEnter(section.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <section.icon size={16} className="flex-shrink-0" />
                  {hoveredItem === section.id && (
                    <span className={tooltipClass}>{section.title.toUpperCase()}</span>
                  )}
                </button>
              ))}
            </div>
          </nav>
        ) : (
          <div className="flex-1" />
        )}

        {!isMobile && (
          <div className="mr-2">
            <VisitorCounter />
          </div>
        )}

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className={iconButtonClass(false)}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          onMouseEnter={() => handleMouseEnter("theme")}
          onMouseLeave={handleMouseLeave}
        >
          {isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          {!isMobile && hoveredItem === "theme" && (
            <span className={tooltipClass}>{isDarkMode ? "LIGHT MODE" : "DARK MODE"}</span>
          )}
        </button>

        {/* Mobile menu toggle */}
        {isMobile && (
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={iconButtonClass(menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        )}
      </div>

      {/* Mobile menu panel */}
      {isMobile && menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Site"
          className="border-t-4 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 max-h-[calc(100vh-3.5rem)] overflow-y-auto"
        >
          <div className="grid grid-cols-3 gap-2 p-4">
            {appRoutes.map((route) => (
              <Link
                key={route.id}
                href={route.path}
                className={cn(
                  "font-pixel text-[9px] text-center py-3 border-4 border-neutral-900 dark:border-neutral-600",
                  pathname.startsWith(route.path) && "bg-pixel-accent text-neutral-900"
                )}
              >
                {route.title.toUpperCase()}
              </Link>
            ))}
          </div>

          {pathname === "/" && (
            <ul className="px-4 pb-2">
              {sectionsArray.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => goToSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 py-3 text-left font-pixel text-[10px]",
                      activeSection === section.id
                        ? "text-pixel-accent"
                        : "text-neutral-700 dark:text-neutral-300"
                    )}
                  >
                    <span aria-hidden="true" className="w-3">
                      {activeSection === section.id ? "▶" : ""}
                    </span>
                    <section.icon size={14} />
                    {section.title.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="px-4 py-4 border-t-4 border-neutral-900 dark:border-neutral-700">
            <VisitorCounter />
          </div>
        </nav>
      )}
    </div>
  )
}
