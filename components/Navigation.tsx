"use client"

import Tippy from "@tippyjs/react"
import { ThemeContext } from "@/contexts/theme-provider"
import { sectionsArray } from "@/data/sections"
import useWindowDimensions, { Breakpoints } from "@/hooks/use-window-dimensions"
import Image from "next/image"
import { useContext } from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import { FiMenu } from "react-icons/fi"
import { animateScroll, scroller } from "react-scroll"
import type { Section } from "@/types/sections"

/**
 * Navigation Component
 *
 * MODIFICATIONS:
 * 1. Added "use client" directive for client-side rendering
 * 2. Updated import paths to use absolute imports with @/ prefix
 * 3. Updated types to match the new project structure
 * 4. Updated to use the new data files from data/ folder
 * 5. Ensured compatibility with Next.js 15 and App Router
 */
const Navigation = () => {
  const { width } = useWindowDimensions()
  const isDesktop = width > Breakpoints.lg

  const { isDarkMode, toggleTheme } = useContext(ThemeContext)

  const goToSection = (section: Section) => scroller.scrollTo(section, { duration: 500, smooth: true })

  if (!isDesktop) {
    return (
      <div className="fixed inset-x-0 top-0 px-3 py-5 w-screen text-neutral-800 dark:text-neutral-200 flex items-center justify-between">
        <Tippy content={<small>Go to Top</small>} placement="right">
          <div
            onClick={animateScroll.scrollToTop}
            className="p-1 flex cursor-pointer grayscale hover:grayscale-0 transition-[filter]"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-yQdkdJanIm6s6Ycm8pFnKxBf5WoIvG.png"
              alt="Aashish Singhal"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
        </Tippy>

        <Tippy content={<small>Toggle Theme</small>} placement="right">
          <div onClick={toggleTheme} className="p-1 cursor-pointer hover:text-teal-500 transition-colors">
            {isDarkMode ? <FaMoon /> : <FaSun />}
          </div>
        </Tippy>
      </div>
    )
  }

  return (
    <div className="fixed inset-y-0 w-16 py-5 h-screen text-neutral-800 dark:text-neutral-200 flex flex-col items-center justify-between">
      <Tippy content={<small>Go to Top</small>} placement="right">
        <div
          onClick={animateScroll.scrollToTop}
          className="p-1 flex cursor-pointer grayscale hover:grayscale-0 transition-[filter]"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-yQdkdJanIm6s6Ycm8pFnKxBf5WoIvG.png"
            alt="Aashish Singhal"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
      </Tippy>

      <div className="flex-1 w-7 overflow-hidden flex justify-start items-center group">
        <div className="flex w-full transition-[margin] ml-2 group-hover:-ml-7">
          <FiMenu />
        </div>

        <div className="flex flex-col ml-2">
          {sectionsArray.map(({ id, icon: Icon, title }) => (
            <Tippy key={id} content={<small>{title}</small>} placement="right">
              <div className="cursor-pointer py-3" onClick={() => goToSection(id)}>
                <Icon />
              </div>
            </Tippy>
          ))}
        </div>
      </div>

      <Tippy content={<small>Toggle Theme</small>} placement="right">
        <div onClick={toggleTheme} className="p-1 cursor-pointer hover:text-teal-500 transition-colors">
          {isDarkMode ? <FaMoon /> : <FaSun />}
        </div>
      </Tippy>
    </div>
  )
}

export default Navigation

