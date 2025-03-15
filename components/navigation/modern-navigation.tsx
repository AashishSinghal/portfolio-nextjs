"use client"

import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "@/contexts/theme-provider"
import { sectionsArray } from "@/data/sections"
import { animateScroll, scroller } from "react-scroll"
import type { Section } from "@/types/sections"
import Image from "next/image"
import { FaMoon, FaSun } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import NavItem from "./nav-item"
import { cn } from "@/lib/utils"
import useWindowDimensions, { Breakpoints } from "@/hooks/use-window-dimensions"
import { Menu, X } from "lucide-react"

type NavigationProps = {
  variant?: "sidebar" | "topbar" | "bottombar" | "floating"
}

export default function ModernNavigation({ variant = "sidebar" }: NavigationProps) {
  const { width } = useWindowDimensions()
  const isMobile = width < Breakpoints.md
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)
  const [activeSection, setActiveSection] = useState<Section | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Determine which variant to use based on screen size
  const effectiveVariant = isMobile ? "floating" : variant

  // Handle scrolling to section
  const goToSection = (section: Section) => {
    setActiveSection(section)
    scroller.scrollTo(section, { duration: 500, smooth: true })
    if (isMobile) setMobileMenuOpen(false)
  }

  // Handle scroll to top
  const handleScrollToTop = () => {
    setActiveSection(null)
    animateScroll.scrollToTop({ duration: 500 })
    if (isMobile) setMobileMenuOpen(false)
  }

  // Detect active section on scroll
  useEffect(() => {
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
  }, [])

  // Render sidebar navigation
  if (effectiveVariant === "sidebar") {
    return (
      <div className="fixed left-0 top-0 h-screen w-64 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-r border-neutral-200 dark:border-neutral-800 z-50 flex flex-col">
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800">
          <button onClick={handleScrollToTop} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-yQdkdJanIm6s6Ycm8pFnKxBf5WoIvG.png"
              alt="Aashish Singhal"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="font-semibold text-lg">Aashish</span>
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto py-4 px-2">
          <nav className="space-y-1">
            {sectionsArray.map((section) => (
              <NavItem
                key={section.id}
                id={section.id}
                icon={section.icon}
                title={section.title}
                isActive={activeSection === section.id}
                onClick={goToSection}
                variant="vertical"
              />
            ))}
          </nav>
        </div>

        {/* Theme toggle */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {isDarkMode ? (
              <>
                <FaSun className="text-amber-500" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <FaMoon className="text-indigo-500" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Render top navigation bar
  if (effectiveVariant === "topbar") {
    return (
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 z-50 flex items-center justify-between px-4">
        {/* Logo */}
        <button onClick={handleScrollToTop} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-yQdkdJanIm6s6Ycm8pFnKxBf5WoIvG.png"
            alt="Aashish Singhal"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="font-semibold text-lg">Aashish</span>
        </button>

        {/* Navigation items */}
        <nav className="flex items-center">
          {sectionsArray.map((section) => (
            <NavItem
              key={section.id}
              id={section.id}
              icon={section.icon}
              title={section.title}
              isActive={activeSection === section.id}
              onClick={goToSection}
              variant="horizontal"
            />
          ))}
        </nav>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          {isDarkMode ? <FaSun className="text-amber-500" /> : <FaMoon className="text-indigo-500" />}
        </button>
      </div>
    )
  }

  // Render bottom navigation bar
  if (effectiveVariant === "bottombar") {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 z-50">
        <div className="max-w-screen-lg mx-auto h-full flex items-center justify-around">
          {/* Home button */}
          <button
            onClick={handleScrollToTop}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-2 transition-all duration-300",
              "hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg",
            )}
          >
            <span className="relative z-10 flex items-center justify-center w-8 h-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-yQdkdJanIm6s6Ycm8pFnKxBf5WoIvG.png"
                alt="Aashish Singhal"
                width={24}
                height={24}
                className="object-contain"
              />
            </span>
            <span className="text-xs font-medium">Home</span>
          </button>

          {/* Navigation items (limited to 4 for space) */}
          {sectionsArray.slice(0, 4).map((section) => (
            <NavItem
              key={section.id}
              id={section.id}
              icon={section.icon}
              title={section.title}
              isActive={activeSection === section.id}
              onClick={goToSection}
              variant="horizontal"
            />
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center gap-1 px-4 py-2 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          >
            <span className="relative z-10 flex items-center justify-center w-8 h-8">
              {isDarkMode ? <FaSun className="text-amber-500" /> : <FaMoon className="text-indigo-500" />}
            </span>
            <span className="text-xs font-medium">Theme</span>
          </button>
        </div>
      </div>
    )
  }

  // Render floating navigation (mobile)
  return (
    <>
      {/* Floating action button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-teal-500 dark:bg-teal-600 rounded-full flex items-center justify-center shadow-lg z-50 text-white"
      >
        <Menu size={24} />
      </button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-64 bg-white dark:bg-neutral-900 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
                  <button onClick={handleScrollToTop} className="flex items-center gap-2">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-yQdkdJanIm6s6Ycm8pFnKxBf5WoIvG.png"
                      alt="Aashish Singhal"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                    <span className="font-semibold">Aashish</span>
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation items */}
                <div className="flex-1 overflow-y-auto py-4 px-2">
                  <nav className="space-y-1">
                    {sectionsArray.map((section) => (
                      <NavItem
                        key={section.id}
                        id={section.id}
                        icon={section.icon}
                        title={section.title}
                        isActive={activeSection === section.id}
                        onClick={goToSection}
                        variant="vertical"
                      />
                    ))}
                  </nav>
                </div>

                {/* Theme toggle */}
                <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    {isDarkMode ? (
                      <>
                        <FaSun className="text-amber-500" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <FaMoon className="text-indigo-500" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

